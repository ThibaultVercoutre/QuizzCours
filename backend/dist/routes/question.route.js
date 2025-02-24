"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionRoutes = void 0;
const question_controller_1 = require("../controllers/question.controller");
const questionRoutes = (server) => {
    const controller = new question_controller_1.QuestionController();
    server.route([
        {
            method: 'GET',
            path: '/api/chapitres/{chapitreId}/questions',
            handler: (request, h) => controller.getQuestions(request, h)
        },
        {
            method: 'GET',
            path: '/api/questions/{id}',
            handler: (request, h) => controller.getQuestionById(request, h)
        },
        {
            method: 'POST',
            path: '/api/chapitres/{chapitreId}/questions',
            handler: (request, h) => controller.createQuestion(request, h)
        },
        {
            method: 'PUT',
            path: '/api/questions/{id}',
            handler: (request, h) => controller.updateQuestion(request, h)
        },
        {
            method: 'DELETE',
            path: '/api/questions/{id}',
            handler: (request, h) => controller.deleteQuestion(request, h)
        }
    ]);
};
exports.questionRoutes = questionRoutes;
