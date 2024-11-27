import {body} from 'express-validator';


export const registrationValidation = [
    body('email')
        .isEmail()
        .withMessage('Invalid email format'),
    body('password')
        .isLength({ min: 3, max: 32 })
        .withMessage('Password must be between 3 and 32 characters'),
    body('firstName')
        .isLength({ min: 3, max: 15 })
        .withMessage('First name must be between 3 and 15 characters'),
    body('lastName')
        .isLength({ min: 3, max: 15 })
        .withMessage('Last name must be between 3 and 15 characters'),
    body('phone')
        .isMobilePhone()
        .withMessage('Invalid phone number'),
    body('address')
        .isLength({ min: 3, max: 15 })
        .withMessage('Address must be between 3 and 15 characters'),
    body('city')
        .isLength({ min: 3, max: 15 })
        .withMessage('City must be between 3 and 15 characters'),
    body('zipCode')
        .isLength({ min: 3, max: 15 })
        .withMessage('Zip code must be between 3 and 15 characters'),
    body('country')
        .isLength({ min: 3, max: 15 })
        .withMessage('Country must be between 3 and 15 characters'),
];

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
    body('email')
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
    body('email')
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
    body().isArray().withMessage('Input must be an array of booking items'),
    body('*.date').isISO8601().toDate().withMessage('Invalid date format'),
    body('*.room').isString().withMessage('Room must be a string'),
    body('*.hours').isArray().withMessage('Hours must be an array').custom((value) => {
        if (!Array.isArray(value)) {
            throw new Error('Hours must be an array');
        }
        for (const hour of value) {
            if (typeof hour !== 'number') {
                throw new Error('Each hour must be a number');
            }
        }
        return true;
    }),
    body('*.additions').custom((value) => {
        if (typeof value !== 'object' || value === null) {
            throw new Error('Additions must be an object');
        }
        const { coffee, girls, music } = value;
        if (typeof coffee !== 'boolean') {
            throw new Error('Additions.coffee must be a boolean');
        }
        if (typeof girls !== 'boolean') {
            throw new Error('Additions.girls must be a boolean');
        }
        if (typeof music !== 'boolean') {
            throw new Error('Additions.music must be a boolean');
        }
        return true;
    }),
    body('*.paymentMethod').isString().withMessage('Payment method must be a string'),
    body('*.numberOfVisitors').isInt({ min: 1 }).withMessage('Number of visitors must be at least 1'),
    body('*.userId').isString().withMessage('User Id must be a string')
];