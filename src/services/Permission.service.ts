import { ModelCtor } from "sequelize-typescript";
import Permissions from "../models/Permissions.model";
import { SequelizeBaseRepository } from "../core/repository.core";
class PermissionService extends SequelizeBaseRepository<Permissions>{
    constructor(Model:ModelCtor<Permissions>){
        super(Model);
    }
}
export const permissionService = new PermissionService(Permissions);