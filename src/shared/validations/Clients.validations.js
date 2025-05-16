import { check } from 'express-validator';
import { REGEX_LETTERS, REGEX_DATE_OF_BIRTH } from '../constant/regex.const.js';
import { GENDER } from '../constant/enumns.const.js';

/**
 * Name validation
 */
export const Name = ({
    fieldName = null,
    optional = false,
    field = 'client.name'
} = {}) => {
    const validation = check(fieldName ?? 'names').trim();

    if (optional) validation.optional({ nullable: true });

    return validation.notEmpty()
        .withMessage({ msg: 'validations.req', field })
        .bail()
        .isString()
        .withMessage({ msg: 'validations.format', field })
        .bail()
        .matches(REGEX_LETTERS)
        .withMessage({ msg: 'validations.format', field });
}

/**
 * Last name validation
 */
export const LastName = ({
    fieldName = null,
    optional = false,
    field = 'client.last_name'
} = {}) => {
    const validation = check(fieldName ?? 'last_names').trim();

    if (optional) validation.optional({ nullable: true });

    return validation.notEmpty()
        .withMessage({ msg: 'validations.req', field })
        .bail()
        .isString()
        .withMessage({ msg: 'validations.format', field })
        .bail()
        .matches(REGEX_LETTERS)
        .withMessage({ msg: 'validations.format', field });
}

/**
 * Date of birth validation
 */
export const DateOfBirth = ({
    fieldName = null,
    optional = false,
    field = 'client.date_of_birth'
} = {}) => {
    const validation = check(fieldName ?? 'date_of_birth');

    if (optional) validation.optional({ nullable: true });

    return validation.notEmpty()
        .withMessage({ msg: 'validations.req', field })
        .bail()
        .isString()
        .withMessage({ msg: 'validations.format', field })
        .bail()
        .matches(REGEX_DATE_OF_BIRTH)
        .withMessage({ msg: 'validations.format', field });
}

/**
 * Gender validation
 */
export const Gender = ({
    fieldName = null,
    optional = false,
    field = 'client.gender'
} = {}) => {
    const validation = check(fieldName ?? 'gender');

    if (optional) validation.optional({ nullable: true });

    return validation.notEmpty()
        .withMessage({ msg: 'validations.req', field })
        .bail()
        .isNumeric()
        .withMessage({ msg: 'validations.format', field })
        .bail()
        .isIn(GENDER)
        .withMessage({ msg: 'validations.format', field });
}