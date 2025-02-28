import { Server } from '@hapi/hapi';
import { UserController } from '../controllers/user.controller';

export const userRoutes = (server: Server) => {
    const controller = new UserController();

    server.route([
        {
            method: 'GET',
            path: '/api/users',
            handler: (request, h) => controller.getAllUsers(request, h)
        },
        {
            method: 'GET',
            path: '/api/users/{id}',
            handler: (request, h) => controller.getUserById(request, h)
        },
        {
            method: 'PUT',
            path: '/api/users/{id}',
            handler: (request, h) => controller.updateUser(request, h)
        },
        {
            method: 'DELETE',
            path: '/api/users/{id}',
            handler: (request, h) => controller.deleteUser(request, h)
        },
        {
            method: 'POST',
            path: '/api/users/{id}/matieres',
            handler: (request, h) => controller.addMatiereToUser(request, h)
        },
        {
            method: 'DELETE',
            path: '/api/users/{id}/matieres/{matiereId}',
            handler: (request, h) => controller.removeMatiereFromUser(request, h)
        },
        {
            method: 'GET',
            path: '/api/users/{id}/matieres',
            handler: (request, h) => controller.getUserMatieres(request, h)
        },
        {
            method: 'GET',
            path: '/api/users/{id}/scores',
            handler: (request, h) => controller.getUserScores(request, h)
        },
        {
            method: 'GET',
            path: '/api/users/{id}/questions',
            handler: (request, h) => controller.getUserQuestions(request, h)
        },
        {
            method: 'GET',
            path: '/api/users/{id}/chapitres',
            handler: (request, h) => controller.getUserChapitres(request, h)
        }
    ]);
}; 