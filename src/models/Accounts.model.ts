import { Optional } from 'sequelize';
import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { AccountsI } from './account';
import Rols from './Rols.model';

export type AccountsCreationAttributes = Optional<AccountsI, 'account'>;
@Table({
  timestamps: false,
  freezeTableName: false,
  modelName: 'Accounts',
  schema: 'public',
})
export default class Accounts extends Model<AccountsI, AccountsCreationAttributes> implements AccountsI {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  public account?: number;

  @Column({
    type: DataType.STRING,
  })
  public hash!: string;

  @Column({
    type: DataType.STRING,
  })
  public salt!: string;

  @Column({
    type: DataType.STRING,
  })
  public accountName!: string;

  @Column({
    type: DataType.STRING,
  })
  public email!: string;

  @Column({
    type: DataType.STRING,
  })
  public emailGoogle!: string;

  // cardinality
  @HasMany(() => Rols) rol!: Rols[];
}
