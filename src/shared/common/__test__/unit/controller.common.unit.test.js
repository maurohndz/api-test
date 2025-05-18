import CommonController from '../../controller.common.js';
import { Response } from '../../../utils/response.utils.js';

// Mock de Response.build
jest.mock('../utils/response.utils.js', () => ({
    Response: {
        build: jest.fn()
    }
}));

describe('CommonController', () => {
    let mockReq;
    let mockRes;
    let mockController;

    beforeEach(() => {
        // Resetear todos los mocks antes de cada prueba
        jest.clearAllMocks();
        
        // Configurar mocks básicos
        mockReq = {};
        mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        mockController = jest.fn();
    });

    describe('mount', () => {
        it('debería manejar una respuesta exitosa con payload y mensaje', async () => {
            // Arrange
            const mockPayload = { data: 'test' };
            const mockMessage = 'success';
            mockController.mockResolvedValue({ payload: mockPayload, message: mockMessage });
            
            const mockResponse = {
                code: 200,
                data: mockPayload
            };
            Response.build.mockReturnValue(mockResponse);

            // Act
            const mountedController = CommonController.mount(mockController);
            await mountedController(mockReq, mockRes);

            // Assert
            expect(mockController).toHaveBeenCalledWith(mockReq);
            expect(Response.build).toHaveBeenCalledWith({
                ownPayload: { code: 200, message: 'success' },
                payload: mockPayload
            });
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.send).toHaveBeenCalledWith(mockResponse);
        });

        it('debería manejar una respuesta exitosa con paginación', async () => {
            // Arrange
            const mockPayload = { data: 'test' };
            const mockPagination = { page: 1, limit: 10 };
            mockController.mockResolvedValue({ 
                payload: mockPayload, 
                ...mockPagination 
            });
            
            const mockResponse = {
                code: 200,
                data: mockPayload,
                ...mockPagination
            };
            Response.build.mockReturnValue(mockResponse);

            // Act
            const mountedController = CommonController.mount(mockController);
            await mountedController(mockReq, mockRes);

            // Assert
            expect(Response.build).toHaveBeenCalledWith({
                ownPayload: { code: 200, message: 'ok' },
                payload: mockPayload,
                ...mockPagination
            });
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.send).toHaveBeenCalledWith(mockResponse);
        });

        it('debería manejar errores correctamente', async () => {
            // Arrange
            const mockError = new Error('Test error');
            mockController.mockRejectedValue(mockError);
            
            const mockErrorResponse = {
                code: 500,
                message: 'Test error'
            };
            Response.build.mockReturnValue(mockErrorResponse);

            // Act
            const mountedController = CommonController.mount(mockController);
            await mountedController(mockReq, mockRes);

            // Assert
            expect(Response.build).toHaveBeenCalledWith(mockError);
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.send).toHaveBeenCalledWith(mockErrorResponse);
        });

        it('debería usar el código de error proporcionado por la respuesta', async () => {
            // Arrange
            const mockError = new Error('Test error');
            mockError.code = 400;
            mockController.mockRejectedValue(mockError);
            
            const mockErrorResponse = {
                code: 400,
                message: 'Test error'
            };
            Response.build.mockReturnValue(mockErrorResponse);

            // Act
            const mountedController = CommonController.mount(mockController);
            await mountedController(mockReq, mockRes);

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith(mockErrorResponse);
        });
    });
}); 