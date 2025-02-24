"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_1 = __importDefault(require("@hapi/hapi"));
const matiere_route_1 = require("./routes/matiere.route");
const chapitre_route_1 = require("./routes/chapitre.route");
const question_route_1 = require("./routes/question.route");
const reponse_route_1 = require("./routes/reponse.route");
const score_route_1 = require("./routes/score.route");
const database_1 = __importDefault(require("./config/database"));
const init = async () => {
    const server = hapi_1.default.server({
        port: 3001,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
                headers: ['Accept', 'Content-Type'],
                additionalHeaders: ['X-Requested-With']
            }
        }
    });
    // Synchroniser la base de données
    try {
        await database_1.default.authenticate();
        console.log('Database connection established successfully.');
        await database_1.default.sync({ alter: true });
        console.log('Database synchronized successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
    // Enregistrer les routes
    (0, matiere_route_1.matiereRoutes)(server);
    (0, chapitre_route_1.chapitreRoutes)(server);
    (0, question_route_1.questionRoutes)(server);
    (0, reponse_route_1.reponseRoutes)(server);
    (0, score_route_1.scoreRoutes)(server);
    await server.start();
    console.log('Server running on %s', server.info.uri);
};
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();
