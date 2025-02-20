import Hapi from '@hapi/hapi';
import { matiereRoutes } from './routes/matiere.route';
import { chapitreRoutes } from './routes/chapitre.route';
import { questionRoutes } from './routes/question.route';
import { reponseRoutes } from './routes/reponse.route';
import sequelize from './config/database';

const init = async () => {
    const server = Hapi.server({
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
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
        await sequelize.sync({ alter: true });
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }

    // Enregistrer les routes
    matiereRoutes(server);
    chapitreRoutes(server);
    questionRoutes(server);
    reponseRoutes(server);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();