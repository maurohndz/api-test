import request from 'supertest';
import express from 'express';
import UserController from '../../User.controller.js';
import UserService from '../../../services/User.service.js';
import DataBase from '../../../shared/database/connection.js';
import { createSequelizeMock } from '../../../__mocks__/sequelize.mock.js';

jest.mock('../../../services/User.service.js');
jest.mock('../../../shared/database/connection.js');

describe('UserController Integration', () => {
    let app;
    let service;
    let transaction;

    beforeEach(() => {
        app = express();
        app.use(express.json());
        
        // Mock de la transacción
        transaction = {
            commit: jest.fn(),
            rollback: jest.fn()
        };
        DataBase.transaction.mockResolvedValue(transaction);

        // Inicializar el controlador
        UserController(app);
        
        // Obtener instancia del servicio mockeado
        service = new UserService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /register', () => {
        const validUserData = {
            email: 'test@example.com',
            name: 'Test User'
        };

        test('should create user successfully', async () => {
            const mockUser = createSequelizeMock({ id: 1, ...validUserData });
            service.create.mockResolvedValue(mockUser);

            const response = await request(app)
                .post('/register')
                .send(validUserData);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                payload: mockUser.toJSON()
            });
            expect(service.create).toHaveBeenCalledWith(transaction, validUserData);
            expect(transaction.commit).toHaveBeenCalled();
            expect(transaction.rollback).not.toHaveBeenCalled();
        });

        test('should handle user already exists error', async () => {
            const error = new Error('User already exists');
            service.create.mockRejectedValue(error);

            const response = await request(app)
                .post('/register')
                .send(validUserData);

            expect(response.status).toBe(500);
            expect(service.create).toHaveBeenCalledWith(transaction, validUserData);
            expect(transaction.commit).not.toHaveBeenCalled();
            expect(transaction.rollback).toHaveBeenCalled();
        });

        test('should handle database transaction error', async () => {
            DataBase.transaction.mockRejectedValue(new Error('Database connection error'));

            const response = await request(app)
                .post('/register')
                .send(validUserData);

            expect(response.status).toBe(500);
            expect(service.create).not.toHaveBeenCalled();
            expect(transaction.commit).not.toHaveBeenCalled();
            expect(transaction.rollback).not.toHaveBeenCalled();
        });

        test('should handle invalid request body', async () => {
            const invalidUserData = {
                email: 'invalid-email',
                name: ''
            };

            const response = await request(app)
                .post('/register')
                .send(invalidUserData);

            expect(response.status).toBe(400);
            expect(service.create).not.toHaveBeenCalled();
            expect(transaction.commit).not.toHaveBeenCalled();
            expect(transaction.rollback).not.toHaveBeenCalled();
        });
    });
}); 