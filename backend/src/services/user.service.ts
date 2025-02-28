import { User } from '../models/User';
import { Matiere } from '../models/Matiere';
import { Score } from '../models/Score';
import * as bcrypt from 'bcrypt';
import { Question } from '../models/Question';
import { Chapitre } from '../models/Chapitre';

export interface UpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
}

export class UserService {
    async getAll(): Promise<User[]> {
        return await User.findAll({
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        });
    }

    async findOne(id: number): Promise<User | null> {
        return await User.findOne({
            where: { id },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            include: [
                {
                    model: Matiere,
                    through: { attributes: [] }, // Exclure les attributs de la table de jonction
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                },
                {
                    model: Score,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ]
        });
    }

    async update(id: number, userData: UpdateUserDto): Promise<User | null> {
        try {
            const user = await User.findByPk(id);
            
            if (!user) {
                return null;
            }

            // Si le mot de passe est fourni, le hasher
            if (userData.password) {
                userData.password = await bcrypt.hash(userData.password, 10);
            }

            await User.update(userData, {
                where: { id }
            });

            return await this.findOne(id);
        } catch (error) {
            throw new Error('Erreur lors de la mise à jour de l\'utilisateur');
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const deleted = await User.destroy({
                where: { id }
            });
            return deleted > 0;
        } catch (error) {
            throw new Error('Erreur lors de la suppression de l\'utilisateur');
        }
    }

    async addMatiere(userId: number, matiereId: number): Promise<boolean> {
        try {
            const user = await User.findByPk(userId);
            const matiere = await Matiere.findByPk(matiereId);
            
            if (!user || !matiere) {
                return false;
            }

            await (user as any).addMatiere(matiere);
            return true;
        } catch (error) {
            throw new Error('Erreur lors de l\'ajout de la matière à l\'utilisateur');
        }
    }

    async removeMatiere(userId: number, matiereId: number): Promise<boolean> {
        try {
            const user = await User.findByPk(userId);
            const matiere = await Matiere.findByPk(matiereId);
            
            if (!user || !matiere) {
                return false;
            }

            await (user as any).removeMatiere(matiere);
            return true;
        } catch (error) {
            throw new Error('Erreur lors de la suppression de la matière de l\'utilisateur');
        }
    }

    async getUserMatieres(userId: number): Promise<Matiere[]> {
        try {
            const user = await User.findByPk(userId, {
                include: [{
                    model: Matiere,
                    through: { attributes: [] }, // Exclure les attributs de la table de jonction
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }]
            });
            
            if (!user) {
                return [];
            }

            return (user as any).matieres || [];
        } catch (error) {
            throw new Error('Erreur lors de la récupération des matières de l\'utilisateur');
        }
    }

    async getUserScores(userId: number): Promise<Score[]> {
        try {
            return await Score.findAll({
                where: { user_id: userId },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                    {
                        model: Chapitre,
                        attributes: ['id', 'titre'],
                        include: [
                            {
                                model: Matiere,
                                attributes: ['id', 'nom']
                            }
                        ]
                    }
                ],
                order: [['created_at', 'DESC']]
            });
        } catch (error) {
            throw new Error('Erreur lors de la récupération des scores de l\'utilisateur');
        }
    }

    async getUserQuestions(userId: number): Promise<Question[]> {
        try {
            // Récupérer d'abord les matières de l'utilisateur
            const userMatieres = await this.getUserMatieres(userId);
            const matiereIds = userMatieres.map(m => m.id);

            // Si l'utilisateur n'a pas de matières, retourner un tableau vide
            if (matiereIds.length === 0) {
                return [];
            }

            // Récupérer les questions des chapitres des matières de l'utilisateur
            return await Question.findAll({
                include: [{
                    model: Chapitre,
                    required: true,
                    include: [{
                        model: Matiere,
                        required: true,
                        where: {
                            id: matiereIds
                        }
                    }]
                }],
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });
        } catch (error) {
            throw new Error('Erreur lors de la récupération des questions de l\'utilisateur');
        }
    }

    async getUserChapitres(userId: number): Promise<Chapitre[]> {
        try {
            // Récupérer d'abord les matières de l'utilisateur
            const userMatieres = await this.getUserMatieres(userId);
            const matiereIds = userMatieres.map(m => m.id); 

            if (matiereIds.length === 0) {  
                return [];
            }

            return await Chapitre.findAll({
                where: { matiere_id: matiereIds }
            });
        } catch (error) {
            throw new Error('Erreur lors de la récupération des chapitres de l\'utilisateur');
        }
    }
}