import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME || 'quizz',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    models: [path.join(__dirname, '..', 'models')], // chemin vers les modèles
    logging: false // désactive les logs SQL en développement
});

export default sequelize;