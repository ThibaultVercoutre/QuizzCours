"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatiereController = void 0;
const matiere_service_1 = require("../services/matiere.service");
class MatiereController {
    constructor() {
        this.matiereService = new matiere_service_1.MatiereService();
    }
    async getMatieres(request, h) {
        try {
            const matieres = await this.matiereService.getAllMatieres();
            return h.response(matieres).code(200);
        }
        catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
    async getMatiereById(request, h) {
        try {
            const id = parseInt(request.params.id);
            const matiere = await this.matiereService.getMatiereById(id);
            if (!matiere) {
                return h.response({ error: 'Matiere not found' }).code(404);
            }
            return h.response(matiere).code(200);
        }
        catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
    async createMatiere(request, h) {
        try {
            const matiere = request.payload;
            console.log(matiere);
            const newMatiere = await this.matiereService.createMatiere(matiere);
            return h.response(newMatiere).code(201);
        }
        catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
    async updateMatiere(request, h) {
        try {
            const id = parseInt(request.params.id);
            const [updated] = await this.matiereService.updateMatiere(id, request.payload);
            if (updated === 0) {
                return h.response({ error: 'Matiere not found' }).code(404);
            }
            const matiere = await this.matiereService.getMatiereById(id);
            if (!matiere) {
                return h.response({ error: 'Matiere not found' }).code(404);
            }
            return h.response(matiere).code(200);
        }
        catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
    async deleteMatiere(request, h) {
        try {
            const id = parseInt(request.params.id);
            const deleted = await this.matiereService.deleteMatiere(id);
            if (deleted === 0) {
                return h.response({ error: 'Matiere not found' }).code(404);
            }
            return h.response().code(204);
        }
        catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
}
exports.MatiereController = MatiereController;
