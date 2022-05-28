import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';

const baseRoute = path.join(__dirname, '..');
const baseRouteENV = path.join(__dirname, '..', '..');
dotenv.config({ path: `${baseRouteENV}/config/.env` });
if (!process.env.DB_PORT) {
  process.env.DB_PORT = '-1';
}
export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
  storage: ':memory:',
  models: [`${baseRoute}/models`],
});
