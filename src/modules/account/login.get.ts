import { Request, Response } from 'express';
import { accountService } from '../../services/Account.service';
/**
 * @swagger
 * /login:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */

export default async function getLogin(req: Request, res: Response) {
  await accountService
    .create({
      hash: 'dsdsd',
      salt: '323232',
      accountName: 'pepito41',
      email: 'pepito@gmail.com',
      emailGoogle: 'pepito@gmail.com',
    })
    .then((data) =>
      res.json({
        resp: data,
      })
    )
    .catch((data) =>
      res.json({
        resp: data,
      })
    );
}
