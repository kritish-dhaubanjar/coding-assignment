import config from './config';
import express from 'express';
import routes from './routes';
import * as errorHandler from './middlewares/errorHandler';

const app = express();

app.use('/api', routes);
app.use(errorHandler.genericErrorHandler);

const { port, host } = config.app;

app.listen(port, host, () => {
  console.log(`Server started at http://${host}:${port}`);
});
