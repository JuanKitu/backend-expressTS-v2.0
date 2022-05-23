import { BaseRepository, RepoErrorCode } from "./database";
import { Model, ModelCtor } from 'sequelize-typescript';
import { Json, MakeNullishOptional } from "sequelize/types/utils";
import { Attributes, Optional, WhereOptions } from "sequelize/types";


export interface Result<M>{
    ok?: M | undefined | Model<M>,
    err?:any
}

export interface IRepo<M> {
    save(model: M): Promise<Result<M>>;
    findById(options: WhereOptions<Attributes<Model>>): Promise<Result<M>>;
    /* search(parameterName: string, parameterValue: string, sortBy: string, order: number, pageSize: number, pageNumber: number): M[];
    getAll(): M[];
    deleteById(id: string): M;
    findByIds(ids: string[]): M[];
    deleteByIds(ids: string[]): any; */
};

export abstract class Repo<M extends Model> implements IRepo<M> {
    protected Model!: ModelCtor<M>;
    constructor(Model: ModelCtor<M>) {
        this.Model = Model;
    }

    public async save(doc: M) {
        try {
            const savedDoc = await doc.save();
            const result: Result<M>={
                ok:savedDoc,
                err:false
            }
            return result
        } catch (ex: any) {
            //logger.error(ex);
            const result: Result<M>={
                ok:undefined,
                err:true
            }
            return result
        }
    }

    public async findById(options:WhereOptions<Attributes<M>>) {
        try {
            let result:Result<M>={
                ok:undefined,
                err:true
            }
            const doc = await this.Model.findOne<any>({
                where:options
            });
            if (!doc) {
                return result;
            }
            result.ok = doc;
            result.err = false

            return result
        } catch (err) {
            const result: Result<M>={
                ok:undefined,
                err:true
            }
            return result
        }
    }
}


abstract class BaseError {
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