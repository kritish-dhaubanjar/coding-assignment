import config from '../config';
import jwt from 'jsonwebtoken';

/**
 * Signin or Signup a github user & return accessToken.
 *
 * @param {Object} data
 * @returns {Object}
 */
export async function authenticate(data) {
  const { secret, option } = config.jwt;

  const accessToken = jwt.sign(data, secret, option);

  return { accessToken };
}
