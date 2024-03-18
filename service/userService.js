import UserModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import mailService from "./mailService.js";
import tokenService from "./tokenService.js";
import { UserDto } from "../dtos/userDto.js";
import ApiError from "../exceptions/apiError.js";

class UserService  {
    async registration (email, password)  {
        const candidate = await UserModel.findOne({email})
        if(candidate) {
            throw ApiError.BadRequest(`User with email ${email} already exists`)
        }
        const activationLink = uuidv4();
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await UserModel.create({email, password: hashPassword, activationLink})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    async activate (activationLink) {
        const user = await UserModel.findOne({activationLink});
        if(!user) {
            throw ApiError.BadRequest('Wrong activation Link')
        }
        user.isActivated = true;
        await user.save();
    }

    async login (email, password) {
        const user = await UserModel.findOne({email});
        if(!user) {
            throw ApiError.BadRequest('There is no user with such email!')
        };
        const isPassEqual = await bcrypt.compare(password, user.password);
        if(!isPassEqual) {
            throw ApiError.BadRequest('Wrong password or email!')
        };
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    async logout (refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
};

export default new UserService;