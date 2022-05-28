import * as dotenv from 'dotenv';
import express, { json, urlencoded } from 'express';
import clc from 'cli-color';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { requestHandler } from './middleware/routingModule.middleware';
import { authentication } from './middleware/authentication.middleware';
import { sequelize } from './database/database';
import { rolsMiddleware } from './middleware/rolsModule.middleware';
// eslint-disable-next-line import/named
import swaggerSpec from './core/swagger.core';

// import { stream } from './middlewares/winston';
sequelize.sync();
/* ######## confing express #################################### */
dotenv.config({ path: path?.join?.(__dirname, '../config/.env') });
const app: express.Application = express();
app.use(urlencoded({ limit: '150mb', extended: true }));
app.use(json({ limit: '150mb' }));
app.set('port', process.env.PORT || 3000);
/* ############################################################################################## */
/* ######################################### middleware ######################################### */
app.use(morgan('dev'));
app.use(json({ limit: '50mb' }));
app.use(cors());

app.use(express.static(path.resolve(__dirname, '../public')));
/* ############################################################################################## */
/* ###################################### importing routes ###################################### */

app.route('/api/*').get(authentication, rolsMiddleware, requestHandler)
  .post(authentication, rolsMiddleware, requestHandler)
  .put(authentication, rolsMiddleware, requestHandler)
  .delete(authentication, rolsMiddleware, requestHandler);
/* ############################################################################################## */
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen((app.get('port')), () => {
  // eslint-disable-next-line no-console
  console.log(clc.magenta.inverse.bold(`Server on: localhost:${app.get('port')}`));
});
