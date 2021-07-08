import config from '../config';
import jwt from 'jsonwebtoken';

export function verifyAccessToken(req, res, next) {
  const { authorization } = req.headers;

  try {
    if (!authorization) throw Error();

    const [_, accessToken] = authorization.trim().split(' ');

    const { secret, option } = config.jwt;

    const user = jwt.verify(accessToken, secret, option);

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
}
