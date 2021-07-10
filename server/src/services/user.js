import User from '../models/User';
import Article from '../models/Article';
import * as redis from '../utils/redis';
import { USER } from '../constants/table';
import ItemNotFoundException from '../errors/ItemNotFoundException';

/**
 * Find all users.
 *
 * @returns {Promise}
 */
export async function findAll() {
  const users = await redis.many(USER, `PK`, async () => {
    const { Items } = await User.findAll();

    return Items;
  });

  return users;
}

/**
 * Find a user by user id.
 *
 * @param {string} id
 * @returns {Promise}
 */
export async function findById(id) {
  const user = await redis.get(USER, `USER#${id}`, async () => {
    const { Items } = await User.findById(id);

    if (!Items.length) throw new ItemNotFoundException();

    return Items[0];
  });

  return user;
}

/**
 * Find articles of user by user id.
 *
 * @param {string} id
 * @returns {Promise}
 */
export async function findArticlesByUserId(id) {
  const hash = `USER#${id}#ARTICLE`;

  const articles = await redis.many(hash, 'SK', async () => {
    const { Items } = await Article.findByUserId(id);

    return Items;
  });

  return articles;
}
