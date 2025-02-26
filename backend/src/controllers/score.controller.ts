import { Request, ResponseToolkit } from '@hapi/hapi';
import { ScoreService } from '../services/score.service';

export class ScoreController {
    private scoreService: ScoreService;

    constructor() {
        this.scoreService = new ScoreService();
    }

    async getAllScores(request: Request, h: ResponseToolkit) {
        try {
            const scores = await this.scoreService.getAllScores();
            return h.response(scores).code(200);
        } catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }

    async createScore(request: Request, h: ResponseToolkit) {
        try {
            const score = await this.scoreService.create(request.payload as any);
            return h.response(score).code(201);
        } catch (error) {
            console.error('Erreur lors de la création du score:', error);
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }

    async getScoresByChapitreId(request: Request, h: ResponseToolkit) {
        try {
            const chapitreId = parseInt(request.params.chapitreId);
            const scores = await this.scoreService.findByChapitreId(chapitreId);
            return h.response(scores).code(200);
        } catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }

    async getLatestScore(request: Request, h: ResponseToolkit) {
        try {
            const chapitreId = parseInt(request.params.chapitreId);
            const score = await this.scoreService.getLatestScore(chapitreId);
            if (!score) {
                return h.response({ message: 'Aucun score trouvé' }).code(404);
            }
            return h.response(score).code(200);
        } catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }

    async getAverageScore(request: Request, h: ResponseToolkit) {
        try {
            const chapitreId = parseInt(request.params.chapitreId);
            const average = await this.scoreService.getAverageScore(chapitreId);
            return h.response({ average }).code(200);
        } catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
} 