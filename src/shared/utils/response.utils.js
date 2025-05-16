
import i18n from '../../config/i18n/index.js';
import { errors } from "../constant/https.js";

export class Response {

    /**
     * Constructs an HTTP response object.
     */
    static build(response) {
        const ownPayload = response?.ownPayload ?? errors.server;

        return {
            code: ownPayload.code,
            data: response.payload || null,
            message: i18n.__(ownPayload.message, response.ownParams)
        }
    }
}