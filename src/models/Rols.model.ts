import { Optional } from 'sequelize'
import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript'
import Accounts from './Accounts.model';
import Permissions from './Permissions.model';
import {RolsI} from "./rol"
interface RolsCreationAttributes extends Optional<RolsI, 'rol' | 'account'>{};
@Table({
    timestamps: false,
    freezeTableName:false,
    modelName: 'Rols',
    schema:"public"
})
export default class Rols extends Model<RolsI, RolsCreationAttributes> implements RolsI{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    })
    public rol!: number;
    @ForeignKey(() => Accounts)
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    })
    public account!: number;
    @Column({
        type: DataType.STRING 
    })
    public rolName!: string;
    //cardinality
    @BelongsTo(() => Accounts) accounts!: Accounts;
    @HasMany(() => Permissions) permissions!: Permissions[];

};