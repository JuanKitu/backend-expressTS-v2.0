import { Request, Response, NextFunction } from 'express';
import { permissionService } from '../services/Permission.service';
// import { petitionService } from '../services/Petition.service';
import { accountRoleService } from '../services/AccountRole.service';
import ITreeFile from '../interfaces/ITreeFile';
import { getModuleByUrl } from '../core/pathToTreeFile.core';
import { sendError } from '../core/traffic.core';

export async function rolesMiddleware(req: Request, res: Response, next: NextFunction) {
  const publicRoutes = new Set(['account/login', 'account/register', 'account/loginGoogle']);
  if (publicRoutes.has(req.params[0])) {
    return next();
  }
  const { account } = res.locals;
  if (!account) {
    return sendError(res, 500, 'user is not login');
  }
  try {
    const queryRoles = await accountRoleService.findAll({
      account,
    });
    if (!queryRoles.length) {
      return sendError(res, 500, 'rol is not exist');
    }
    const rolList = queryRoles.map((rol) => rol.role);
    const promiseRoleList: any = [];
    /* added feat tree routes */
    const tree: ITreeFile = req.app.get('tree');
    const method = req.method.toLocaleLowerCase();
    const asd = `${req.params[0]}.${method}.js`;
    const url = getModuleByUrl(asd, tree)
      .pathname.replace(/\.(\w+).(js|ts)$/, '')
      .replace(/\[/g, '\\[')
      .replace(/]/g, '\\]');
    /* ###################### */
    rolList.forEach((role: number) => {
      const roleQuery = permissionService.findAll({
        role,
        routeName: url,
      });
      promiseRoleList.push(roleQuery);
    });
    const controlQuery = await Promise.all(promiseRoleList);
    let havePermissions = false;
    // eslint-disable-next-line consistent-return
    controlQuery.forEach((query) => {
      if (query.length !== 0) {
        havePermissions = true;
      }
    });
    return havePermissions ? next() : sendError(res, 500, "Don't have permissions");

    /* const permissionList = queryPermissions.map(permission => permission.permission);
    const queryPetition = await petitionService.findAll({
      permission: permissionList
    });
    const arrayPetition = queryPetition.map((petition) => petition.petitionName);
    if (arrayPetition.includes('all')) {
      return next();
    }
    if (arrayPetition.includes(req.method.toLocaleLowerCase())) {
      return next();
    } */
  } catch (err: any) {
    return res.status(500).json({
      err,
      message: 'error in the try catch roles middleware',
    });
  }
}
