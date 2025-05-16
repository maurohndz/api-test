import i18n from 'i18n';
import { resolve } from 'path';

i18n.configure({
    locales: ['es'],
    directory: resolve(`./src/locales`),
    defaultLocale: 'es',
    objectNotation: true,
});

export const t = i18n.__;

export default i18n;
