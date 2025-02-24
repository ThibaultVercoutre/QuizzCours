"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoreRoutes = void 0;
const score_controller_1 = require("../controllers/score.controller");
const scoreRoutes = (server) => {
    const controller = new score_controller_1.ScoreController();
    server.route([
        {
            method: 'POST',
            path: '/api/scores',
            handler: (request, h) => controller.createScore(request, h)
        },
        {
            method: 'GET',
            path: '/api/chapitres/{chapitreId}/scores',
            handler: (request, h) => controller.getScoresByChapitreId(request, h)
        },
        {
            method: 'GET',
            path: '/api/chapitres/{chapitreId}/scores/latest',
            handler: (request, h) => controller.getLatestScore(request, h)
        },
        {
            method: 'GET',
            path: '/api/chapitres/{chapitreId}/scores/average',
            handler: (request, h) => controller.getAverageScore(request, h)
        }
    ]);
};
exports.scoreRoutes = scoreRoutes;
