import config from './config';
import express from 'express';
import routes from './routes';

const app = express();

app.use('/api', routes);

const { port, host } = config.app;

app.listen(port, host, () => {
  console.log(`Server started at http://${host}:${port}`);
});
