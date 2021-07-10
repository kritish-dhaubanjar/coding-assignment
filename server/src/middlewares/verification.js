import config from '../config';
import jwt from 'jsonwebtoken';
import NotAuthenticatedException from '../errors/NotAuthenticatedException';

export function verifyAccessToken(req, res, next) {
  const { authorization } = req.headers;

  try {
    if (!authorization) throw new NotAuthenticatedException();

    const [_, accessToken] = authorization.trim().split(' ');

    const { secret, option } = config.jwt;

    const user = jwt.verify(accessToken, secret, option);

    req.user = user;

    next();
  } catch (err) {
    next(new NotAuthenticatedException(err.message));
  }
}
