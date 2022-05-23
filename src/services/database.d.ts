import { Model } from "sequelize-typescript";

type RepoErrorCode = 404 | 500
export interface IRepo<M> {
    save(model: M): RepoResult<M>;
    findById(id: string): RepoResult<M>;
    search(parameterName: string, parameterValue: string, sortBy: string, order: number, pageSize: number, pageNumber: number): RepoResult<M[]>;
    getAll(): RepoResult<M[]>;
    deleteById(id: string): RepoResult<M>;
    findByIds(ids: string[]): RepoResult<M[]>;
    deleteByIds(ids: string[]): RepoResult<any>;
}



export interface BaseRepository {
  all(attributes?: string[]): Promise<Model[]>;

  findById(id: number, attributes?: string[]): Promise<Model>;

  create(data: MakeNullishOptional): Promise<Model>;

  update(id: number, data: Model): Promise<Model>;

  delete(id: number): Promise<boolean>;
}
