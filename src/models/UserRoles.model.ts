import { Optional } from 'sequelize';
import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Accounts from './Accounts.model';
import Roles from './Roles.model';
import { userRolesI } from './userRole';

type UserRolesCreationAttributes = Optional<userRolesI, 'role'>;
// type UserRolesCreationAttributes = Optional<userRolesI, 'role' | 'account'>;
@Table({
  timestamps: false,
  freezeTableName: false,
  modelName: 'UserRoles',
  schema: 'public',
})
export default class UserRoles extends Model<userRolesI, UserRolesCreationAttributes> implements userRolesI {
  @ForeignKey(() => Roles)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  public role!: number;

  @ForeignKey(() => Accounts)
  @Column({
    type: DataType.INTEGER,
    // primaryKey: true,
    autoIncrement: false,
    allowNull: false,
  })
  public account!: number;

  @BelongsTo(() => Accounts) accounts!: Accounts;

  @BelongsTo(() => Roles) roles!: Roles;
}
