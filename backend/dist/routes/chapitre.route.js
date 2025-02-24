"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chapitreRoutes = void 0;
const chapitre_controller_1 = require("../controllers/chapitre.controller");
const chapitreRoutes = (server) => {
    const controller = new chapitre_controller_1.ChapitreController();
    server.route([
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
exports.chapitreRoutes = chapitreRoutes;
