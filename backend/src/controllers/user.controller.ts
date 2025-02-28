import { Request, ResponseToolkit } from '@hapi/hapi';
import { UserService, UpdateUserDto } from '../services/user.service';
import { ErrorService } from '../services/error.service';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async getAllUsers(request: Request, h: ResponseToolkit) {
        try {
            const users = await this.userService.getAll();
            return h.response(users).code(200);
        } catch (error) {
            ErrorService.logError('getAllUsers', error);
            return ErrorService.handleServerError(h, error);
        }
    }

    async getUserById(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id);
            if (isNaN(id)) {
                return ErrorService.handleValidationError(h, 'ID invalide');
            }
            
            const user = await this.userService.findOne(id);
            if (!user) {
                return ErrorService.handleNotFoundError(h, 'Utilisateur');
            }
            
            return h.response(user).code(200);
        } catch (error) {
            ErrorService.logError('getUserById', error, { id: request.params.id });
            return ErrorService.handleServerError(h, error);
        }
    }

    async updateUser(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id);
            if (isNaN(id)) {
                return ErrorService.handleValidationError(h, 'ID invalide');
            }
            
            const userData = request.payload as UpdateUserDto;
            const user = await this.userService.update(id, userData);
            
            if (!user) {
                return ErrorService.handleNotFoundError(h, 'Utilisateur');
            }
            
            return h.response(user).code(200);
        } catch (error) {
            ErrorService.logError('updateUser', error, { 
                id: request.params.id, 
                payload: request.payload 
            });
            return ErrorService.handleServerError(h, error);
        }
    }

    async deleteUser(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id);
            if (isNaN(id)) {
                return ErrorService.handleValidationError(h, 'ID invalide');
            }
            
            const deleted = await this.userService.delete(id);
            if (!deleted) {
                return ErrorService.handleNotFoundError(h, 'Utilisateur');
            }
            
            return h.response().code(204);
        } catch (error) {
            ErrorService.logError('deleteUser', error, { id: request.params.id });
            return ErrorService.handleServerError(h, error);
        }
    }

    async addMatiereToUser(request: Request, h: ResponseToolkit) {
        try {
            const userId = parseInt(request.params.id);
            const matiereId = parseInt((request.payload as any).matiereId);
            
            if (isNaN(userId) || isNaN(matiereId)) {
                return ErrorService.handleValidationError(h, 'ID invalide');
            }
            
            const success = await this.userService.addMatiere(userId, matiereId);
            if (!success) {
                return ErrorService.handleNotFoundError(h, 'Utilisateur ou matière');
            }
            
            return h.response({ success: true }).code(200);
        } catch (error) {
            ErrorService.logError('addMatiereToUser', error, { 
                userId: request.params.id, 
                matiereId: (request.payload as any).matiereId 
            });
            return ErrorService.handleServerError(h, error);
        }
    }

    async removeMatiereFromUser(request: Request, h: ResponseToolkit) {
        try {
            const userId = parseInt(request.params.id);
            const matiereId = parseInt(request.params.matiereId);
            
            if (isNaN(userId) || isNaN(matiereId)) {
                return ErrorService.handleValidationError(h, 'ID invalide');
            }
            
            const success = await this.userService.removeMatiere(userId, matiereId);
            if (!success) {
                return ErrorService.handleNotFoundError(h, 'Utilisateur ou matière');
            }
            
            return h.response({ success: true }).code(200);
        } catch (error) {
            ErrorService.logError('removeMatiereFromUser', error, { 
                userId: request.params.id, 
                matiereId: request.params.matiereId 
            });
            return ErrorService.handleServerError(h, error);
        }
    }

    async getUserMatieres(request: Request, h: ResponseToolkit) {
        try {
            const userId = parseInt(request.params.id);
            
            if (isNaN(userId)) {
                return ErrorService.handleValidationError(h, 'ID invalide');
            }
            
            const matieres = await this.userService.getUserMatieres(userId);
            return h.response(matieres).code(200);
        } catch (error) {
            ErrorService.logError('getUserMatieres', error, { userId: request.params.id });
            return ErrorService.handleServerError(h, error);
        }
    }

    async getUserScores(request: Request, h: ResponseToolkit) {
        try {
            const userId = parseInt(request.params.id);
            
            if (isNaN(userId)) {
                return ErrorService.handleValidationError(h, 'ID invalide');
            }
            
            const scores = await this.userService.getUserScores(userId);
            return h.response(scores).code(200);
        } catch (error) {
            ErrorService.logError('getUserScores', error, { userId: request.params.id });
            return ErrorService.handleServerError(h, error);
        }
    }

    async getUserQuestions(request: Request, h: ResponseToolkit) {
        try {
            const userId = parseInt(request.params.id);
            
            if (isNaN(userId)) {
                return ErrorService.handleValidationError(h, 'ID invalide');
            }
            
            const questions = await this.userService.getUserQuestions(userId);
            return h.response(questions).code(200);
        } catch (error) {
            ErrorService.logError('getUserQuestions', error, { userId: request.params.id });
            return ErrorService.handleServerError(h, error);
        }
    } 

    async getUserChapitres(request: Request, h: ResponseToolkit) {
        try {
            const userId = parseInt(request.params.id);

            if (isNaN(userId)) {
                return ErrorService.handleValidationError(h, 'ID invalide');
            }

            const chapitres = await this.userService.getUserChapitres(userId);
            return h.response(chapitres).code(200);
        } catch (error) {
            ErrorService.logError('getUserChapitres', error, { userId: request.params.id });    
            return ErrorService.handleServerError(h, error);
        }
    }
}  