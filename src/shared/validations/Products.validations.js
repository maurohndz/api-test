import { check } from 'express-validator';

/**
 * Name validation
 */
export const Name = ({
    fieldName = null,
    optional = false,
    field = 'products.name'
} = {}) => {
    const validation = check(fieldName ?? 'name').trim().customSanitizer(value => {
        return value
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    });

    if (optional) validation.optional({ nullable: true });

    return validation.notEmpty()
        .withMessage({ msg: 'validations.req', field })
        .bail()
        .isString()
        .withMessage({ msg: 'validations.format', field })
        .bail()
        .isLength({ min: 3, max: 50 })
        .withMessage({ msg: 'validations.length', field });
};

/**
 * Weight validation
 */
export const Weight = ({
    fieldName = null,
    optional = false,
    field = 'products.weight'
} = {}) => {
    const validation = check(fieldName ?? 'weight').trim();

    if (optional) validation.optional({ nullable: true });

    return validation.notEmpty()
        .withMessage({ msg: 'validations.req', field })
        .bail()
        .isFloat({ min: 0.001, max: 9999.999 })
        .withMessage({ msg: 'validations.format', field });
};

/**
 * Price validation
 */
export const Price = ({
    fieldName = null,
    optional = false,
    field = 'products.price'
} = {}) => {
    const validation = check(fieldName ?? 'price').trim().toFloat();

    if (optional) validation.optional({ nullable: true });

    return validation.notEmpty()
        .withMessage({ msg: 'validations.req', field })
        .bail()
        .isFloat({ min: 0.01, max: 9999.99 })
        .withMessage({ msg: 'validations.format', field });
};
