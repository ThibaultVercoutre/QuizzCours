"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reponseRoutes = void 0;
const reponse_controller_1 = require("../controllers/reponse.controller");
const reponseRoutes = (server) => {
    const controller = new reponse_controller_1.ReponseController();
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
exports.reponseRoutes = reponseRoutes;
