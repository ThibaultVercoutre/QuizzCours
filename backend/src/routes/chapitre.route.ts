import { Server } from '@hapi/hapi';
import { ChapitreController } from '../controllers/chapitre.controller';

export const chapitreRoutes = (server: Server) => {
    const controller = new ChapitreController();

    server.route([
        {
            method: 'GET',
            path: '/api/chapitres',
            handler: (request, h) => controller.getAllChapitres(request, h)
        },
        {
            method: 'GET',
            path: '/api/matieres/{matiereId}/chapitres',
            handler: (request, h) => controller.getChapitres(request, h)
        },
        {
            method: 'GET',
            path: '/api/chapitres/{id}',
            handler: (request, h) => controller.getChapitreById(request, h)
        },
        {
            method: 'POST',
            path: '/api/chapitres',
            handler: (request, h) => controller.createChapitre(request, h)
        },
        {
            method: 'PUT',
            path: '/api/chapitres/{id}',
            handler: (request, h) => controller.updateChapitre(request, h)
        },
        {
            method: 'DELETE',
            path: '/api/chapitres/{id}',
            handler: (request, h) => controller.deleteChapitre(request, h)
        }
    ]);
};