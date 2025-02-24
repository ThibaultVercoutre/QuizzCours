"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReponseService = void 0;
const Reponse_1 = require("../models/Reponse");
const Question_1 = require("../models/Question");
class ReponseService {
    async findAll(questionId) {
        return await Reponse_1.Reponse.findAll({
            where: { question_id: questionId },
            include: [{
                    model: Question_1.Question,
                    attributes: ['enonce']
                }]
        });
    }
    async findOne(id) {
        return await Reponse_1.Reponse.findOne({
            where: { id },
            include: [{
                    model: Question_1.Question,
                    attributes: ['enonce']
                }]
        });
    }
    async create(reponseData) {
        try {
            // Vérifier s'il y a déjà une réponse correcte si celle-ci est correcte
            if (reponseData.est_correcte) {
                await this.resetCorrectAnswers(reponseData.question_id);
            }
            const reponse = await Reponse_1.Reponse.create(reponseData);
            const createdReponse = await this.findOne(reponse.id);
            if (!createdReponse) {
                throw new Error('Reponse not found after creation');
            }
            return createdReponse;
        }
        catch (error) {
            throw new Error('Erreur lors de la création de la réponse');
        }
    }
    async update(id, reponseData) {
        try {
            const reponse = await this.findOne(id);
            if (!reponse) {
                throw new Error('Réponse non trouvée');
            }
            // Si on met à jour est_correcte à true, réinitialiser les autres
            if (reponseData.est_correcte) {
                await this.resetCorrectAnswers(reponse.question_id);
            }
            await Reponse_1.Reponse.update(reponseData, {
                where: { id }
            });
            return await this.findOne(id);
        }
        catch (error) {
            throw new Error('Erreur lors de la mise à jour de la réponse');
        }
    }
    async delete(id) {
        try {
            const deleted = await Reponse_1.Reponse.destroy({
                where: { id }
            });
            return deleted > 0;
        }
        catch (error) {
            throw new Error('Erreur lors de la suppression de la réponse');
        }
    }
    async resetCorrectAnswers(questionId) {
        await Reponse_1.Reponse.update({ est_correcte: false }, { where: { question_id: questionId } });
    }
}
exports.ReponseService = ReponseService;
