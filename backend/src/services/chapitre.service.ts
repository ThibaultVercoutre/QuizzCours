import { Chapitre } from '../models/Chapitre';
import { Matiere } from '../models/Matiere';

export interface CreateChapitreDto {
    titre: string;
    description?: string;
    matiere_id: number;
}

export interface UpdateChapitreDto {
    titre?: string;
    description?: string;
}

export class ChapitreService {

    async getAll(): Promise<Chapitre[]> {
        return await Chapitre.findAll({
            include: [{
                model: Matiere,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
    }

    async findAll(matiereId: number): Promise<Chapitre[]> {
        return await Chapitre.findAll({
            where: { matiere_id: matiereId },
            include: [{
                model: Matiere,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
    }

    async findOne(id: number): Promise<Chapitre | null> {
        return await Chapitre.findOne({
            where: { id },
            include: [{
                model: Matiere,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
    }

    async create(chapitreData: CreateChapitreDto): Promise<Chapitre> {
        try {
            const chapitre = await Chapitre.create(chapitreData as any);
            const createdChapitre = await this.findOne(chapitre.id);
            if (!createdChapitre) {
                throw new Error('Chapitre not found after creation');
            }
            return createdChapitre;
        } catch (error) {
            throw new Error('Erreur lors de la création du chapitre');
        }
    }

    async update(id: number, chapitreData: UpdateChapitreDto): Promise<Chapitre | null> {
        try {
            await Chapitre.update(chapitreData, {
                where: { id }
            });
            return await this.findOne(id);
        } catch (error) {
            throw new Error('Erreur lors de la mise à jour du chapitre');
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const deleted = await Chapitre.destroy({
                where: { id }
            });
            return deleted > 0;
        } catch (error) {
            throw new Error('Erreur lors de la suppression du chapitre');
        }
    }

    async getByMatiere(matiereId: number): Promise<Chapitre[]> {
        return await Chapitre.findAll({
            where: { matiere_id: matiereId },
            include: [{
                model: Matiere,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            order: [['created_at', 'ASC']]
        });
    }
}