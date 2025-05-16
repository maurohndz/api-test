import { check } from 'express-validator';

/**
 * Description validation
 */
export const Description = ({
    fieldName = null, optional = false,
    field = 'stores.description'
} = {}) => {
    const validation = check(fieldName ?? 'description').trim();

    if (optional) validation.optional({ nullable: true });

    return validation.notEmpty()
        .withMessage({ msg: 'validations.req', field })
        .isString()
        .withMessage({ msg: 'validations.format', field })
        .isLength({ min: 3, max: 50 })
        .withMessage({ msg: 'validations.length', field });
};

/**
 * Company name validation
 */
export const CompanyName = ({
    fieldName = null, optional = false,
    field = 'stores.company_name'
} = {}) => {
    const validation = check(fieldName ?? 'company_name').trim()
        .customSanitizer(value => {
            return value
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        });

    if (optional) validation.optional({ nullable: true });

    return validation.notEmpty()
        .withMessage({ msg: 'validations.req', field })
        .isString()
        .withMessage({ msg: 'validations.format', field })
        .isLength({ min: 3, max: 50 })
        .withMessage({ msg: 'validations.length', field });
};
