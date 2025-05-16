import { Response } from "../utils/response.utils.js";
import { success } from "../constant/https.js";

class CommonController {
    static mount = (controller) => async (req, res) => {
        try {
            const { payload, message, ...pagination } = await controller(req);

            const response = Response.build({
                ownPayload: success[message ?? 'ok'],
                payload,
                ...pagination
            });

            // Send response
            return res.status(response.code).send(response);
        } catch (error) {
            const response = Response.build(error);

            res.status(response.code || 500).send(response);
        }
    };
}

export default CommonController;
