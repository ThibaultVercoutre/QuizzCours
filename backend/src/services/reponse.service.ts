import { Reponse } from '../models/Reponse';
import { Question } from '../models/Question';

export interface CreateReponseDto {
    texte: string;
    est_correcte: boolean;
    question_id: number;
}

export interface UpdateReponseDto {
    texte?: string;
    est_correcte?: boolean;
}

export class ReponseService {
    async findAll(questionId: number): Promise<Reponse[]> {
        return await Reponse.findAll({
            where: { question_id: questionId },
            include: [{
                model: Question,
                attributes: ['enonce']
            }]
        });
    }

    async findOne(id: number): Promise<Reponse | null> {
        return await Reponse.findOne({
            where: { id },
            include: [{
                model: Question,
                attributes: ['enonce']
            }]
        });
    }

    async create(reponseData: CreateReponseDto): Promise<Reponse> {
        try {
            // Vérifier s'il y a déjà une réponse correcte si celle-ci est correcte
            if (reponseData.est_correcte) {
                await this.resetCorrectAnswers(reponseData.question_id);
            }
            
            const reponse = await Reponse.create(reponseData as any);
            const createdReponse = await this.findOne(reponse.id);
            if (!createdReponse) {
                throw new Error('Reponse not found after creation');
            }
            return createdReponse;
        } catch (error) {
            throw new Error('Erreur lors de la création de la réponse');
        }
    }

    async update(id: number, reponseData: UpdateReponseDto): Promise<Reponse | null> {
        try {
            const reponse = await this.findOne(id);
            if (!reponse) {
                throw new Error('Réponse non trouvée');
            }

            // Si on met à jour est_correcte à true, réinitialiser les autres
            if (reponseData.est_correcte) {
                await this.resetCorrectAnswers(reponse.question_id);
            }

            await Reponse.update(reponseData, {
                where: { id }
            });
            return await this.findOne(id);
        } catch (error) {
            throw new Error('Erreur lors de la mise à jour de la réponse');
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const deleted = await Reponse.destroy({
                where: { id }
            });
            return deleted > 0;
        } catch (error) {
            throw new Error('Erreur lors de la suppression de la réponse');
        }
    }

    private async resetCorrectAnswers(questionId: number): Promise<void> {
        await Reponse.update(
            { est_correcte: false },
            { where: { question_id: questionId } }
        );
    }
}