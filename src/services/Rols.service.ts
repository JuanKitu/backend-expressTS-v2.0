// import { ModelCtor } from 'sequelize-typescript';
import Roles from '../models/Roles.model';
import SequelizeBaseRepository from '../core/repository.core';

class RoleService extends SequelizeBaseRepository<Roles> {
  /* constructor(Model:ModelCtor<Roles>) {
    super(Model);
  } */
}
export const roleService = new RoleService(Roles);
