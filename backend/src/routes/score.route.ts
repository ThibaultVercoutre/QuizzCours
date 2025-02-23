import { Server } from '@hapi/hapi';
import { ScoreController } from '../controllers/score.controller';

export const scoreRoutes = (server: Server) => {
    const controller = new ScoreController();

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