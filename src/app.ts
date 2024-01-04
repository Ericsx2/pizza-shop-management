import express from 'express';

import { createUserRouter } from './routes/create-user';
import { createProductRouter } from './routes/create-product';
import { userLoginRouter } from './routes/user-login';

const app = express();
app.use(express.json());

app.use(createUserRouter);
app.use(createProductRouter);
app.use(userLoginRouter);

export { app };
