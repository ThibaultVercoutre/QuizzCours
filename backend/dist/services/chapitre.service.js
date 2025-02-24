"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapitreService = void 0;
const Chapitre_1 = require("../models/Chapitre");
const Matiere_1 = require("../models/Matiere");
class ChapitreService {
    async findAll(matiereId) {
        return await Chapitre_1.Chapitre.findAll({
            where: { matiere_id: matiereId },
            include: [{
                    model: Matiere_1.Matiere,
                    attributes: ['nom']
                }]
        });
    }
    async findOne(id) {
        return await Chapitre_1.Chapitre.findOne({
            where: { id },
            include: [{
                    model: Matiere_1.Matiere,
                    attributes: ['nom']
                }]
        });
    }
    async create(chapitreData) {
        try {
            const chapitre = await Chapitre_1.Chapitre.create(chapitreData);
            const createdChapitre = await this.findOne(chapitre.id);
            if (!createdChapitre) {
                throw new Error('Chapitre not found after creation');
            }
            return createdChapitre;
        }
        catch (error) {
            throw new Error('Erreur lors de la création du chapitre');
        }
    }
    async update(id, chapitreData) {
        try {
            await Chapitre_1.Chapitre.update(chapitreData, {
                where: { id }
            });
            return await this.findOne(id);
        }
        catch (error) {
            throw new Error('Erreur lors de la mise à jour du chapitre');
        }
    }
    async delete(id) {
        try {
            const deleted = await Chapitre_1.Chapitre.destroy({
                where: { id }
            });
            return deleted > 0;
        }
        catch (error) {
            throw new Error('Erreur lors de la suppression du chapitre');
        }
    }
    async getByMatiere(matiereId) {
        return await Chapitre_1.Chapitre.findAll({
            where: { matiere_id: matiereId },
            include: [{
                    model: Matiere_1.Matiere,
                    attributes: ['nom']
                }],
            order: [['created_at', 'ASC']]
        });
    }
}
exports.ChapitreService = ChapitreService;
