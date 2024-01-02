import express from 'express';

import { userRouter } from './routes/userRoutes';
import { createProductRouter } from './routes/create-product';

const app = express();
app.use(express.json());

app.use(userRouter);
app.use(createProductRouter);

export { app };
