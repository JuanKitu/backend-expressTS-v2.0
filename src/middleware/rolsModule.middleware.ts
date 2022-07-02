import { Request, Response, NextFunction } from 'express';
import { permissionService } from '../services/Permission.service';
// import { petitionService } from '../services/Petition.service';
import { userRoleService } from '../services/UserRole.service';

function sendErrror(res: Response, reason: string) {
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
  const account = req.get('account');
  if (!account) {
    return sendErrror(res, 'user is not login');
  }
  try {
    const queryRols = await userRoleService.findAll({
      account,
    });
    if (!queryRols) {
      return sendErrror(res, 'rol is not exist');
    }
    const rolList = queryRols.map((rol) => rol.role);

    const queryPermissions = await permissionService.findAll({
      role: rolList,
      routeName: req.params[0],
    });
    return queryPermissions.length !== 0 ? next() : sendErrror(res, "Don't have permissions");

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
