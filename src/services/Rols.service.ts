import { ModelCtor } from "sequelize-typescript";
import Rols from "../models/Rols.model";
import { SequelizeBaseRepository } from "../core/repository.core";
class RolService extends SequelizeBaseRepository<Rols>{
    constructor(Model:ModelCtor<Rols>){
        super(Model);
    }
}
export const rolService = new RolService(Rols);