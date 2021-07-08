import dotenv from 'dotenv';

dotenv.config();

const config = {
  app: {
    port: process.env.APP_PORT,
    host: process.env.APP_HOST,
  },
};

export default config;
