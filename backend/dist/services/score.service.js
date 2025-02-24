"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreService = void 0;
const Score_1 = require("../models/Score");
const Chapitre_1 = require("../models/Chapitre");
const database_1 = __importDefault(require("../config/database"));
class ScoreService {
    async create(scoreData) {
        try {
            // Vérifier que le pourcentage est valide
            if (scoreData.pourcentage < 0 || scoreData.pourcentage > 100) {
                throw new Error('Le pourcentage doit être entre 0 et 100');
            }
            const score = await Score_1.Score.create(scoreData);
            const createdScore = await this.findOne(score.id);
            if (!createdScore) {
                throw new Error('Score not found after creation');
            }
            return createdScore;
        }
        catch (error) {
            throw new Error('Erreur lors de la création du score');
        }
    }
    async findOne(id) {
        return await Score_1.Score.findOne({
            where: { id },
            include: [{
                    model: Chapitre_1.Chapitre,
                    attributes: ['titre']
                }]
        });
    }
    async findByChapitreId(chapitreId, page = 1, limit = 20) {
        const offset = (page - 1) * limit;
        const { rows: scores, count: total } = await Score_1.Score.findAndCountAll({
            where: { chapitre_id: chapitreId },
            order: [['created_at', 'DESC']],
            limit,
            offset
        });
        return { scores, total };
    }
    async getLatestScore(chapitreId) {
        return await Score_1.Score.findOne({
            where: { chapitre_id: chapitreId },
            order: [['created_at', 'DESC']]
        });
    }
    async getAverageScore(chapitreId) {
        const result = await Score_1.Score.findOne({
            where: { chapitre_id: chapitreId },
            attributes: [
                [database_1.default.fn('AVG', database_1.default.col('pourcentage')), 'average']
            ]
        });
        return Math.round(result?.getDataValue('average') || 0);
    }
}
exports.ScoreService = ScoreService;
