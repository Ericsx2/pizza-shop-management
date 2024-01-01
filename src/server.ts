import chalk from 'chalk';
import { app } from './app';
import { env } from './env';

app.listen(env.PORT, () =>
  console.log(chalk.greenBright(`Server is Running on Port ${env.PORT}`)),
);
