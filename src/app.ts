import * as dotenv from 'dotenv';
import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { requestHandler } from './middleware/routingModule.middleware';
import { authentication } from './middleware/authentication.middleware';
import { rolsMiddleware } from './middleware/rolsModule.middleware';

// import { stream } from './middlewares/winston';

dotenv.config({ path: path?.join?.(__dirname, '../config/.env') });
const app: express.Application = express();
app.use(urlencoded({ limit: '150mb', extended: true }));
app.use(json({ limit: '150mb' }));
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(json({ limit: '50mb' }));
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../public')));

app
  .route('/api/*')
  .get(authentication, rolsMiddleware, requestHandler)
  .post(requestHandler)
  .put(authentication, rolsMiddleware, requestHandler)
  .delete(authentication, rolsMiddleware, requestHandler);

export default app;
