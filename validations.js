import {body} from 'express-validator';

export const registrationValidation = [
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32})
]

export const formValidation = [
    body('manager')
        .isString()
        .withMessage('Manager must be a string')
        .optional(),
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

export const applicationFormValidation = [
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
    body('description')
        .isString()
        .withMessage('Description must be a string')
        .optional(),
    body('communicationMethod')
        .isString()
        .withMessage('communicationMethod must be a string'),
    body('check')
        .isBoolean()
        .withMessage('Check must be a boolean value'),
];

export const bookingValidation = [
    body('date').isISO8601().toDate().withMessage('Invalid date format'),
    body('room').isString().withMessage('Room must be a string'),
    body('hours').isArray().withMessage('Hours must be an array').custom((value) => {
        if (!Array.isArray(value)) {
            throw new Error('Hours must be an array');
        }
        for (const hour of value) {
            if (typeof hour !== 'string') {
                throw new Error('Each hour must be a string');
            }
        }
        return true;
    }),
    body('userId').isMongoId().withMessage('Invalid user ID')
];