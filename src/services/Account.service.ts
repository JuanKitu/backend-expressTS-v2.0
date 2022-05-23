import { ModelCtor } from "sequelize-typescript";
import Accounts from "../models/Accounts.model";
import { SequelizeBaseRepository } from "./database.services";

class AccountService extends SequelizeBaseRepository<Accounts>{
    constructor(Model:ModelCtor<Accounts>){
        super(Model);
    }
}

export const accountService = new AccountService(Accounts);// se usaria esto para trabajar en los controladores
