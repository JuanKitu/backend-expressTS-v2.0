import { Optional } from 'sequelize';
import {
  Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany,
} from 'sequelize-typescript';
import { PermissionsI } from './permission';
import Rols from './Rols.model';
import Petitions from './Petitions.model';

type PermissionsCreationAttributes = Optional<PermissionsI, 'account'>;
@Table({
  timestamps: false,
  freezeTableName: false,
  modelName: 'Permissions',
  schema: 'public',
})
export default class Permissions extends Model<PermissionsI, PermissionsCreationAttributes> implements PermissionsI {
    @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    })
  public permission!: number;

    @ForeignKey(() => Rols)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    public account!: number;

    @ForeignKey(() => Rols)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    public rol!: number;

    @Column({
      type: DataType.STRING,
    })
    public routeName!: string;

    @BelongsTo(() => Rols, { foreignKey: 'account' }) accounts!: Rols;

    @BelongsTo(() => Rols, { foreignKey: 'rol' }) rols!: Rols;

    @HasMany(() => Petitions) petitions!: Petitions[];
}
