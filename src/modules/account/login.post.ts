import { Request, Response } from 'express';
import { accountService } from '../../services/Account.service';
import { accountLogin } from './accountLogin';
import { verifyPassword } from '../../services/crypto.services';
import { createToken, verifyToken } from '../../services/jwt.services';

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */

export default async function postLogin(req: Request, res: Response) {
  const account: accountLogin = { ...req.body.account };
  try {
    const getToken = req.get('token');
    const control = verifyToken(getToken);
    if (!control.error) {
      return res.status(500).json({
        message: 'you are login',
        error: true,
      });
    }
    if (!account.password) {
      return res.status(505).json({
        message: 'password is undefined',
        error: true,
      });
    }
    if (!account.email) {
      return res.status(505).json({
        message: 'email is undefined',
        error: true,
      });
    }
    const selectAccount = await accountService.findOne(
      {
        email: account.email,
      },
      ['hash', 'salt', 'account']
    );
    if (!selectAccount) {
      return res.status(505).json({
        message: 'account not exist',
        error: true,
      });
    }
    if (!selectAccount.account) {
      return res.status(505).json({
        message: 'account not exist',
        error: true,
      });
    }
    const newHash = await verifyPassword(account.password, selectAccount.salt);
    if (newHash !== selectAccount.hash) {
      return res.status(505).json({
        message: 'password is wrong',
        error: true,
      });
    }
    const token = createToken(selectAccount.account.toString());
    if (!token) {
      return res.status(505).json({
        message: 'token creation error',
        error: true,
      });
    }
    res.set('token', [token]);
    return res.status(200).json({
      token,
      error: false,
    });
  } catch (err) {
    return res.status(501).json({
      message: err,
      error: true,
    });
  }
}
