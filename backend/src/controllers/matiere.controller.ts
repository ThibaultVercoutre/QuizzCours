import { Request, ResponseToolkit } from '@hapi/hapi';
import { MatiereService } from '../services/matiere.service';
import { ErrorService } from '../services/error.service';
import { UserMatiere } from '../models/UserMatiere';

interface AuthCredentials {
    id: number;
    email: string;
    // autres propriétés si nécessaire
}

export class MatiereController {
    private matiereService: MatiereService;

    constructor() {
        this.matiereService = new MatiereService();
    }

    async getMatieres(request: Request, h: ResponseToolkit) {
        try {
            // Récupérer l'utilisateur à partir de la requête
            const userId = request.auth.credentials && (request.auth.credentials as any).id;
            
            // Si l'utilisateur est authentifié, récupérer ses matières
            if (userId) {
                const matieres = await this.matiereService.getMatieresByUserId(userId);
                return h.response(matieres).code(200);
            } else {
                // Si pas d'utilisateur authentifié, retourner une erreur ou une liste vide
                return h.response([]).code(200);
            }
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
            
            // Récupérer l'utilisateur à partir de la requête
            const userId = request.auth.credentials && (request.auth.credentials as any).id;
            
            let matiere;
            if (userId) {
                // Récupérer la matière seulement si elle appartient à l'utilisateur
                matiere = await this.matiereService.getMatiereByIdForUser(id, userId);
            } else {
                return h.response({ error: 'Non autorisé' }).code(401);
            }
            
            if (!matiere) {
                return ErrorService.handleNotFoundError(h, 'Matière');
            }
            
            return h.response(matiere).code(200);
        } catch (error) {
            console.log('getMatiereById', error);
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

            // Récupérer l'ID de l'utilisateur
            const userId = request.auth.credentials && (request.auth.credentials as any).id;
            
            if (!userId) {
                return h.response({ error: 'Non autorisé' }).code(401);
            }

            const newMatiere = await this.matiereService.createMatiere(matiere, userId);
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
            
            // Récupérer l'ID de l'utilisateur
            const userId = request.auth.credentials && (request.auth.credentials as any).id;
            
            if (!userId) {
                return h.response({ error: 'Non autorisé' }).code(401);
            }
            
            // Vérifier si la matière appartient à l'utilisateur
            const userMatiere = await UserMatiere.findOne({
                where: {
                    matiere_id: id,
                    user_id: userId
                }
            });
            
            if (!userMatiere) {
                return h.response({ error: 'Vous n\'avez pas accès à cette matière' }).code(403);
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
            
            // Récupérer l'ID de l'utilisateur
            const userId = request.auth.credentials && (request.auth.credentials as any).id;
            
            if (!userId) {
                return h.response({ error: 'Non autorisé' }).code(401);
            }
            
            // Vérifier si la matière appartient à l'utilisateur
            const userMatiere = await UserMatiere.findOne({
                where: {
                    matiere_id: id,
                    user_id: userId
                }
            });
            
            if (!userMatiere) {
                return h.response({ error: 'Vous n\'avez pas accès à cette matière' }).code(403);
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