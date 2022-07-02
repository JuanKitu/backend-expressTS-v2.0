import UserRole from '../models/UserRoles.model';
import SequelizeBaseRepository from '../core/repository.core';

class UserRoleService extends SequelizeBaseRepository<UserRole> {}
export const userRoleService = new UserRoleService(UserRole);
