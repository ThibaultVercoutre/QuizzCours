import { Score } from '../models/Score';
import { Chapitre } from '../models/Chapitre';

export interface CreateScoreDto {
    pourcentage: number;
    chapitre_id: number;
}

export class ScoreService {
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
                attributes: ['titre']
            }]
        });
    }

    async findByChapitreId(chapitreId: number): Promise<Score[]> {
        return await Score.findAll({
            where: { chapitre_id: chapitreId },
            order: [['created_at', 'DESC']]
        });
    }

    async getLatestScore(chapitreId: number): Promise<Score | null> {
        return await Score.findOne({
            where: { chapitre_id: chapitreId },
            order: [['created_at', 'DESC']]
        });
    }

    async getAverageScore(chapitreId: number): Promise<number> {
        const scores = await Score.findAll({
            where: { chapitre_id: chapitreId },
            attributes: ['pourcentage']
        });

        if (scores.length === 0) return 0;

        const sum = scores.reduce((acc, score) => acc + score.pourcentage, 0);
        return Math.round(sum / scores.length);
    }
} 