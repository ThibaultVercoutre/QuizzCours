import { Request, ResponseToolkit } from '@hapi/hapi';
import { ReponseService } from '../services/reponse.service';

export class ReponseController {
    private reponseService: ReponseService;

    constructor() {
        this.reponseService = new ReponseService();
    }

    async getReponses(request: Request, h: ResponseToolkit) {
        try {
            const questionId = parseInt(request.params.questionId);
            const reponses = await this.reponseService.findAll(questionId);
            return h.response(reponses).code(200);
        } catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }

    async getReponseById(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id);
            const reponse = await this.reponseService.findOne(id);
            if (!reponse) {
                return h.response({ error: 'Reponse not found' }).code(404);
            }
            return h.response(reponse).code(200);
        } catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }

    async createReponse(request: Request, h: ResponseToolkit) {
        try {
            const reponse = await this.reponseService.create(request.payload as any);
            return h.response(reponse).code(201);
        } catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }

    async updateReponse(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id);
            const reponse = await this.reponseService.update(id, request.payload as any);
            if (!reponse) {
                return h.response({ error: 'Reponse not found' }).code(404);
            }
            return h.response(reponse).code(200);
        } catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }

    async deleteReponse(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id);
            const deleted = await this.reponseService.delete(id);
            if (!deleted) {
                return h.response({ error: 'Reponse not found' }).code(404);
            }
            return h.response().code(204);
        } catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
}