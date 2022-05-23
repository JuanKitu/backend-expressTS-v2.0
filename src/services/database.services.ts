import { BaseRepository, ResourceNotFoundError } from "./database";
import { Model, ModelCtor } from 'sequelize-typescript';
import { Json, MakeNullishOptional } from "sequelize/types/utils";
import { Attributes, Optional, WhereOptions } from "sequelize/types";
export abstract class SequelizeBaseRepository<M extends Model> implements BaseRepository {
    public model!: ModelCtor<M>
    constructor(model: ModelCtor<M>) {
      this.model = model
    }
  
    public async all(attributes?: string[]): Promise<M[]> {
      
      return this.model.findAll({
        attributes,
      });
    }
  
    public async findById(id: number, attributes?: string[]): Promise<M> {
      
      const resource = await this.model.findByPk(id, {
        attributes,
      });
  
      if (resource) {
        return resource;
      }
  
      throw new ResourceNotFoundError();
    }
    /* public async findOne(id: JSON): Promise<M> {
      
      const resource = await this.model.findOne({
        where:id
      });
  
      if (resource) {
        return resource;
      }
  
      throw new ResourceNotFoundError();
    } */
  
    public async create(data: MakeNullishOptional<M["_creationAttributes"]>): Promise<M> {
      //aca el codigo putea porque no le agregue Optional<PetitionsI,'petition' | 'permission'>
      return this.model.create<M>(data);
    }
  
    public async update(id: number, data: any): Promise<M> {
      const resource = await this.findById(id);
  
      if (resource) {
        return resource.update(data);
      }
  
      throw new ResourceNotFoundError();
    }
  
    public async delete(id: number): Promise<boolean> {
      const resource = await this.findById(id);
  
      if (resource) {
        await resource.destroy();
        return true;
      }
  
      throw new ResourceNotFoundError();
    }
}