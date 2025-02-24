"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatiereService = void 0;
const Matiere_1 = require("../models/Matiere");
class MatiereService {
    async getAllMatieres() {
        try {
            return await Matiere_1.Matiere.findAll();
        }
        catch (error) {
            throw new Error(`Error fetching matieres: ${error}`);
        }
    }
    async getMatiereById(id) {
        try {
            return await Matiere_1.Matiere.findByPk(id);
        }
        catch (error) {
            throw new Error(`Error fetching matiere: ${error}`);
        }
    }
    async createMatiere(data) {
        try {
            return await Matiere_1.Matiere.create(data);
        }
        catch (error) {
            throw new Error(`Error creating matiere: ${error}`);
        }
    }
    async updateMatiere(id, data) {
        try {
            return await Matiere_1.Matiere.update(data, {
                where: { id },
                returning: true
            });
        }
        catch (error) {
            throw new Error(`Error updating matiere: ${error}`);
        }
    }
    async deleteMatiere(id) {
        try {
            return await Matiere_1.Matiere.destroy({
                where: { id }
            });
        }
        catch (error) {
            throw new Error(`Error deleting matiere: ${error}`);
        }
    }
}
exports.MatiereService = MatiereService;
