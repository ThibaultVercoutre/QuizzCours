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
exports.Chapitre = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Matiere_1 = require("./Matiere");
const Score_1 = require("./Score");
let Chapitre = class Chapitre extends sequelize_typescript_1.Model {
};
exports.Chapitre = Chapitre;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }),
    __metadata("design:type", Number)
], Chapitre.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], Chapitre.prototype, "titre", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true
    }),
    __metadata("design:type", String)
], Chapitre.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Matiere_1.Matiere),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], Chapitre.prototype, "matiere_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Matiere_1.Matiere),
    __metadata("design:type", Matiere_1.Matiere)
], Chapitre.prototype, "matiere", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW
    }),
    __metadata("design:type", Date)
], Chapitre.prototype, "created_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW
    }),
    __metadata("design:type", Date)
], Chapitre.prototype, "updated_at", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Score_1.Score),
    __metadata("design:type", Array)
], Chapitre.prototype, "scores", void 0);
exports.Chapitre = Chapitre = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'chapitres',
        timestamps: true,
        underscored: true
    })
], Chapitre);
