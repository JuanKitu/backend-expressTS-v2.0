import { Optional } from 'sequelize';
import { Table, Model, Column, DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import Accounts from './Accounts.model';
import UserRoles from './UserRoles.model';
import Permissions from './Permissions.model';
import { RolesI } from './role';

type RolesCreationAttributes = Optional<RolesI, 'role'>;
@Table({
  timestamps: false,
  freezeTableName: false,
  modelName: 'Roles',
  schema: 'public',
})
export default class Roles extends Model<RolesI, RolesCreationAttributes> implements RolesI {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  public role!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public rolName!: string;

  // cardinality
  @BelongsToMany(() => Accounts, () => UserRoles) asd!: Array<Accounts & { UserRoles: UserRoles }>;

  @HasMany(() => Permissions) permissions!: Permissions[];
}
