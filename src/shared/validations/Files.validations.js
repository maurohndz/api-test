import { check } from 'express-validator';
import { REGEX_IMAGE_FORMAT, REGEX_IMAGE_SIZE } from '../constant/regex.const.js';

/**
 * Image validation
 */
export const Image = ({
    fieldName = null, optional = false,
    field = 'general.image'
} = {}) => {
    const validation = check(fieldName ?? 'image');

    if (optional) validation.optional({ nullable: true });

    return validation
        .isString()
        .withMessage({ msg: 'validations.format', field })
        .custom((value) => {
            if (!value) return true;
            if (value && value.startsWith('data:')) {
                if (!REGEX_IMAGE_FORMAT.test(value)) throw new Error({ msg: 'validations.format', field });

                const base64Length = value.replace(REGEX_IMAGE_SIZE, '').length;
                const fileSize = (base64Length * 3) / 4;

                if (fileSize > 1048576) throw new Error({ msg: 'validations.size', field });
            }

            return true;
        });
};
