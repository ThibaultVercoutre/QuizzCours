import { Request, ResponseToolkit } from '@hapi/hapi';
import { MatiereService } from '../services/matiere.service';

export class MatiereController {
    private matiereService: MatiereService;

    constructor() {
        this.matiereService = new MatiereService();
    }

    async getMatieres(request: Request, h: ResponseToolkit) {
        try {
            const matieres = await this.matiereService.getAllMatieres();
            return h.response(matieres).code(200);
        } catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }

    async getMatiereById(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id);
            const matiere = await this.matiereService.getMatiereById(id);
            if (!matiere) {
                return h.response({ error: 'Matiere not found' }).code(404);
            }
            return h.response(matiere).code(200);
        } catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }

    async createMatiere(request: Request, h: ResponseToolkit) {
        try {
            const matiere = request.payload as {
                nom: string;
                description?: string;
            };

            console.log(matiere);

            const newMatiere = await this.matiereService.createMatiere(matiere);

            return h.response(newMatiere).code(201);
        } catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }

    async updateMatiere(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id);
            const [updated] = await this.matiereService.updateMatiere(id, request.payload as any);
            if (updated === 0) {
                return h.response({ error: 'Matiere not found' }).code(404);
            }
            const matiere = await this.matiereService.getMatiereById(id);
            if (!matiere) {
                return h.response({ error: 'Matiere not found' }).code(404);
            }
            return h.response(matiere).code(200);
        } catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }

    async deleteMatiere(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id);
            const deleted = await this.matiereService.deleteMatiere(id);
            if (deleted === 0) {
                return h.response({ error: 'Matiere not found' }).code(404);
            }
            return h.response().code(204);
        } catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
}