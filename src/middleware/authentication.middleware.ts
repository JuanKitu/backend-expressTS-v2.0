import { Request, Response, NextFunction } from 'express';
import { createToken, verifyToken } from '../services/jwt.services';

function sendError(res: Response, reason: string) {
  return res.status(501).json({
    error: true,
    message: reason,
  });
}
export function authentication(req: Request, res: Response, next: NextFunction) {
  const publicRoutes = new Set(['account/login', 'account/register', 'account/loginGoogle']);
  const token = req.get('token');
  const control = verifyToken(token);
  if (control.error) {
    if (publicRoutes.has(req.params[0])) {
      return next();
    }
    return sendError(res, control.message);
    // return res.redirect('/api/user/login')
  }
  // refresh token
  const newToken = createToken(control.decoded.account);
  if (newToken) {
    res.set('token', [newToken]);
  }
  res.set('account', [control.decoded.account]);
  res.locals.account = control.decoded.account;
  return next();
}
