import { Model } from "sequelize-typescript";
export interface BaseRepository {
  all(attributes?: string[]): Promise<Model[]>;

  findById(id: number, attributes?: string[]): Promise<Model>;

  create(data: MakeNullishOptional): Promise<Model>;

  update(id: number, data: Model): Promise<Model>;

  delete(id: number): Promise<boolean>;
}
