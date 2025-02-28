import { Table, Model, Column, DataType, HasMany, BelongsToMany, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import { Chapitre } from './Chapitre';
import { User } from './User';
import { UserMatiere } from './UserMatiere';

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
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Le nom ne peut pas être vide'
            },
            len: {
                args: [2, 100],
                msg: 'Le nom doit contenir entre 2 et 100 caractères'
            }
        }
    })
    nom!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        validate: {
            len: {
                args: [0, 1000],
                msg: 'La description ne peut pas dépasser 1000 caractères'
            }
        }
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

    @BelongsToMany(() => User, () => UserMatiere)
    users!: User[];

    @BeforeCreate
    @BeforeUpdate
    static trimFields(instance: Matiere) {
        if (instance.nom) {
            instance.nom = instance.nom.trim();
        }
        if (instance.description) {
            instance.description = instance.description.trim();
        }
    }
}
