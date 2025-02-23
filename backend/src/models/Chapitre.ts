import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Matiere } from './Matiere';
import { Score } from './Score';

@Table({
    tableName: 'chapitres',
    timestamps: true,
    underscored: true
})
export class Chapitre extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    titre!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    description?: string;

    @ForeignKey(() => Matiere)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    matiere_id!: number;

    @BelongsTo(() => Matiere)
    matiere!: Matiere;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW
    })
    created_at!: Date;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW
    })
    updated_at!: Date;

    @HasMany(() => Score)
    scores!: Score[];
}