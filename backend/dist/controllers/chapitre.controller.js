"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapitreController = void 0;
const chapitre_service_1 = require("../services/chapitre.service");
class ChapitreController {
    constructor() {
        this.chapitreService = new chapitre_service_1.ChapitreService();
    }
    async getChapitres(request, h) {
        try {
            const matiereId = parseInt(request.params.matiereId);
            const chapitres = await this.chapitreService.getByMatiere(matiereId);
            return h.response(chapitres).code(200);
        }
        catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
    async getChapitreById(request, h) {
        try {
            const id = parseInt(request.params.id);
            const chapitre = await this.chapitreService.findOne(id);
            if (!chapitre) {
                return h.response({ error: 'Chapitre not found' }).code(404);
            }
            return h.response(chapitre).code(200);
        }
        catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
    async createChapitre(request, h) {
        try {
            const chapitre = await this.chapitreService.create(request.payload);
            return h.response(chapitre).code(201);
        }
        catch (error) {
            console.error('Erreur lors de la création du chapitre:', error);
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
    async updateChapitre(request, h) {
        try {
            const id = parseInt(request.params.id);
            const chapitre = await this.chapitreService.update(id, request.payload);
            if (!chapitre) {
                return h.response({ error: 'Chapitre not found' }).code(404);
            }
            return h.response(chapitre).code(200);
        }
        catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
    async deleteChapitre(request, h) {
        try {
            const id = parseInt(request.params.id);
            const deleted = await this.chapitreService.delete(id);
            if (!deleted) {
                return h.response({ error: 'Chapitre not found' }).code(404);
            }
            return h.response().code(204);
        }
        catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
}
exports.ChapitreController = ChapitreController;
