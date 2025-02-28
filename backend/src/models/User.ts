import { Table, Model, Column, DataType, BelongsToMany, HasMany, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import { Matiere } from './Matiere';
import { Score } from './Score';
import { UserMatiere } from './UserMatiere';
import * as bcrypt from 'bcrypt';

@Table({
    tableName: 'users',
    timestamps: true,
    underscored: true
})
export class User extends Model {
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
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'L\'email doit être valide'
            }
        }
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Le mot de passe ne peut pas être vide'
            },
            len: {
                args: [6, 100],
                msg: 'Le mot de passe doit contenir au moins 6 caractères'
            }
        }
    })
    password!: string;

    @Column({
        type: DataType.ENUM('admin', 'user'),
        defaultValue: 'user'
    })
    role!: 'admin' | 'user';

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

    @BelongsToMany(() => Matiere, () => UserMatiere)
    matieres!: Matiere[];

    @HasMany(() => Score)
    scores!: Score[];

    @BeforeCreate
    @BeforeUpdate
    static async hashPassword(instance: User) {
        if (instance.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            instance.password = await bcrypt.hash(instance.password, salt);
        }
    }

    @BeforeCreate
    @BeforeUpdate
    static trimFields(instance: User) {
        if (instance.name) {
            instance.name = instance.name.trim();
        }
        if (instance.email) {
            instance.email = instance.email.trim().toLowerCase();
        }
    }

    async comparePassword(candidatePassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, this.password);
    }
}
