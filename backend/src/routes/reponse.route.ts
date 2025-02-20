import { Server } from '@hapi/hapi';
import { ReponseController } from '../controllers/reponse.controller';

export const reponseRoutes = (server: Server) => {
    const controller = new ReponseController();

    server.route([
        {
            method: 'GET',
            path: '/api/questions/{questionId}/reponses',
            handler: (request, h) => controller.getReponses(request, h)
        },
        {
            method: 'GET',
            path: '/api/reponses/{id}',
            handler: (request, h) => controller.getReponseById(request, h)
        },
        {
            method: 'POST',
            path: '/api/reponses',
            handler: (request, h) => controller.createReponse(request, h)
        },
        {
            method: 'PUT',
            path: '/api/reponses/{id}',
            handler: (request, h) => controller.updateReponse(request, h)
        },
        {
            method: 'DELETE',
            path: '/api/reponses/{id}',
            handler: (request, h) => controller.deleteReponse(request, h)
        }
    ]);
};