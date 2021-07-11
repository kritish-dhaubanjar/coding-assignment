import config from '../config';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import * as redis from '../utils/redis';
import { USER } from '../constants/table';
/**
 * Signin or Signup a github user & return accessToken.
 *
 * @param {Object} data
 * @returns {Object}
 */
export async function authenticate(data) {
  const { secret, option } = config.jwt;

  const { Items } = await User.findById(data.id);

  let payload = {};

  if (!Items.length) {
    const { Attributes } = await User.save(data);

    redis.many(USER, 'PK', async () => {
      const { Items } = await User.findAll();

      return Items;
    });

    redis.put(USER, Attributes.PK, Attributes);

    payload = Attributes;
  } else {
    payload = Items[0];
  }

  const accessToken = jwt.sign(payload, secret, option);

  return { accessToken };
}
