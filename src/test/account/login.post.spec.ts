import request from 'supertest';
import sequelize from '../../database/database';

import app from '../../app';

const api = request(app);
beforeAll(async () => {
  await sequelize.sync();
  const newAccount = {
    accountName: 'nekane',
    email: 'nekane@nekane.com',
    password: 'nekaneSweet',
  };
  await api.post('/api/account/register').send({ account: newAccount });
});
const account = {
  email: 'nekane@nekane.com',
  password: 'nekaneSweet',
};
const res = api.post('/api/account/login');
res.send({ account });
describe('User login', () => {
  it('returns 200 OK when signin request is valid', (done) => {
    res.then((response) => {
      expect(response.status).toBe(200);
      done();
    });
  });
  it('returns success err when signin request is valid', (done) => {
    res.then((response) => {
      expect(response.body.error).toBe(false);
      done();
    });
  });
  it('returns success token when signin request is not undefined', (done) => {
    res.then((response) => {
      expect(response.body.token).not.toBe(undefined);
      done();
    });
  });
});
