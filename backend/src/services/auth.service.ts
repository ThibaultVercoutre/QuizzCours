import { User } from '../models/User';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    token?: string;
    user?: {
        id: number;
        name: string;
        email: string;
    };
    error?: string;
}

export class AuthService {
    private readonly JWT_SECRET = process.env.JWT_SECRET || 'votre_clé_secrète';
    private readonly TOKEN_EXPIRATION = '24h';

    async register(userData: RegisterDto): Promise<AuthResponse> {
        try {
            // Vérifier si l'utilisateur existe déjà
            const existingUser = await User.findOne({
                where: { email: userData.email }
            });

            if (existingUser) {
                return {
                    success: false,
                    error: 'Un utilisateur avec cet email existe déjà'
                };
            }

            // Créer l'utilisateur - le hachage du mot de passe sera géré par le hook BeforeCreate du modèle
            const user = await User.create({
                name: userData.name,
                email: userData.email,
                password: userData.password
            } as any);

            // Générer le token
            const token = this.generateToken(user);

            return {
                success: true,
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            };
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
            return {
                success: false,
                error: 'Une erreur est survenue lors de l\'inscription'
            };
        }
    }

    async login(credentials: LoginDto): Promise<AuthResponse> {
        try {
            // Trouver l'utilisateur par email
            const user = await User.findOne({
                where: { email: credentials.email }
            });

            if (!user) {
                return {
                    success: false,
                    error: 'Identifiants invalides'
                };
            }

            // Vérifier le mot de passe en utilisant la méthode comparePassword du modèle User
            const isPasswordValid = await user.comparePassword(credentials.password);

            if (!isPasswordValid) {
                console.log(user.password, credentials.password);
                return {
                    success: false,
                    error: 'Identifiants invalides'
                };
            }

            // Générer le token
            const token = this.generateToken(user);

            return {
                success: true,
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            };
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            return {
                success: false,
                error: 'Une erreur est survenue lors de la connexion'
            };
        }
    }

    async validateToken(token: string): Promise<{ valid: boolean; user?: any }> {
        try {
            const decoded = jwt.verify(token, this.JWT_SECRET) as any;
            const user = await User.findByPk(decoded.id);

            if (!user) {
                return { valid: false };
            }

            return {
                valid: true,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            };
        } catch (error) {
            return { valid: false };
        }
    }

    private generateToken(user: User): string {
        return jwt.sign(
            { id: user.id, email: user.email },
            this.JWT_SECRET,
            { expiresIn: this.TOKEN_EXPIRATION }
        );
    }
} 