/* eslint-disable no-unused-vars */
import { Model } from 'sequelize-typescript';
import { WhereOptions } from 'sequelize/types';
import { MakeNullishOptional } from 'sequelize/types/utils';
import { BulkCreateOptions } from 'sequelize';

export interface BaseRepository {
  findAll(query?: WhereOptions, attributes?: string[]): Promise<Model[]>;

  findById(id: number, attributes?: string[]): Promise<Model>;

  findOne(query: WhereOptions, attributes?: string[]): Promise<Model>;

  create(data: MakeNullishOptional): Promise<Model>;

  bulkCreate(data: MakeNullishOptional, options?: BulkCreateOptions): Promise<Model[]>;

  update(query: WhereOptions, data: Model): Promise<Model>;

  delete(query: WhereOptions, clearAllRecords?: boolean): Promise<boolean>;
}
