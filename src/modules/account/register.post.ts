import { Request, Response } from 'express';
import { AccountsI } from '../../models/account';
import { accountService } from '../../services/Account.service';
import { Encryption } from '../../services/crypto';
import { encryptPassword } from '../../services/crypto.services';
import { verifyToken } from '../../services/jwt.services';
import { accountLogin } from './accountLogin';
// import { accountService } from '../../services/Account.service';

export default async function getRegister(req: Request, res: Response) {
  try {
    const getToken = req.get('token');
    const control = verifyToken(getToken);
    if (!control.error) {
      return res.status(500).json({
        message: 'you are login',
        error: true,
      });
    }
    const account: accountLogin = { ...req.body.account };
    if (!account.password) {
      return res.status(502).json({
        message: 'password undefined',
        error: true,
      });
    }
    if (!account.email) {
      return res.status(502).json({
        message: 'email undefined',
        error: true,
      });
    }
    const controlAccount = await accountService.findOne({ email: account.email });
    if (controlAccount) {
      return res.status(502).json({
        message: 'account already exists',
        error: true,
      });
    }
    const newEncrypt: Encryption = await encryptPassword(account.password);

    const newAccount: AccountsI = {
      hash: newEncrypt.hash,
      salt: newEncrypt.salt,
      email: account.email,
      accountName: account.accountName,
    };
    await accountService.create(newAccount);
    return res.status(200).json({
      message: 'created',
      error: false,
    });
  } catch (err) {
    return res.status(501).json({
      message: err,
      error: true,
    });
  }
}
