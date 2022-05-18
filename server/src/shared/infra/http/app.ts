import 'reflect-metadata';
import '../../container';

import express from 'express';

import { handleErrors } from './middlewares/handleErrors';
import { routes } from './routes';

const app = express();

app.use(express.json());

app.use('/api/v1', routes);
app.use(handleErrors);

export { app };
