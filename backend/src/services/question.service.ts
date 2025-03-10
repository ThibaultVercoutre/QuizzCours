import { Question } from '../models/Question';
import { Chapitre } from '../models/Chapitre';
import { Reponse } from '../models/Reponse';
import { Matiere } from '../models/Matiere';

export interface CreateQuestionDto {
    enonce: string;
    chapitre_id: number;
}

export interface UpdateQuestionDto {
    enonce?: string;
}

export class QuestionService {

    async getAllQuestions(): Promise<Question[]> {
        return await Question.findAll({
            include: [
                {
                    model: Chapitre,
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include: [{
                        model: Matiere,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    }]
                },
                {
                    model: Reponse,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
    }

    async findAll(chapitreId: number): Promise<Question[]> {
        return await Question.findAll({
            where: { chapitre_id: chapitreId },
            include: [
                {
                    model: Chapitre,
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include: [{
                        model: Matiere,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    }]
                },
                {
                    model: Reponse,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
    }

    async findOne(id: number): Promise<Question | null> {
        return await Question.findOne({
            where: { id },
            include: [
                {
                    model: Chapitre,
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include: [{
                        model: Matiere,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    }]
                },
                {
                    model: Reponse,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
    }

    async create(questionData: CreateQuestionDto): Promise<Question> {
        try {
            const question = await Question.create(questionData as any);
            const createdQuestion = await this.findOne(question.id);
            if (!createdQuestion) {
                throw new Error('Question not found after creation');
            }
            return createdQuestion;
        } catch (error) {
            throw new Error('Erreur lors de la création de la question');
        }
    }

    async update(id: number, questionData: UpdateQuestionDto): Promise<Question | null> {
        try {
            await Question.update(questionData, {
                where: { id }
            });
            return await this.findOne(id);
        } catch (error) {
            throw new Error('Erreur lors de la mise à jour de la question');
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const deleted = await Question.destroy({
                where: { id }
            });
            return deleted > 0;
        } catch (error) {
            throw new Error('Erreur lors de la suppression de la question');
        }
    }
}