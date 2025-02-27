import { Request, ResponseToolkit } from '@hapi/hapi';
import { ScoreService } from '../services/score.service';
import { ErrorService } from '../services/error.service';

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
            ErrorService.logError('getAllScores', error);
            return ErrorService.handleServerError(h, error);
        }
    }

    async createScore(request: Request, h: ResponseToolkit) {
        try {
            const payload = request.payload as any;
            if (!payload.chapitre_id) {
                return ErrorService.handleValidationError(h, 'L\'ID du chapitre est requis');
            }
            if (payload.pourcentage === undefined) {
                return ErrorService.handleValidationError(h, 'Le pourcentage est requis');
            }
            
            const score = await this.scoreService.create(payload);
            return h.response(score).code(201);
        } catch (error) {
            ErrorService.logError('createScore', error, { payload: request.payload });
            return ErrorService.handleServerError(h, error);
        }
    }

    async getScoresByChapitreId(request: Request, h: ResponseToolkit) {
        try {
            const chapitreId = parseInt(request.params.chapitreId);
            if (isNaN(chapitreId)) {
                return ErrorService.handleValidationError(h, 'ID de chapitre invalide');
            }
            
            const scores = await this.scoreService.findByChapitreId(chapitreId);
            return h.response(scores).code(200);
        } catch (error) {
            ErrorService.logError('getScoresByChapitreId', error, { chapitreId: request.params.chapitreId });
            return ErrorService.handleServerError(h, error);
        }
    }

    async getLatestScore(request: Request, h: ResponseToolkit) {
        try {
            const chapitreId = parseInt(request.params.chapitreId);
            if (isNaN(chapitreId)) {
                return ErrorService.handleValidationError(h, 'ID de chapitre invalide');
            }
            
            const score = await this.scoreService.getLatestScore(chapitreId);
            if (!score) {
                return ErrorService.handleNotFoundError(h, 'Score');
            }
            return h.response(score).code(200);
        } catch (error) {
            ErrorService.logError('getLatestScore', error, { chapitreId: request.params.chapitreId });
            return ErrorService.handleServerError(h, error);
        }
    }

    async getAverageScore(request: Request, h: ResponseToolkit) {
        try {
            const chapitreId = parseInt(request.params.chapitreId);
            if (isNaN(chapitreId)) {
                return ErrorService.handleValidationError(h, 'ID de chapitre invalide');
            }
            
            const average = await this.scoreService.getAverageScore(chapitreId);
            return h.response({ average }).code(200);
        } catch (error) {
            ErrorService.logError('getAverageScore', error, { chapitreId: request.params.chapitreId });
            return ErrorService.handleServerError(h, error);
        }
    }
} 