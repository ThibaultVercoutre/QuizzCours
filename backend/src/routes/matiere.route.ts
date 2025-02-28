import { Server } from '@hapi/hapi';
import { MatiereController } from '../controllers/matiere.controller';

export const matiereRoutes = (server: Server) => {
    const controller = new MatiereController();

    server.route([
        {
            method: 'GET',
            path: '/api/matieres',
            handler: (request, h) => controller.getMatieres(request, h),
            options: {
                auth: 'jwt'
            }
        },        
        {
            method: 'GET',
            path: '/api/matieres/{id}',
            handler: (request, h) => controller.getMatiereById(request, h),
            options: {
                auth: 'jwt'
            }
        },
        {
            method: 'POST',
            path: '/api/matieres',
            handler: (request, h) => controller.createMatiere(request, h),
            options: {
                auth: 'jwt'
            }
        },
        {
            method: 'PUT',
            path: '/api/matieres/{id}',
            handler: (request, h) => controller.updateMatiere(request, h),
            options: {
                auth: 'jwt'
            }
        },
        {
            method: 'DELETE',
            path: '/api/matieres/{id}',
            handler: (request, h) => controller.deleteMatiere(request, h),
            options: {
                auth: 'jwt'
            }
        }
    ]);
};
