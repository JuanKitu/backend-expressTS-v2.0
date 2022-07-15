import AccountRole from '../models/AccountRoles.model';
import SequelizeBaseRepository from '../core/repository.core';

class AccountRoleService extends SequelizeBaseRepository<AccountRole> {}
export const accountRoleService = new AccountRoleService(AccountRole);
