import { Matiere } from '../models/Matiere';

export class MatiereService {
    async getAllMatieres(): Promise<Matiere[]> {
        try {
            return await Matiere.findAll();
        } catch (error) {
            throw new Error(`Error fetching matieres: ${error}`);
        }
    }

    async getMatiereById(id: number): Promise<Matiere | null> {
        try {
            return await Matiere.findByPk(id);
        } catch (error) {
            throw new Error(`Error fetching matiere: ${error}`);
        }
    }

    async createMatiere(data: Pick<Matiere, 'nom' | 'description'>): Promise<Matiere> {
        try {
            return await Matiere.create(data);
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