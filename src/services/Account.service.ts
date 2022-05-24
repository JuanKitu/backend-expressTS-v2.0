import { ModelCtor } from "sequelize-typescript";
import Accounts from "../models/Accounts.model";
import { SequelizeBaseRepository } from "../core/repository.core";
class AccountService extends SequelizeBaseRepository<Accounts>{
    constructor(Model:ModelCtor<Accounts>){
        super(Model);
    }
}
export const accountService = new AccountService(Accounts);