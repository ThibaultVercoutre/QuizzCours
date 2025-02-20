import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Chapitre } from './Chapitre';
import { Reponse } from './Reponse';

@Table({
    tableName: 'questions',
    timestamps: true,
    underscored: true
})
export class Question extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    enonce!: string;

    @ForeignKey(() => Chapitre)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    chapitre_id!: number;

    @BelongsTo(() => Chapitre)
    chapitre!: Chapitre;

    @HasMany(() => Reponse)
    reponses!: Reponse[];

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