"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Chapitre_1 = require("./Chapitre");
const Reponse_1 = require("./Reponse");
let Question = class Question extends sequelize_typescript_1.Model {
};
exports.Question = Question;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }),
    __metadata("design:type", Number)
], Question.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false
    }),
    __metadata("design:type", String)
], Question.prototype, "enonce", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Chapitre_1.Chapitre),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], Question.prototype, "chapitre_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Chapitre_1.Chapitre),
    __metadata("design:type", Chapitre_1.Chapitre)
], Question.prototype, "chapitre", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Reponse_1.Reponse),
    __metadata("design:type", Array)
], Question.prototype, "reponses", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW
    }),
    __metadata("design:type", Date)
], Question.prototype, "created_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW
    }),
    __metadata("design:type", Date)
], Question.prototype, "updated_at", void 0);
exports.Question = Question = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'questions',
        timestamps: true,
        underscored: true
    })
], Question);
