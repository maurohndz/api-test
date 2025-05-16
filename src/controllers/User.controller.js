import * as URLs from "../urls/User.url.js";
import UserService from "../services/User.service.js";
import Controller from '../shared/common/controller.common.js';
import DataBase from '../shared/database/connection.js';

function UserController(main) {
    const service = new UserService();

    /**
     * [POST]: user Create
     */
    main.post(URLs.REGISTER, Controller.mount(async (_req, _res) => {
        const transaction = await DataBase.transaction();

        return await service.create(transaction, _req.body)
            .then(async (data) => {
                await transaction.commit();

                return {
                    payload: data,
                }
            })
            .catch(async (error) => {
                await transaction.rollback();

                throw error;
            });
    }));
}

export default UserController;