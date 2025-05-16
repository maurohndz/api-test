/**
 * Shared
 */
import i18n from '../config/i18n/index.js';

/*
 * Middleware to set the response language based on the 'Accept-Language' header.
 */
export function setLanguages(req, res, next) {
    let lang = 'es';

    if (req.headers['accept-language']) {
        const languages = req.headers['accept-language'].split(',');
        const mainLanguage = languages[0].split('-')[0].split(';')[0];

        lang = mainLanguage;
    }
    i18n.setLocale(lang);

    next();
}
