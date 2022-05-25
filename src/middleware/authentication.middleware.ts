import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/jwt.services';
function sendErrror (res:Response, reason:string){
    return res.status(501).json({
        error: true, 
        message: reason})
}
export function authentication (req: Request, res: Response, next: NextFunction){
    const publicRoutes = new Set(['user/login','user/register','user/loginGoogle'])
    if(publicRoutes.has(req.params[0])){
        return next();
    }
    let token = req.get('token');
    const control = verifyToken(token)
    if(control.error){
        return sendErrror(res, control.message)
        //return res.redirect('/api/user/login')
    }
    res.setHeader("account", control.decoded.accounts.account);
    return next();
};
