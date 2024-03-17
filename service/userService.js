import UserModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import mailService from "./mailService.js";
import tokenService from "./tokenService.js";
import { UserDto } from "../dtos/userDto.js";

class UserService  {
    async registration (email, password)  {
        const candidate = await UserModel.findOne({email})
        if(candidate) {
            throw new Error(`User with email ${email} already exists`)
        }
        const activationLink = uuidv4();
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await UserModel.create({email, password: hashPassword, activationLink})
        await mailService.sendActivationMail(email, activationLink);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }
};

export default new UserService;