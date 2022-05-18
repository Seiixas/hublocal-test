import 'reflect-metadata';
import '../../container';

import express from 'express';
import swaggerUI from 'swagger-ui-express';

import swaggerFile from '../../../swagger.json';
import { handleErrors } from './middlewares/handleErrors';
import { routes } from './routes';

const app = express();

app.use(express.json());

app.use('/api/v1', routes);
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(handleErrors);

export { app };
