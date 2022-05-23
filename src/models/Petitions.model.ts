import { Optional } from 'sequelize'
import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import Permissions from './Permissions.model';
import {PetitionsI} from "./petition"
interface PetitionsCreationAttributes extends Optional<PetitionsI,'petition' | 'permission'>{};
@Table({
    timestamps: false,
    freezeTableName:false,
    modelName: 'Petitions',
    schema:"public"
})
export default class Petitions extends Model<PetitionsI, PetitionsCreationAttributes> implements PetitionsI{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    })
    public petition!: number;
    @ForeignKey(() => Permissions)
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    })
    public permission!: number;
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    public petitionName!: string;
    @BelongsTo(() => Permissions) permissions!: Permissions;

};
