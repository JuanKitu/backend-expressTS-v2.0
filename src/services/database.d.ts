import { Model } from "sequelize-typescript";



export interface BaseRepository {
  all(attributes?: string[]): Promise<Model[]>;

  findById(id: number, attributes?: string[]): Promise<Model>;

  create(data: MakeNullishOptional): Promise<Model>;

  update(id: number, data: Model): Promise<Model>;

  delete(id: number): Promise<boolean>;
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

export class ResourceNotFoundError extends BaseError {
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
