import { Request, Response } from 'express';
import { AccountsI } from '../../models/account';
import { accountService } from '../../services/Account.service';
import { Encryption } from '../../services/crypto';
import { encryptPassword } from '../../services/crypto.services';
import { verifyToken } from '../../services/jwt.services';
import { accountLogin } from './accountLogin';
import { roleService } from '../../services/Rols.service';
import { accountRoleService } from '../../services/AccountRole.service';
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
    const account: accountLogin = { ...req.body };
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
    const controlAccount = await accountService.findAll({ email: account.email });
    if (controlAccount.length) {
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
    const responseAccount = await accountService.create(newAccount);
    if (!responseAccount) {
      return res.status(502).json({
        message: 'error in create account',
        error: true,
      });
    }
    if (!responseAccount.account) {
      return res.status(502).json({
        message: 'error in create account id is undefined',
        error: true,
      });
    }
    const roleList = await roleService.findAll({
      defaultRole: true,
    });
    const setRoles = roleList.map((role) => {
      return {
        account: responseAccount.account,
        role: role.role,
      };
    });
    await accountRoleService.bulkCreate(setRoles);
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
