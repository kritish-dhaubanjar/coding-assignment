import config from './config';
import express from 'express';

const app = express();

const { port, host } = config.app;

app.listen(port, host, () => {
  console.log(`Server started at http://${host}:${port}`);
});
