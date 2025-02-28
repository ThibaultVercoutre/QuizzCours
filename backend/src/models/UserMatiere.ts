import { Table, Model, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from './User';
import { Matiere } from './Matiere';

@Table({
    tableName: 'user_matieres',
    timestamps: true,
    underscored: true
})
export class UserMatiere extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    user_id!: number;

    @ForeignKey(() => Matiere)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    matiere_id!: number;

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