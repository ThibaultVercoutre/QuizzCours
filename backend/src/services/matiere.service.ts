import { Matiere } from '../models/Matiere';
import { Chapitre } from '../models/Chapitre';
import { User } from '../models/User';
import { UserMatiere } from '../models/UserMatiere';

export class MatiereService {
    async getAllMatieres(): Promise<Matiere[]> {
        try {
            return await Matiere.findAll({
                include: [Chapitre],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });
        } catch (error) {
            throw new Error(`Error fetching matieres: ${error}`);
        }
    }

    async getMatieresByUserId(userId: number): Promise<Matiere[]> {
        try {
            const user = await User.findByPk(userId, {
                include: [{
                    model: Matiere,
                    include: [Chapitre]
                }]
            });
            
            if (!user) {
                throw new Error('User not found');
            }
            
            return user.matieres;
        } catch (error) {
            throw new Error(`Error fetching matieres for user: ${error}`);
        }
    }

    async getMatiereById(id: number): Promise<Matiere | null> {
        try {
            return await Matiere.findByPk(id, {
                include: [Chapitre],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });
        } catch (error) {
            throw new Error(`Error fetching matiere: ${error}`);
        }
    }

    async getMatiereByIdForUser(id: number, userId: number): Promise<Matiere | null> {
        try {
            // Vérifier si la matière existe et appartient à l'utilisateur
            const userMatiere = await UserMatiere.findOne({
                where: {
                    matiere_id: id,
                    user_id: userId
                }
            });

            if (!userMatiere) {
                return null; // La matière n'appartient pas à cet utilisateur
            }

            return await Matiere.findByPk(id, {
                include: [Chapitre],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });
        } catch (error) {
            throw new Error(`Error fetching matiere for user: ${error}`);
        }
    }

    async createMatiere(data: Pick<Matiere, 'nom' | 'description'>, userId: number): Promise<Matiere> {
        try {
            // Créer la matière
            const matiere = await Matiere.create(data);
            
            // Associer la matière à l'utilisateur
            await UserMatiere.create({
                user_id: userId,
                matiere_id: matiere.id
            });
            
            return matiere;
        } catch (error) {
            throw new Error(`Error creating matiere: ${error}`);
        }
    }

    async updateMatiere(id: number, data: Partial<Matiere>): Promise<[number, Matiere[]]> {
        try {
            return await Matiere.update(data, {
                where: { id },
                returning: true
            });
        } catch (error) {
            throw new Error(`Error updating matiere: ${error}`);
        }
    }

    async deleteMatiere(id: number): Promise<number> {
        try {
            return await Matiere.destroy({
                where: { id }
            });
        } catch (error) {
            throw new Error(`Error deleting matiere: ${error}`);
        }
    }
}