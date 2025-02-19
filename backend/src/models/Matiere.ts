import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Chapitre } from './Chapitre';

@Table({
    tableName: 'matieres',
    timestamps: true,
    underscored: true
})
export class Matiere extends Model {
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
    nom!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    description?: string;

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

    @HasMany(() => Chapitre)
    chapitres!: Chapitre[];
}
