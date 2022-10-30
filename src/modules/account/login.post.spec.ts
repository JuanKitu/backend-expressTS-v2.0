import request from 'supertest';
import { accountService } from '../../services/Account.service';
import sequelize from '../../database/database';
import app from '../../app';
import { verifyPassword } from '../../services/crypto.services';

const api = request(app);

const account = {
  accountName: 'nekane',
  email: 'nekane@nekane.com',
  password: 'nekaneSweet',
};

const res = api.post('/api/account/register');
res.send(account);

beforeAll(async () => {
  await sequelize.sync();
  const control = await accountService.findAll();
  if (control && control.length !== 0) {
    await accountService.delete({}, true);
  }
});

afterAll(async () => {
  await sequelize.close();
});

describe('User registration', () => {
  test('returns 201 OK when signup request is valid', (done) => {
    res.then((response) => {
      expect(response.status).toBe(201);
      done();
    });
  });

  test('returns success err when signup request is valid', (done) => {
    res.then((response) => {
      expect(response.error).toBe(false);
      done();
    });
  });
  test('save users to database', (done) => {
    res.then(async () => {
      const queryAccount = await accountService.findAll({
        email: 'nekane@nekane.com',
      });
      expect(queryAccount.length).toBe(1);
      done();
    });
  });
  test('save accountName and email to database', (done) => {
    res.then(async () => {
      const queryAccount = await accountService.findAll({
        email: 'nekane@nekane.com',
      });
      const newAccount = queryAccount[0];
      expect(newAccount).not.toBe(undefined);
      expect(newAccount.accountName).toBe('nekane');
      expect(newAccount.email).toBe('nekane@nekane.com');
      done();
    });
  });
  test('hashes the password in database', (done) => {
    res.then(async () => {
      const queryAccount = await accountService.findAll({
        email: 'nekane@nekane.com',
      });
      const newAccount = queryAccount[0];
      const newHash = await verifyPassword('nekaneSweet', newAccount.salt);
      expect(newAccount.hash).not.toBe('nekaneSweet');
      expect(newAccount.hash).toBe(newHash);
      done();
    });
  });
});
