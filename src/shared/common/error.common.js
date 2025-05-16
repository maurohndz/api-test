import { errors } from '../constant/https.js';

class CommonError extends Error {
    constructor(error, params = {}) {
        super(errors[error].message);

        this.ownPayload = errors[error];
        this.ownParams = params;
    }
}

export default CommonError;
