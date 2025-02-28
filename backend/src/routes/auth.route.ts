import { Server } from '@hapi/hapi';
import { AuthController } from '../controllers/auth.controller';

export const authRoutes = (server: Server) => {
    const controller = new AuthController();

    server.route([
        {
            method: 'POST',
            path: '/api/auth/register',
            handler: (request, h) => controller.register(request, h)
        },
        {
            method: 'POST',
            path: '/api/auth/login',
            handler: (request, h) => controller.login(request, h)
        },
        {
            method: 'GET',
            path: '/api/auth/validate',
            handler: (request, h) => controller.validateToken(request, h)
        },
        {
            method: 'GET',
            path: '/api/auth/user',
            handler: (request, h) => controller.getCurrentUser(request, h)
        }
    ]);
}; 