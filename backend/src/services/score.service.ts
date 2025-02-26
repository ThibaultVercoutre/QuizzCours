import { Score } from '../models/Score';
import { Chapitre } from '../models/Chapitre';
import { Matiere } from '../models/Matiere';
import sequelize from '../config/database';

export interface CreateScoreDto {
    pourcentage: number;
    chapitre_id: number;
}

export class ScoreService {

    async getAllScores(): Promise<Score[]> {
        return await Score.findAll({
            include: [{
                model: Chapitre,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [{
                    model: Matiere,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }]
            }],
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            order: [['created_at', 'DESC']]
        });
    }

    async create(scoreData: CreateScoreDto): Promise<Score> {
        try {
            // Vérifier que le pourcentage est valide
            if (scoreData.pourcentage < 0 || scoreData.pourcentage > 100) {
                throw new Error('Le pourcentage doit être entre 0 et 100');
            }

            const score = await Score.create(scoreData as any);
            const createdScore = await this.findOne(score.id);
            if (!createdScore) {
                throw new Error('Score not found after creation');
            }
            return createdScore;
        } catch (error) {
            throw new Error('Erreur lors de la création du score');
        }
    }

    async findOne(id: number): Promise<Score | null> {
        return await Score.findOne({
            where: { id },
            include: [{
                model: Chapitre,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [{
                    model: Matiere,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }]
            }],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
    }

    async findByChapitreId(chapitreId: number, page = 1, limit = 20): Promise<{ scores: Score[]; total: number }> {
        const offset = (page - 1) * limit
        
        const { rows: scores, count: total } = await Score.findAndCountAll({
            where: { chapitre_id: chapitreId },
            include: [{
                model: Chapitre,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [{
                    model: Matiere,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }]
            }],
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            order: [['created_at', 'DESC']],
            limit,
            offset
        });

        return { scores, total };
    }

    async getLatestScore(chapitreId: number): Promise<Score | null> {
        return await Score.findOne({
            where: { chapitre_id: chapitreId },
            include: [{
                model: Chapitre,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [{
                    model: Matiere,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }]
            }],
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            order: [['created_at', 'DESC']]
        });
    }

    async getAverageScore(chapitreId: number): Promise<number> {
        const result = await Score.findOne({
            where: { chapitre_id: chapitreId },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('pourcentage')), 'average']
            ]
        });

        return Math.round(result?.getDataValue('average') || 0);
    }
} 