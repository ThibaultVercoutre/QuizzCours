"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matiereRoutes = void 0;
const matiere_controller_1 = require("../controllers/matiere.controller");
const matiereRoutes = (server) => {
    const controller = new matiere_controller_1.MatiereController();
    server.route([
        {
            method: 'GET',
            path: '/api/matieres',
            handler: (request, h) => controller.getMatieres(request, h)
        },
        {
            method: 'GET',
            path: '/api/matieres/{id}',
            handler: (request, h) => controller.getMatiereById(request, h)
        },
        {
            method: 'POST',
            path: '/api/matieres',
            handler: (request, h) => controller.createMatiere(request, h)
        },
        {
            method: 'PUT',
            path: '/api/matieres/{id}',
            handler: (request, h) => controller.updateMatiere(request, h)
        },
        {
            method: 'DELETE',
            path: '/api/matieres/{id}',
            handler: (request, h) => controller.deleteMatiere(request, h)
        }
    ]);
};
exports.matiereRoutes = matiereRoutes;
