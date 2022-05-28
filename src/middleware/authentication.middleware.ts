import { Request, Response, NextFunction } from 'express';
import { createToken, verifyToken } from '../services/jwt.services';

function sendErrror(res:Response, reason:string) {
  return res.status(501).json({
    error: true,
    message: reason,
  });
}
export function authentication(req: Request, res: Response, next: NextFunction) {
  const publicRoutes = new Set(['user/login', 'user/register', 'user/loginGoogle']);
  const token = req.get('token');
  const control = verifyToken(token);
  if (control.error) {
    if (publicRoutes.has(req.params[0])) {
      return next();
    }
    return sendErrror(res, control.message);
    // return res.redirect('/api/user/login')
  }
  // refresh token
  const newToken = createToken(control.decoded.account);
  if (newToken) {
    res.setHeader('token', newToken);
  }
  res.setHeader('account', control.decoded.account);
  return next();
}
