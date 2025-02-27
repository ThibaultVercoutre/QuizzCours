import { Request, ResponseToolkit } from '@hapi/hapi';
import { ChapitreService } from '../services/chapitre.service';
import { ErrorService } from '../services/error.service';

export class ChapitreController {
    private chapitreService: ChapitreService;

    constructor() {
        this.chapitreService = new ChapitreService();
    }

    async getAllChapitres(request: Request, h: ResponseToolkit) {
        try {
            const chapitres = await this.chapitreService.getAll();
            return h.response(chapitres).code(200);
        } catch (error) {
            ErrorService.logError('getAllChapitres', error);
            return ErrorService.handleServerError(h, error);
        }
    }

    async getChapitres(request: Request, h: ResponseToolkit) {
        try {
            const matiereId = parseInt(request.params.matiereId);
            if (isNaN(matiereId)) {
                return ErrorService.handleValidationError(h, 'ID de matière invalide');
            }
            const chapitres = await this.chapitreService.getByMatiere(matiereId);
            return h.response(chapitres).code(200);
        } catch (error) {
            ErrorService.logError('getChapitres', error, { matiereId: request.params.matiereId });
            return ErrorService.handleServerError(h, error);
        }
    }

    async getChapitreById(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id);
            if (isNaN(id)) {
                return ErrorService.handleValidationError(h, 'ID invalide');
            }
            const chapitre = await this.chapitreService.findOne(id);
            if (!chapitre) {
                return ErrorService.handleNotFoundError(h, 'Chapitre');
            }
            return h.response(chapitre).code(200);
        } catch (error) {
            ErrorService.logError('getChapitreById', error, { id: request.params.id });
            return ErrorService.handleServerError(h, error);
        }
    }

    async createChapitre(request: Request, h: ResponseToolkit) {
        try {
            const payload = request.payload as any;
            if (!payload.titre) {
                return ErrorService.handleValidationError(h, 'Le titre du chapitre est requis');
            }
            if (!payload.matiere_id) {
                return ErrorService.handleValidationError(h, 'L\'ID de la matière est requis');
            }
            
            const chapitre = await this.chapitreService.create(payload);
            return h.response(chapitre).code(201);
        } catch (error) {
            ErrorService.logError('createChapitre', error, { payload: request.payload });
            return ErrorService.handleServerError(h, error);
        }
    }

    async updateChapitre(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id);
            if (isNaN(id)) {
                return ErrorService.handleValidationError(h, 'ID invalide');
            }
            
            const chapitre = await this.chapitreService.update(id, request.payload as any);
            if (!chapitre) {
                return ErrorService.handleNotFoundError(h, 'Chapitre');
            }
            return h.response(chapitre).code(200);
        } catch (error) {
            ErrorService.logError('updateChapitre', error, { 
                id: request.params.id, 
                payload: request.payload 
            });
            return ErrorService.handleServerError(h, error);
        }
    }

    async deleteChapitre(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id);
            if (isNaN(id)) {
                return ErrorService.handleValidationError(h, 'ID invalide');
            }
            
            const deleted = await this.chapitreService.delete(id);
            if (!deleted) {
                return ErrorService.handleNotFoundError(h, 'Chapitre');
            }
            return h.response().code(204);
        } catch (error) {
            ErrorService.logError('deleteChapitre', error, { id: request.params.id });
            return ErrorService.handleServerError(h, error);
        }
    }
}