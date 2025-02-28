import Hapi from '@hapi/hapi';
import { matiereRoutes } from './routes/matiere.route';
import { chapitreRoutes } from './routes/chapitre.route';
import { questionRoutes } from './routes/question.route';
import { reponseRoutes } from './routes/reponse.route';
import { scoreRoutes } from './routes/score.route';
import { authRoutes } from './routes/auth.route';
import { userRoutes } from './routes/user.route';
import { authPlugin } from './plugins/auth.plugin';
import sequelize from './config/database';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3001,
        host: process.env.HOST || 'localhost',
        routes: {
            cors: {
                origin: ['*'],
                headers: ['Accept', 'Content-Type', 'Authorization'],
                additionalHeaders: ['X-Requested-With'],
                credentials: true
            },
            validate: {
                failAction: async (request, h, err) => {
                    if (process.env.NODE_ENV === 'production') {
                        console.error('ValidationError:', err);
                        throw new Error('Invalid request payload');
                    } else {
                        console.error(err);
                        throw err;
                    }
                }
            }
        }
    });

    // Synchroniser la base de données
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
        
        // En production, ne pas utiliser { alter: true } pour éviter les modifications non intentionnelles
        const syncOptions = process.env.NODE_ENV === 'production' 
            ? {} 
            : { 
                alter: true,
                // Désactiver temporairement les contraintes de clé étrangère pendant la synchronisation
                // pour éviter les erreurs de dépendance circulaire
                force: false
            };
            
        await sequelize.sync(syncOptions);
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }

    // Enregistrer le plugin d'authentification
    await server.register(authPlugin);
    console.log('Authentication plugin registered successfully.');

    // Enregistrer les routes
    matiereRoutes(server);
    chapitreRoutes(server);
    questionRoutes(server);
    reponseRoutes(server);
    scoreRoutes(server);
    authRoutes(server);
    userRoutes(server);
    
    await server.start();
    console.log(`Server running on ${server.info.uri} in ${process.env.NODE_ENV || 'development'} mode`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();