import { Request, ResponseToolkit } from '@hapi/hapi';
import { AuthService, LoginDto, RegisterDto } from '../services/auth.service';
import { ErrorService } from '../services/error.service';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async register(request: Request, h: ResponseToolkit) {
        try {
            const payload = request.payload as RegisterDto;
            
            // Validation des données
            if (!payload.name) {
                return ErrorService.handleValidationError(h, 'Le nom est requis');
            }
            if (!payload.email) {
                return ErrorService.handleValidationError(h, 'L\'email est requis');
            }
            if (!payload.password) {
                return ErrorService.handleValidationError(h, 'Le mot de passe est requis');
            }
            if (payload.password.length < 6) {
                return ErrorService.handleValidationError(h, 'Le mot de passe doit contenir au moins 6 caractères');
            }

            const result = await this.authService.register(payload);
            
            if (!result.success) {
                return h.response({ success: false, error: result.error }).code(400);
            }
            
            return h.response(result).code(201);
        } catch (error) {
            ErrorService.logError('register', error, { payload: request.payload });
            return ErrorService.handleServerError(h, error);
        }
    }

    async login(request: Request, h: ResponseToolkit) {
        try {
            const payload = request.payload as LoginDto;
            
            // Validation des données
            if (!payload.email) {
                return ErrorService.handleValidationError(h, 'L\'email est requis');
            }
            if (!payload.password) {
                return ErrorService.handleValidationError(h, 'Le mot de passe est requis');
            }

            const result = await this.authService.login(payload);
            
            if (!result.success) {
                return h.response({ success: false, error: result.error }).code(401);
            }
            
            return h.response(result).code(200);
        } catch (error) {
            ErrorService.logError('login', error, { email: (request.payload as any)?.email });
            return ErrorService.handleServerError(h, error);
        }
    }

    async validateToken(request: Request, h: ResponseToolkit) {
        try {
            const token = request.headers.authorization?.replace('Bearer ', '');
            
            if (!token) {
                return h.response({ valid: false }).code(401);
            }

            const result = await this.authService.validateToken(token);
            
            if (!result.valid) {
                return h.response({ valid: false }).code(401);
            }
            
            return h.response(result).code(200);
        } catch (error) {
            ErrorService.logError('validateToken', error);
            return ErrorService.handleServerError(h, error);
        }
    }

    async getCurrentUser(request: Request, h: ResponseToolkit) {
        try {
            const token = request.headers.authorization?.replace('Bearer ', '');
            
            if (!token) {
                return h.response({ success: false, error: 'Non autorisé' }).code(401);
            }

            const result = await this.authService.validateToken(token);
            
            if (!result.valid) {
                return h.response({ success: false, error: 'Token invalide' }).code(401);
            }
            
            return h.response({ 
                success: true, 
                user: result.user 
            }).code(200);
        } catch (error) {
            ErrorService.logError('getCurrentUser', error);
            return ErrorService.handleServerError(h, error);
        }
    }
} 