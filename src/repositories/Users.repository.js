import Repository from '../core/repository.core.js';
import DataBase from '../shared/database/connection.js';
import initModels from '../shared/database/models/init-models.js';

const models = initModels(DataBase);

class UsersRepository extends Repository {
    constructor() {
        super(models.users);
    }
}

UsersRepository.model = models.users;

export default UsersRepository;
