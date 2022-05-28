import { Request, Response, NextFunction } from 'express';
import { ModuleFunction } from './routingModule';

export async function requestHandler(req:Request, res:Response, next:NextFunction) {
  const method = req.method.toLocaleLowerCase();
  const moduleName = `../modules/${req.url.replace('/api/', '') || '501'}.${method}`;
  let moduleFunction: ModuleFunction = await import((`../modules/errors/501.${method}`));
  // req.params[0] == 'user/login' ? moduleName = '../modules/user/login.get' : moduleName;
  try {
    moduleFunction = await import(moduleName);
  } catch (err) {
    // insert log
    next(new Error(`Module ${moduleName} not available.`));
  } finally {
    // control role and login in the if
    if (moduleFunction) {
      moduleFunction.default(req, res, next);
    }
  }
}
