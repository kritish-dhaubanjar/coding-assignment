import os from 'os';
import cors from 'cors';
import morgan from 'morgan';
import config from './config';
import express from 'express';
import routes from './routes';
import cluster from 'cluster';
import * as errorHandler from './middlewares/errorHandler';

const noOfCPUs = os.cpus().length;

const app = express();
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());

app.use('/api', routes);
app.use(errorHandler.genericErrorHandler);

const { port, host } = config.app;

if (cluster.isPrimary) {
  for (let i = 0; i < noOfCPUs; i++) {
    cluster.fork();
  }
} else {
  app.listen(port, host, () => {
    console.log(`Server ${process.pid} started at http://${host}:${port}`);
  });
}
