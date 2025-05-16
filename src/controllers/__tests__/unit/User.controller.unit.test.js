import UserController from '../../User.controller.js';
import UserService from '../../../services/User.service.js';
import DataBase from '../../../shared/database/connection.js';

jest.mock('../../../services/User.service.js');
jest.mock('../../../shared/database/connection.js');

describe('UserController Unit', () => {
    let router;
    let service;

    beforeEach(() => {
        // Mock del router de Express
        router = {
            post: jest.fn()
        };

        // Inicializar el controlador
        UserController(router);
        
        // Obtener instancia del servicio mockeado
        service = new UserService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should register POST /register route', () => {
        expect(router.post).toHaveBeenCalledWith('/register', expect.any(Function));
    });

    test('should mount controller with correct handler', () => {
        const handler = router.post.mock.calls[0][1];
        expect(typeof handler).toBe('function');
    });
}); 