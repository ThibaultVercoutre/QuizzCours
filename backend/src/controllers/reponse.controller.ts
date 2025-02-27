import { Request, ResponseToolkit } from '@hapi/hapi';
import { ReponseService } from '../services/reponse.service';
import { ErrorService } from '../services/error.service';

export class ReponseController {
    private reponseService: ReponseService;

    constructor() {
        this.reponseService = new ReponseService();
    }

    async getReponses(request: Request, h: ResponseToolkit) {
        try {
            const questionId = parseInt(request.params.questionId);
            if (isNaN(questionId)) {
                return ErrorService.handleValidationError(h, 'ID de question invalide');
            }
            const reponses = await this.reponseService.findAll(questionId);
            return h.response(reponses).code(200);
        } catch (error) {
            ErrorService.logError('getReponses', error, { questionId: request.params.questionId });
            return ErrorService.handleServerError(h, error);
        }
    }

    async getReponseById(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id);
            if (isNaN(id)) {
                return ErrorService.handleValidationError(h, 'ID invalide');
            }
            const reponse = await this.reponseService.findOne(id);
            if (!reponse) {
                return ErrorService.handleNotFoundError(h, 'Réponse');
            }
            return h.response(reponse).code(200);
        } catch (error) {
            ErrorService.logError('getReponseById', error, { id: request.params.id });
            return ErrorService.handleServerError(h, error);
        }
    }

    async createReponse(request: Request, h: ResponseToolkit) {
        try {
            const payload = request.payload as any;
            if (!payload.texte) {
                return ErrorService.handleValidationError(h, 'Le texte de la réponse est requis');
            }
            if (payload.question_id === undefined) {
                return ErrorService.handleValidationError(h, 'L\'ID de la question est requis');
            }
            
            const reponse = await this.reponseService.create(payload);
            return h.response(reponse).code(201);
        } catch (error) {
            ErrorService.logError('createReponse', error, { payload: request.payload });
            return ErrorService.handleServerError(h, error);
        }
    }

    async updateReponse(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id);
            if (isNaN(id)) {
                return ErrorService.handleValidationError(h, 'ID invalide');
            }
            
            const reponse = await this.reponseService.update(id, request.payload as any);
            if (!reponse) {
                return ErrorService.handleNotFoundError(h, 'Réponse');
            }
            return h.response(reponse).code(200);
        } catch (error) {
            ErrorService.logError('updateReponse', error, { 
                id: request.params.id, 
                payload: request.payload 
            });
            return ErrorService.handleServerError(h, error);
        }
    }

    async deleteReponse(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id);
            if (isNaN(id)) {
                return ErrorService.handleValidationError(h, 'ID invalide');
            }
            
            const deleted = await this.reponseService.delete(id);
            if (!deleted) {
                return ErrorService.handleNotFoundError(h, 'Réponse');
            }
            return h.response().code(204);
        } catch (error) {
            ErrorService.logError('deleteReponse', error, { id: request.params.id });
            return ErrorService.handleServerError(h, error);
        }
    }
}