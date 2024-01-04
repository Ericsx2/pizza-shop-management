import express from 'express';

import { createUserRouter } from './routes/create-user';
import { createProductRouter } from './routes/create-product';
import { userLoginRouter } from './routes/user-login';
import { createOrderRouter } from './routes/create-order';

const app = express();
app.use(express.json());

app.use(createUserRouter);
app.use(createProductRouter);
app.use(userLoginRouter);
app.use(createOrderRouter);

export { app };
