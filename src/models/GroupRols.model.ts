import { Optional } from 'sequelize';
import {
  Table, Model, Column, DataType, HasMany,
} from 'sequelize-typescript';
import { GroupRolsI } from './groupRol';
import Rols from './Rols.model';

export type GroupRolsCreationAttributes = Optional<GroupRolsI, 'groupRol'>;
@Table({
  timestamps: false,
  freezeTableName: false,
  modelName: 'GroupRols',
  schema: 'public',
})
export default class GroupRols extends Model<GroupRolsI, GroupRolsCreationAttributes> implements GroupRolsI {
    @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    })
  public groupRol?: number;

    @Column({
      type: DataType.STRING,
    })
    public routeName!: string;

    // cardinality
    @HasMany(() => Rols)
      rol!: Rols[];
}
