"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReponseController = void 0;
const reponse_service_1 = require("../services/reponse.service");
class ReponseController {
    constructor() {
        this.reponseService = new reponse_service_1.ReponseService();
    }
    async getReponses(request, h) {
        try {
            const questionId = parseInt(request.params.questionId);
            const reponses = await this.reponseService.findAll(questionId);
            return h.response(reponses).code(200);
        }
        catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
    async getReponseById(request, h) {
        try {
            const id = parseInt(request.params.id);
            const reponse = await this.reponseService.findOne(id);
            if (!reponse) {
                return h.response({ error: 'Reponse not found' }).code(404);
            }
            return h.response(reponse).code(200);
        }
        catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
    async createReponse(request, h) {
        try {
            const reponse = await this.reponseService.create(request.payload);
            return h.response(reponse).code(201);
        }
        catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
    async updateReponse(request, h) {
        try {
            const id = parseInt(request.params.id);
            const reponse = await this.reponseService.update(id, request.payload);
            if (!reponse) {
                return h.response({ error: 'Reponse not found' }).code(404);
            }
            return h.response(reponse).code(200);
        }
        catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
    async deleteReponse(request, h) {
        try {
            const id = parseInt(request.params.id);
            const deleted = await this.reponseService.delete(id);
            if (!deleted) {
                return h.response({ error: 'Reponse not found' }).code(404);
            }
            return h.response().code(204);
        }
        catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
}
exports.ReponseController = ReponseController;
