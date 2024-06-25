import UserModel from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import mailService from "./mailService.js";
import tokenService from "./tokenService.js";
import { UserDto } from "../dtos/userDto.js";
import ApiError from "../exceptions/apiError.js";
import userModel from "../models/userModel.js";

class UserService {
    async registration(body) {
        const {email, password, firstName, lastName, company, phone, address, city, zipCode, country} = body;
        const candidate = await UserModel.findOne({ email })
        if (candidate) {
            throw ApiError.BadRequest(`User with email ${email} already exists`)
        }
        const activationLink = uuidv4();
        const hashPassword = await bcryptjs.hash(password, 3);
        const user = await UserModel.create({ email, password: hashPassword, firstName, lastName, phone, company, address, city, zipCode, country , activationLink })
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink });
        if (!user) {
            throw ApiError.BadRequest('Wrong activation Link')
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest('There is no user with such email!')
        };
        const isPassEqual = await bcryptjs.compare(password, user.password);
        if (!isPassEqual) {
            throw ApiError.BadRequest('Wrong password or email!')
        };
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken);
        if(!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError()
        }
        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }

    async getAllUsers () {
        const users = await userModel.find();
        return users;
    }
};

export default new UserService;