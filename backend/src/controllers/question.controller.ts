import { Request, ResponseToolkit } from '@hapi/hapi';
import { QuestionService } from '../services/question.service';
import { ReponseService } from '../services/reponse.service';

export class QuestionController {
    private questionService: QuestionService;
    private reponseService: ReponseService;

    constructor() {
        this.questionService = new QuestionService();
        this.reponseService = new ReponseService();
    }

    async getQuestions(request: Request, h: ResponseToolkit) {
        try {
            const chapitreId = parseInt(request.params.chapitreId);
            const questions = await this.questionService.findAll(chapitreId);
            return h.response(questions).code(200);
        } catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }

    async getQuestionById(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id);
            const question = await this.questionService.findOne(id);
            if (!question) {
                return h.response({ error: 'Question not found' }).code(404);
            }
            return h.response(question).code(200);
        } catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }

    async createQuestion(request: Request, h: ResponseToolkit) {
        try {
            const chapitreId = request.params.chapitreId;
            const { question, reponses } = request.payload as {
                question: {
                    enonce: string;
                };
                reponses: Array<{
                    texte: string;
                    est_correcte: boolean;
                }>;
            };

            const questionData = {
                ...question,
                chapitre_id: parseInt(chapitreId)
            };
    
            // Créer la question
            const createdQuestion = await this.questionService.create(questionData);
    
            // Créer les réponses associées
            if (reponses && reponses.length > 0) {
                const reponsesWithQuestionId = reponses.map(reponse => ({
                    ...reponse,
                    question_id: createdQuestion.id
                }));
    
                // Vous devrez injecter ReponseService dans le constructeur

                for (const reponse of reponsesWithQuestionId) {
                    console.log('reponse:', reponse);
                    const response = await this.reponseService.create(reponse);
                }
            }
    
            return h.response(createdQuestion).code(201);
        } catch (error) {
            console.error('Erreur lors de la création de la question:', error);
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }

    async updateQuestion(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id);
            const question = await this.questionService.update(id, request.payload as any);
            if (!question) {
                return h.response({ error: 'Question not found' }).code(404);
            }
            return h.response(question).code(200);
        } catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }

    async deleteQuestion(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id);
            const deleted = await this.questionService.delete(id);
            if (!deleted) {
                return h.response({ error: 'Question not found' }).code(404);
            }
            return h.response().code(204);
        } catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
}