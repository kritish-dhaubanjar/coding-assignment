import config from '../config';
import jwt from 'jsonwebtoken';
import User from '../models/User';

/**
 * Signin or Signup a github user & return accessToken.
 *
 * @param {Object} data
 * @returns {Object}
 */
export async function authenticate(data) {
  const { secret, option } = config.jwt;

  const { Items } = await User.findById(data.id);

  if (!Items.length) {
    await User.save(data);
  }

  const accessToken = jwt.sign(data, secret, option);

  return { accessToken };
}
