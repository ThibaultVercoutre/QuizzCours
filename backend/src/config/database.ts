import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME || 'quizz',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3307,
    dialect: Number(process.env.DB_PORT) == 3307 ? 'mariadb' : 'mysql',
    models: [path.join(__dirname, '..', 'models')], // chemin vers les modèles
    logging: false, // désactive les logs SQL en développement
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: true,
        underscored: true
    }
});

// Gestion de la fermeture propre
process.on('SIGINT', async () => {
    try {
        await sequelize.close();
        console.log('Connection to database closed.');
        process.exit(0);
    } catch (error) {
        console.error('Error closing database connection:', error);
        process.exit(1);
    }
});

export default sequelize;