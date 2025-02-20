import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Question } from './Question';

@Table({
    tableName: 'reponses',
    timestamps: true,
    underscored: true
})
export class Reponse extends Model {
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
    texte!: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    est_correcte!: boolean;

    @ForeignKey(() => Question)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    question_id!: number;

    @BelongsTo(() => Question)
    question!: Question;

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
}