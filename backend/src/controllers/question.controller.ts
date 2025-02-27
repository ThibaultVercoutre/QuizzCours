import { Request, ResponseToolkit } from '@hapi/hapi';
import { QuestionService } from '../services/question.service';
import { ReponseService } from '../services/reponse.service';
import { ErrorService } from '../services/error.service';

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
            if (isNaN(chapitreId)) {
                return ErrorService.handleValidationError(h, 'ID de chapitre invalide');
            }
            const questions = await this.questionService.findAll(chapitreId);
            return h.response(questions).code(200);
        } catch (error) {
            ErrorService.logError('getQuestions', error, { chapitreId: request.params.chapitreId });
            return ErrorService.handleServerError(h, error);
        }
    }

    async getQuestionById(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id);
            if (isNaN(id)) {
                return ErrorService.handleValidationError(h, 'ID invalide');
            }
            const question = await this.questionService.findOne(id);
            if (!question) {
                return ErrorService.handleNotFoundError(h, 'Question');
            }
            return h.response(question).code(200);
        } catch (error) {
            ErrorService.logError('getQuestionById', error, { id: request.params.id });
            return ErrorService.handleServerError(h, error);
        }
    }

    async getAllQuestions(request: Request, h: ResponseToolkit) {
        try {
            const questions = await this.questionService.getAllQuestions();
            return h.response(questions).code(200);
        } catch (error) {
            ErrorService.logError('getAllQuestions', error);
            return ErrorService.handleServerError(h, error);
        }
    }

    async createQuestion(request: Request, h: ResponseToolkit) {
        try {
            const chapitreId = request.params.chapitreId;
            if (!chapitreId || isNaN(parseInt(chapitreId))) {
                return ErrorService.handleValidationError(h, 'ID de chapitre invalide');
            }
            
            const { question, reponses } = request.payload as {
                question: {
                    enonce: string;
                };
                reponses: Array<{
                    texte: string;
                    est_correcte: boolean;
                }>;
            };

            if (!question || !question.enonce) {
                return ErrorService.handleValidationError(h, 'L\'énoncé de la question est requis');
            }

            if (!reponses || reponses.length === 0) {
                return ErrorService.handleValidationError(h, 'Au moins une réponse est requise');
            }

            const questionData = {
                ...question,
                chapitre_id: parseInt(chapitreId)
            };
    
            // Créer la question
            const createdQuestion = await this.questionService.create(questionData);
    
            // Créer les réponses associées
            const reponsesWithQuestionId = reponses.map(reponse => ({
                ...reponse,
                question_id: createdQuestion.id
            }));

            for (const reponse of reponsesWithQuestionId) {
                await this.reponseService.create(reponse);
            }
    
            return h.response(createdQuestion).code(201);
        } catch (error) {
            ErrorService.logError('createQuestion', error, { 
                chapitreId: request.params.chapitreId,
                payload: request.payload 
            });
            return ErrorService.handleServerError(h, error);
        }
    }

    async updateQuestion(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id);
            if (isNaN(id)) {
                return ErrorService.handleValidationError(h, 'ID invalide');
            }
            
            const question = await this.questionService.update(id, request.payload as any);
            if (!question) {
                return ErrorService.handleNotFoundError(h, 'Question');
            }
            return h.response(question).code(200);
        } catch (error) {
            ErrorService.logError('updateQuestion', error, { 
                id: request.params.id, 
                payload: request.payload 
            });
            return ErrorService.handleServerError(h, error);
        }
    }

    async deleteQuestion(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id);
            if (isNaN(id)) {
                return ErrorService.handleValidationError(h, 'ID invalide');
            }
            
            const deleted = await this.questionService.delete(id);
            if (!deleted) {
                return ErrorService.handleNotFoundError(h, 'Question');
            }
            return h.response().code(204);
        } catch (error) {
            ErrorService.logError('deleteQuestion', error, { id: request.params.id });
            return ErrorService.handleServerError(h, error);
        }
    }
}