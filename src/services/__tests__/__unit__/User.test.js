import UserService from '../../User.service.js';
import UsersRepository from '../../../repositories/Users.repository.js';
import CommonError from '../../../shared/common/error.common.js';
import { errors } from '../../../shared/constant/https.js';
import { createModelMock, createTransactionMock } from '../../../__tests__/__mocks__/sequelize.mock.js';

jest.mock('../../../repositories/Users.repository.js');

describe('User.service - Create', () => {
    let service = null;
    let repository = null;

    beforeEach(() => {
        service = new UserService();
        repository = new UsersRepository();

        service.repository = repository;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Create should throw an error if user already exists', async () => {
        const data = { email: 'existing@example.com', name: 'John Doe' };
        const mockUser = createModelMock(data);
        const mockTransaction = createTransactionMock();

        repository.findOne.mockResolvedValue(mockUser);

        const error = await service.create(mockTransaction, data).catch(e => e);

        expect(error).toBeInstanceOf(CommonError);
        expect(error.message).toBe(errors['exists'].message);
        expect(repository.findOne).toHaveBeenCalledWith({ where: { email: data.email } });
    });

    test('Create should successfully create a new user', async () => {
        const userData = { email: 'new@example.com', name: 'Jane Doe' };
        const mockCreatedUser = createModelMock({ id: 1, ...userData });
        const mockTransaction = createTransactionMock();

        repository.findOne.mockResolvedValue(null);
        repository.create.mockResolvedValue(mockCreatedUser);

        const result = await service.create(mockTransaction, userData);

        expect(repository.findOne).toHaveBeenCalledWith({ where: { email: userData.email } });
        expect(repository.create).toHaveBeenCalledWith({ payload: userData }, mockTransaction);
        expect(result).toEqual(mockCreatedUser);
    });
});
