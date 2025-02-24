"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreController = void 0;
const score_service_1 = require("../services/score.service");
class ScoreController {
    constructor() {
        this.scoreService = new score_service_1.ScoreService();
    }
    async createScore(request, h) {
        try {
            const score = await this.scoreService.create(request.payload);
            return h.response(score).code(201);
        }
        catch (error) {
            console.error('Erreur lors de la création du score:', error);
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
    async getScoresByChapitreId(request, h) {
        try {
            const chapitreId = parseInt(request.params.chapitreId);
            const scores = await this.scoreService.findByChapitreId(chapitreId);
            return h.response(scores).code(200);
        }
        catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
    async getLatestScore(request, h) {
        try {
            const chapitreId = parseInt(request.params.chapitreId);
            const score = await this.scoreService.getLatestScore(chapitreId);
            if (!score) {
                return h.response({ message: 'Aucun score trouvé' }).code(404);
            }
            return h.response(score).code(200);
        }
        catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
    async getAverageScore(request, h) {
        try {
            const chapitreId = parseInt(request.params.chapitreId);
            const average = await this.scoreService.getAverageScore(chapitreId);
            return h.response({ average }).code(200);
        }
        catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
}
exports.ScoreController = ScoreController;
