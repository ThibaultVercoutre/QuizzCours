import { Server } from '@hapi/hapi';
import { QuestionController } from '../controllers/question.controller';

export const questionRoutes = (server: Server) => {
    const controller = new QuestionController();

    server.route([
        {
            method: 'GET',
            path: '/api/questions',
            handler: (request, h) => controller.getAllQuestions(request, h)
        },
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