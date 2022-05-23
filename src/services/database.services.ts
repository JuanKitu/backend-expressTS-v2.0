import { BaseRepository } from "./database";
import { Model, ModelCtor } from 'sequelize-typescript';
import { MakeNullishOptional } from "sequelize/types/utils";
import { Attributes, WhereOptions } from "sequelize/types";
export abstract class BaseError {
  constructor(
    public code: number,
    public name: string,
    public title: string,
    public description: string,
    public originalName?: string,
    public stackTrace?: string,
  ) {}

  public toPlainObject(): object {
    /* if (APP_ENV === 'development') {
      return {
        code: this.code,
        name: this.name,
        title: this.title,
        description: this.description,
        originalName: this.originalName,
        stackTrace: this.stackTrace,
      };
    } */

    return {
      code: this.code,
      name: this.name,
      title: this.title,
      description: this.description,
    };
  }
}
class ResourceNotFoundError extends BaseError {
    constructor(
      public originalName?: string,
      public stackTrace?: string,
    ) {
      super(
        404,
        'ResourceNotFoundError',
        'Resource Not Found',
        'The requested resource was not found or does not exist.',
        originalName,
        stackTrace,
      );
    }
}

export abstract class SequelizeBaseRepository<M extends Model> implements BaseRepository {
    public model!: ModelCtor<M>
    constructor(model: ModelCtor<M>) {
      this.model = model
    }

    public async findAll(attributes?: string[]): Promise<M[]> {

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
    public async findOne(query:WhereOptions<Attributes<M>>,attributes?:string[]): Promise<M> {
      
      const resource = await this.model.findOne({
        where:query,
        attributes
      });
  
      if (resource) {
        return resource;
      }
  
      throw new ResourceNotFoundError();
    }

    public async create(data: MakeNullishOptional<M["_creationAttributes"]>): Promise<M> {
      const resource = this.model.create<M>(data);
      if(!resource){
        throw new ResourceNotFoundError(); 
      }
      return resource
    }

    public async update(query:WhereOptions<Attributes<M>>, data: any): Promise<M> {
      const resource = await this.findOne(query);

      if (resource) {
        return resource.update(data);
      }

      throw new ResourceNotFoundError();
    }

    public async delete(query:WhereOptions<Attributes<M>>): Promise<boolean> {
      const resource = await this.findOne(query);

      if (resource) {
        await resource.destroy();
        return true;
      }

      throw new ResourceNotFoundError();
    }
} 