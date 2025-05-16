import { check } from 'express-validator';
import { REGEX_USERNAME, REGEX_DATE_HOUR } from '../constant/regex.const.js';
import { DOCUMENT_TYPE, DISCOUNT_PERCENTAGE } from '../constant/enumns.const.js';

/**
 * UUID validation
 */
export const Uuid = ({
    fieldName = null,
    optional = false,
    field = 'general.uuid'
} = {}) => {
    const validation = check(fieldName ?? 'uuid');

    if (optional) validation.optional({ nullable: true });

    return validation.notEmpty()
        .withMessage({ msg: 'validations.req', field })
        .bail()
        .isUUID()
        .withMessage({ msg: 'validations.format', field });
};

/**
 * Password validation
 */
export const Password = ({
    fieldName = null,
    optional = false,
    field = 'users.password'
} = {}) => {
    const validation = check(fieldName ?? 'password');

    if (optional) validation.optional({ nullable: true });

    return validation.notEmpty()
        .withMessage({ msg: 'validations.req', field })
        .bail()
        .isString()
        .withMessage({ msg: 'validations.format', field });
};

/**
 * Otp code validation
 */
export const OtpCode = ({
    fieldName = null,
    optional = false,
    field = 'general.otp_code'
} = {}) => {
    const validation = check(fieldName ?? 'otp_code');

    if (optional) validation.optional({ nullable: true });

    return validation.notEmpty()
        .withMessage({ msg: 'validations.req', field })
        .bail()
        .isNumeric()
        .withMessage({ msg: 'validations.format', field })
        .bail()
        .isLength({ min: 6, max: 6 })
        .withMessage({ msg: 'validations.format', field });
};

// Information

/**
 * Username validation
 */
export const Username = ({
    fieldName = null,
    optional = false,
    field = 'users.username'
} = {}) => {
    const validation = check(fieldName ?? 'username').trim();

    if (optional) validation.optional({ nullable: true });

    return validation.notEmpty()
        .withMessage({ msg: 'validations.req', field })
        .bail()
        .isString()
        .withMessage({ msg: 'validations.format', field })
        .bail()
        .matches(REGEX_USERNAME)
        .withMessage({ msg: 'validations.invalid_characters', field })
        .bail();
        /*.isLength({ min: 5 })
        .withMessage({ msg: 'validations.length_text', field, min: 5 });*/
};

/**
 * Email validation
 */
export const Email = ({
    fieldName = null,
    optional = false,
    field = 'users.email',
} = {}) => {
    const validation = check(fieldName ?? 'email').trim().toLowerCase();

    if (optional) validation.optional({ nullable: true });

    return validation.notEmpty()
        .withMessage({ msg: 'validations.req', field })
        .bail()
        .isEmail()
        .withMessage({ msg: 'validations.format', field });
};

/**
 * Document type validation
 */
export const DocumentType = ({
    fieldName = null,
    optional = false,
    field = 'users.document_type'
} = {}) => {
    const validation = check(fieldName ?? 'document_type');

    if (optional) validation.optional({ nullable: true });

    return validation.notEmpty()
        .withMessage({ msg: 'validations.req', field })
        .bail()
        .isNumeric()
        .withMessage({ msg: 'validations.integer', field })
        .bail()
        .isIn(DOCUMENT_TYPE)
        .withMessage({ msg: 'validations.allowed', field });
};

/**
 * Document number validation
 */
export const DocumentNumber = ({
    fieldName = null,
    optional = false,
    field = 'users.document_number'
} = {}) => {
    const validation = check(fieldName ?? 'document_number');

    if (optional) validation.optional({ nullable: true });

    // TODO: add validation to length
    return validation.notEmpty()
        .withMessage({ msg: 'validations.req', field })
        .bail()
        .isString()
        .withMessage({ msg: 'validations.format', field })
        .bail()
        .isLength({ min: 7, max: 11 })
        .withMessage({ msg: 'validations.length', field, });
};

/**
 * Phone number validation
 */
export const PhoneNumber = ({
    fieldName = null,
    optional = false,
    field = 'users.phone_number'
} = {}) => {
    const validation = check(fieldName ?? 'phone_number').trim()
        .customSanitizer((value) => value.replace(/\D/g, ''));

    if (optional) validation.optional({ nullable: true });

    // TODO: Add phone number validation
    return validation.notEmpty()
        .withMessage({ msg: 'validations.req', field })
        .bail()
        .isString()
        .withMessage({ msg: 'validations.format', field })
        .bail()
        .isLength({ min: 10, max: 10 })
        .withMessage({ msg: 'validations.length', field });
};

