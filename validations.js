import {body} from 'express-validator';

export const registrationValidation = [
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32})
]