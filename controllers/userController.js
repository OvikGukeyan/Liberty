import ApiError from "../exceptions/apiError.js";
import userService from "../service/userService.js";
import { validationResult } from "express-validator";

class UserController {
    
    async registration(req, res, next) {
        const isProduction = process.env.NODE_ENV === 'production';
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            console.log(req.body)
            const userData = await userService.registration(req.body);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: isProduction, sameSite: isProduction ? 'None' : 'Lax',})
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        const isProduction = process.env.NODE_ENV === 'production';
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: isProduction, sameSite: isProduction ? 'None' : 'Lax',})
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (error) {
            next(error)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL + '/checkout')
        } catch (error) {
            next(error)
        }
    }

    async refresh(req, res, next) {
        const isProduction = process.env.NODE_ENV === 'production';
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: isProduction, sameSite: isProduction ? 'None' : 'Lax',})
            return res.json(userData)
        } catch (error) {
            next(error) 
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers()
            return res.json(users)
        } catch (error) {
            next(error)
        }
    }

}

export default new UserController;