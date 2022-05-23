import {Request, Response, NextFunction} from "express";

export interface ModuleFunction {
    requiredRoles: string[],
    default: (req: Request, res: Response, next?: NextFunction) => any
}