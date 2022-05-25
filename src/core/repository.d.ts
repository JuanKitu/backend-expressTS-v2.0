import { Model } from "sequelize-typescript";
import { MakeNullishOptional } from "sequelize/types/utils";
export interface BaseRepository {
  findAll(query?:WhereOptions, attributes?: string[]): Promise<Model[]>;

  findById(id: number, attributes?: string[]): Promise<Model>;
  
  findOne(query: WhereOptions, attributes?: string[]): Promise<Model>;

  create(data: MakeNullishOptional): Promise<Model>;

  update(query:WhereOptions, data: Model): Promise<Model>;

  delete(query:WhereOptions<Attributes<M>>): Promise<boolean>;
}
