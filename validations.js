import {body} from 'express-validator';

export const registrationValidation = [
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32})
]

export const formValidation = [
    body('manager')
        .isString()
        .withMessage('Manager must be a string'),
    body('salutation')
        .isString()
        .withMessage('Salutation must be a string'),
    body('titel')
        .isString()
        .withMessage('Title must be a string')
        .optional(),
    body('firstName')
        .isString()
        .withMessage('First name must be a string'),
    body('lastName')
        .isString()
        .withMessage('Last name must be a string'),
    body('emailAddress')
        .isEmail()
        .withMessage('Invalid email address')
        .normalizeEmail(),
    body('phoneNumber')
        .isString()
        .withMessage('Phone number must be a string'),
    body('address')
        .isString()
        .withMessage('Address must be a string'),
    body('zipCode')
        .isString()
        .withMessage('Zip code must be a string'),
    body('city')
        .isString()
        .withMessage('City must be a string'),
    body('country')
        .isString()
        .withMessage('Country must be a string'),
    body('topic')
        .isArray({ min: 1 })
        .withMessage('At least one topic must be selected'),
    body('description')
        .isString()
        .withMessage('Description must be a string')
        .optional(),
    body('check')
        .isBoolean()
        .withMessage('Check must be a boolean value'),
];