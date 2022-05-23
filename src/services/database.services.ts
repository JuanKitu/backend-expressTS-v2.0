import { BaseRepository } from "./database";
import { Model, ModelCtor } from 'sequelize-typescript';
import { MakeNullishOptional } from "sequelize/types/utils";
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