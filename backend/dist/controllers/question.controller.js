"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionController = void 0;
const question_service_1 = require("../services/question.service");
const reponse_service_1 = require("../services/reponse.service");
class QuestionController {
    constructor() {
        this.questionService = new question_service_1.QuestionService();
        this.reponseService = new reponse_service_1.ReponseService();
    }
    async getQuestions(request, h) {
        try {
            const chapitreId = parseInt(request.params.chapitreId);
            const questions = await this.questionService.findAll(chapitreId);
            return h.response(questions).code(200);
        }
        catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
    async getQuestionById(request, h) {
        try {
            const id = parseInt(request.params.id);
            const question = await this.questionService.findOne(id);
            if (!question) {
                return h.response({ error: 'Question not found' }).code(404);
            }
            return h.response(question).code(200);
        }
        catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
    async createQuestion(request, h) {
        try {
            const chapitreId = request.params.chapitreId;
            const { question, reponses } = request.payload;
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
        }
        catch (error) {
            console.error('Erreur lors de la création de la question:', error);
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
    async updateQuestion(request, h) {
        try {
            const id = parseInt(request.params.id);
            const question = await this.questionService.update(id, request.payload);
            if (!question) {
                return h.response({ error: 'Question not found' }).code(404);
            }
            return h.response(question).code(200);
        }
        catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
    async deleteQuestion(request, h) {
        try {
            const id = parseInt(request.params.id);
            const deleted = await this.questionService.delete(id);
            if (!deleted) {
                return h.response({ error: 'Question not found' }).code(404);
            }
            return h.response().code(204);
        }
        catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
}
exports.QuestionController = QuestionController;
