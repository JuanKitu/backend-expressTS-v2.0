import { ModelCtor } from "sequelize-typescript";
import Petitions from "../models/Petitions.model";
import { SequelizeBaseRepository } from "../core/repository.core";
class PetitionService extends SequelizeBaseRepository<Petitions>{
    constructor(Model:ModelCtor<Petitions>){
        super(Model);
    }
}
export const petitionService = new PetitionService(Petitions);