import { NextFunction, Response, Request } from 'express';
import { accountService } from '../services/Account.service';

export default async function registerMiddleware(req: Request, res: Response, next: NextFunction) {
  const { password, username, email } = req.body;

  // check if send username
  if (!username) {
    res.status(400).json({
      message: 'username is undefined',
      error: true,
    });
    return;
  }

  // check if send password
  if (!password) {
    res.status(400).json({
      message: 'password is undefined',
      error: true,
    });
    return;
  }

  // check if send email
  if (!email) {
    res.status(400).json({
      message: 'email is undefined',
      error: true,
    });
    return;
  }

  // check if username already exist
  // @ts-ignore
  const account = await accountService.findOne({ username });
  if (account) {
    res.status(400).json({
      message: 'username already exist',
      error: true,
    });
    return;
  }

  next();
}
