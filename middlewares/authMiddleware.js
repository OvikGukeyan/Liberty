import ApiError from "../exceptions/apiError.js";
import tokenService from "../service/tokenService.js";


export default function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            throw ApiError.UnauthorizedError()
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {

            throw ApiError.UnauthorizedError()
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {

            throw ApiError.UnauthorizedError()
        }
        req.user = userData;
        next();
    } catch (error) {
        throw ApiError.UnauthorizedError()
    }
}