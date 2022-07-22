import { Request, Response, NextFunction } from 'express';
import { permissionService } from '../services/Permission.service';
// import { petitionService } from '../services/Petition.service';
import { accountRoleService } from '../services/AccountRole.service';

function sendError(res: Response, reason: string) {
  return res.status(501).json({
    error: true,
    message: reason,
  });
}

export async function rolsMiddleware(req: Request, res: Response, next: NextFunction) {
  const publicRoutes = new Set(['account/login', 'account/register', 'account/loginGoogle']);
  if (publicRoutes.has(req.params[0])) {
    return next();
  }
  const { account } = res.locals;
  if (!account) {
    return sendError(res, 'user is not login');
  }
  try {
    const queryRoles = await accountRoleService.findAll({
      account,
    });
    if (!queryRoles.length) {
      return sendError(res, 'rol is not exist');
    }
    const rolList = queryRoles.map((rol) => rol.role);
    const promiseRoleList: any = [];
    rolList.forEach((role: number) => {
      const roleQuery = permissionService.findAll({
        role,
        routeName: req.params[0],
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
    return havePermissions ? next() : sendError(res, "Don't have permissions");

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
  } catch (err) {
    return res.status(500).json({
      err,
      message: 'error in the trycatch rols middleware',
    });
  }
}
