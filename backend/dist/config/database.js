"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.DB_NAME || 'quizz',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    models: [path_1.default.join(__dirname, '..', 'models')], // chemin vers les modèles
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
    }
    catch (error) {
        console.error('Error closing database connection:', error);
        process.exit(1);
    }
});
exports.default = sequelize;