/**
 * Bank validation
 */
export const Bank = ({
    fieldName = null,
    optional = false,
    field = 'banks.bank'
} = {}) => {
    const validation = check(fieldName ?? 'bank');

    if (optional) validation.optional({ nullable: true });

    return validation.notEmpty()
        .withMessage({ msg: 'validations.req', field })
        .bail()
        .isString()
        .withMessage({ msg: 'validations.format', field })
        .bail()
        .isLength({ min: 4, max: 4 })
        .withMessage({ msg: 'validations.exact_length', field, length: 4 });
};

/**
 * Discount percentage validation
 */
export const DiscountPercentage = ({
    fieldName = null,
    optional = false,
    field = 'offers.discount_percentage'
} = {}) => {
    const validation = check(fieldName ?? 'discount_percentage');

    if (optional) validation.optional({ nullable: true });

    return validation.notEmpty()
        .withMessage({ msg: 'validations.req', field })
        .bail()
        .isNumeric()
        .withMessage({ msg: 'validations.format', field })
        .bail()
        .isIn(DISCOUNT_PERCENTAGE)
        .withMessage({ msg: 'validations.allowed', field });
};

/**
 * Expiration date validation
 */
export const ExpirationDate = ({
    fieldName = null,
    optional = false,
    field = 'offers.expiration_date'
} = {}) => {
    const validation = check(fieldName ?? 'expiration_date');

    if (optional) validation.optional({ nullable: true });

    return validation.notEmpty()
        .withMessage({ msg: 'validations.req', field })
        .bail()
        .matches(REGEX_DATE_HOUR)
        .withMessage({ msg: 'validations.format', field })
        .custom((value) => {
            const inputDate = new Date(value);
            const minDate = new Date();
            minDate.setMinutes(minDate.getMinutes() + 30);

            if (inputDate <= minDate) throw new Error({ msg: 'validations.min_date', field });

            return true;
        });
};

// Location

/**
 * Parish id validation
 */
export const ParishId = ({
    fieldName = null,
    optional = false,
    field = 'ubigeo.parish_id'
} = {}) => {
    const validation = check(fieldName ?? 'parish_id');

    if (optional) validation.optional({ nullable: true });

    return validation.notEmpty()
        .withMessage({ msg: 'validations.req', field })
        .bail()
        .isInt()
        .withMessage({ msg: 'validations.format', field });
};

/**
 * Longitude validation
 */
export const Longitude = ({
    fieldName = null,
    optional = false,
    field = 'ubigeo.longitude'
} = {}) => {
    const validation = check(fieldName ?? 'longitude');

    if (optional) validation.optional({ nullable: true });

    return validation.notEmpty()
        .withMessage({ msg: 'validations.req', field })
        .bail()
        .isFloat()
        .withMessage({ msg: 'validations.format', field });
};

/**
 * Latitude validation
 */
export const Latitude = ({
    fieldName = null,
    optional = false,
    field = 'ubigeo.latitude'
} = {}) => {
    const validation = check(fieldName ?? 'latitude');

    if (optional) validation.optional({ nullable: true });

    return validation.notEmpty()
        .withMessage({ msg: 'validations.req', field })
        .bail()
        .isFloat()
        .withMessage({ msg: 'validations.format', field });
};

/**
 * Range validation
 */
export const Range = ({
    fieldName = null,
    optional = false,
    field = 'ubigeo.range'
} = {}) => {
    const validation = check(fieldName ?? 'range');

    if (optional) validation.optional({ nullable: true });

    return validation.notEmpty()
        .withMessage({ msg: 'validations.req', field })
        .bail()
        .isInt()
        .withMessage({ msg: 'validations.format', field })
        .bail()
        .isInt({ min: 1, max: 100 })
        .withMessage({ msg: 'validations.format', field });
};

/**
 * Number validation
 */
export const Number = ({
    fieldName = null,
    optional = false,
    field = 'general.number',
    min = 1,
    max = 5
} = {}) => {
    const validation = check(fieldName ?? 'number');

    if (optional) validation.optional({ nullable: true });

    return validation.notEmpty()
        .withMessage({ msg: 'validations.req', field })
        .bail()
        .isFloat({ min, max })
        .withMessage({ msg: 'validations.format', field });
}