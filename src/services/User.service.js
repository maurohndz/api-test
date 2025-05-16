import UsersRepository from "../repositories/Users.repository.js";
import CommonError from '../shared/common/error.common.js';

class AuthUserService {
	constructor() {
		this.repository = new UsersRepository();
	}

    async create(transaction, data) {
        const exist = await this.repository.findOne({
            where: { email: data?.email }
        });

        if (exist) throw new CommonError('exists');

        const user = await this.repository.create({
            payload: data
        }, transaction)

        return user;
    }
}

export default AuthUserService;