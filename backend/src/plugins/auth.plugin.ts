import { Server } from '@hapi/hapi';
import * as jwt from 'jsonwebtoken';

export const authPlugin = {
    name: 'auth',
    register: async (server: Server) => {
        // Définir la stratégie d'authentification JWT
        server.auth.scheme('jwt-scheme', (server, options) => {
            return {
                authenticate: async (request, h) => {
                    const token = request.headers.authorization?.replace('Bearer ', '');
                    
                    if (!token) {
                        return h.unauthenticated(new Error('Token manquant'));
                    }
                    
                    try {
                        // Vérifier et décoder le token
                        const JWT_SECRET = process.env.JWT_SECRET || 'votre_clé_secrète';
                        const decoded = jwt.verify(token, JWT_SECRET) as any;
                        
                        // Vérifier si le token est expiré
                        const now = Math.floor(Date.now() / 1000);
                        if (decoded.exp && decoded.exp < now) {
                            return h.unauthenticated(new Error('Token expiré'));
                        }
                        
                        // Authentification réussie
                        return h.authenticated({ credentials: decoded });
                    } catch (error) {
                        return h.unauthenticated(new Error('Token invalide'));
                    }
                }
            };
        });
        
        // Enregistrer la stratégie JWT
        server.auth.strategy('jwt', 'jwt-scheme', {});
        
        // Définir la stratégie par défaut (optionnel)
        // server.auth.default('jwt');
    }
}; 