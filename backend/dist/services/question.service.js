"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionService = void 0;
const Question_1 = require("../models/Question");
const Chapitre_1 = require("../models/Chapitre");
const Reponse_1 = require("../models/Reponse");
class QuestionService {
    async findAll(chapitreId) {
        return await Question_1.Question.findAll({
            where: { chapitre_id: chapitreId },
            include: [
                {
                    model: Chapitre_1.Chapitre,
                    attributes: ['titre']
                },
                {
                    model: Reponse_1.Reponse,
                    attributes: ['id', 'texte', 'est_correcte']
                }
            ]
        });
    }
    async findOne(id) {
        return await Question_1.Question.findOne({
            where: { id },
            include: [
                {
                    model: Chapitre_1.Chapitre,
                    attributes: ['titre']
                },
                {
                    model: Reponse_1.Reponse,
                    attributes: ['id', 'texte', 'est_correcte']
                }
            ]
        });
    }
    async create(questionData) {
        try {
            const question = await Question_1.Question.create(questionData);
            const createdQuestion = await this.findOne(question.id);
            if (!createdQuestion) {
                throw new Error('Question not found after creation');
            }
            return createdQuestion;
        }
        catch (error) {
            throw new Error('Erreur lors de la création de la question');
        }
    }
    async update(id, questionData) {
        try {
            await Question_1.Question.update(questionData, {
                where: { id }
            });
            return await this.findOne(id);
        }
        catch (error) {
            throw new Error('Erreur lors de la mise à jour de la question');
        }
    }
    async delete(id) {
        try {
            const deleted = await Question_1.Question.destroy({
                where: { id }
            });
            return deleted > 0;
        }
        catch (error) {
            throw new Error('Erreur lors de la suppression de la question');
        }
    }
}
exports.QuestionService = QuestionService;
