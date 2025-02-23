import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Chapitre } from './Chapitre';

@Table({
    tableName: 'scores',
    timestamps: true,
    underscored: true
})
export class Score extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 100
        }
    })
    pourcentage!: number;

    @ForeignKey(() => Chapitre)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    chapitre_id!: number;

    @BelongsTo(() => Chapitre)
    chapitre!: Chapitre;

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