import { Request, ResponseToolkit } from '@hapi/hapi';
import { ChapitreService } from '../services/chapitre.service';

export class ChapitreController {
    private chapitreService: ChapitreService;

    constructor() {
        this.chapitreService = new ChapitreService();
    }

    async getChapitres(request: Request, h: ResponseToolkit) {
        try {
            const matiereId = parseInt(request.params.matiereId);
            const chapitres = await this.chapitreService.getByMatiere(matiereId);
            return h.response(chapitres).code(200);
        } catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }

    async getChapitreById(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id);
            const chapitre = await this.chapitreService.findOne(id);
            if (!chapitre) {
                return h.response({ error: 'Chapitre not found' }).code(404);
            }
            return h.response(chapitre).code(200);
        } catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }

    async createChapitre(request: Request, h: ResponseToolkit) {
        try {
            const chapitre = await this.chapitreService.create(request.payload as any);
            return h.response(chapitre).code(201);
        } catch (error) {
            console.error('Erreur lors de la création du chapitre:', error);
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }

    async updateChapitre(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id);
            const chapitre = await this.chapitreService.update(id, request.payload as any);
            if (!chapitre) {
                return h.response({ error: 'Chapitre not found' }).code(404);
            }
            return h.response(chapitre).code(200);
        } catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }

    async deleteChapitre(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id);
            const deleted = await this.chapitreService.delete(id);
            if (!deleted) {
                return h.response({ error: 'Chapitre not found' }).code(404);
            }
            return h.response().code(204);
        } catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
}