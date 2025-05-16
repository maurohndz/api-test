/**
 * Shared 
 */
import CommonError from '../shared/common/error.common.js';
import { verifyToken } from '../shared/utils/jwt.utils.js';
import { Response } from "../shared/utils/response.utils.js";

/**
 * 
 */
export async function Auth(_req, _res, next) {
    try {
        const authorization = _req.get('Authorization');

        if (!authorization || authorization === undefined) throw new CommonError('auth');

        const token = authorization.split(' ')[1];
        const owner = await verifyToken(token);

        _req.owner = owner;

        next();
    } catch (error) {
        const response = Response.build(error);

        // Send response
        _res.status(response.code).send(response);
    }
}

/**
 * Common auth middleware
 */
export const AuthCommon = (callback) => async (_req, _res, next) => {
    try {
        const authorization = _req.get('Authorization');

        if (!authorization || authorization === undefined) throw new CommonError('auth');

        const token = authorization.split(' ')[1];
        const owner = await verifyToken(token);

        _req.owner = owner;
        
        if (callback) await callback(_req, _res, next);

        next();
    } catch (error) {
        const response = Response.build(error);

        // Send response
        _res.status(response.code).send(response);
    }
}

/**
 * 
 */
export async function RefreshAuth(_req, _res, next) {
    try {
        const authorization = _req.get('Authorization');

        if (!authorization || authorization === undefined) throw new CommonError('auth');

        const token = authorization.split(' ')[1];
        const owner = await verifyToken(token, 'REFRESH');

        _req.owner = owner;

        next();
    } catch (error) {
        const response = Response.build(error);

        // Send response
        _res.status(response.code).send(response);
    }
}