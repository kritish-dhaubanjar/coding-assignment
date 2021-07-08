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
  github: {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    userURL: process.env.GITHUB_USER_URL,
    accessTokenURL: process.env.GITHUB_ACCESS_TOKEN_URL,
  },
};

export default config;
