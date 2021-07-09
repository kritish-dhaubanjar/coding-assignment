import dotenv from 'dotenv';

dotenv.config();

const config = {
  app: {
    port: process.env.APP_PORT,
    host: process.env.APP_HOST,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    option: {
      expiresIn: process.env.JWT_SECRET_EXPIRE,
      algorithm: 'HS256',
    },
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION,
    endpoint: process.env.AWS_ENDPOINT,
  },
  github: {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    userURL: process.env.GITHUB_USER_URL,
    accessTokenURL: process.env.GITHUB_ACCESS_TOKEN_URL,
  },
  redis: {
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    port: process.env.REDIS_PORT,
  },
};

export default config;
