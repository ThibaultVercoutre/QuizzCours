import { Request, ResponseToolkit } from '@hapi/hapi';
import { MatiereService } from '../services/matiere.service';
import { ErrorService } from '../services/error.service';

export class MatiereController {
    private matiereService: MatiereService;

    constructor() {
        this.matiereService = new MatiereService();
    }

    async getMatieres(request: Request, h: ResponseToolkit) {
        try {
            const matieres = await this.matiereService.getAllMatieres();
            return h.response(matieres).code(200);
        } catch (error) {
            ErrorService.logError('getMatieres', error);
            return ErrorService.handleServerError(h, error);
        }
    }

    async getMatiereById(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id);
            if (isNaN(id)) {
                return ErrorService.handleValidationError(h, 'ID invalide');
            }
            const matiere = await this.matiereService.getMatiereById(id);
            if (!matiere) {
                return ErrorService.handleNotFoundError(h, 'Matière');
            }
            return h.response(matiere).code(200);
        } catch (error) {
            ErrorService.logError('getMatiereById', error, { id: request.params.id });
            return ErrorService.handleServerError(h, error);
        }
    }

    async createMatiere(request: Request, h: ResponseToolkit) {
        try {
            const matiere = request.payload as {
                nom: string;
                description?: string;
            };

            if (!matiere.nom) {
                return ErrorService.handleValidationError(h, 'Le nom de la matière est requis');
            }

            const newMatiere = await this.matiereService.createMatiere(matiere);
            return h.response(newMatiere).code(201);
        } catch (error) {
            ErrorService.logError('createMatiere', error, { payload: request.payload });
            return ErrorService.handleServerError(h, error);
        }
    }

    async updateMatiere(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id);
            if (isNaN(id)) {
                return ErrorService.handleValidationError(h, 'ID invalide');
            }
            
            const [updated] = await this.matiereService.updateMatiere(id, request.payload as any);
            if (updated === 0) {
                return ErrorService.handleNotFoundError(h, 'Matière');
            }
            
            const matiere = await this.matiereService.getMatiereById(id);
            if (!matiere) {
                return ErrorService.handleNotFoundError(h, 'Matière');
            }
            return h.response(matiere).code(200);
        } catch (error) {
            ErrorService.logError('updateMatiere', error, { 
                id: request.params.id, 
                payload: request.payload 
            });
            return ErrorService.handleServerError(h, error);
        }
    }

    async deleteMatiere(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id);
            if (isNaN(id)) {
                return ErrorService.handleValidationError(h, 'ID invalide');
            }
            
            const deleted = await this.matiereService.deleteMatiere(id);
            if (deleted === 0) {
                return ErrorService.handleNotFoundError(h, 'Matière');
            }
            
            return h.response().code(204);
        } catch (error) {
            ErrorService.logError('deleteMatiere', error, { id: request.params.id });
            return ErrorService.handleServerError(h, error);
        }
    }
}