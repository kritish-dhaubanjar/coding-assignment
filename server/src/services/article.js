import Article from '../models/Article';
import * as redis from '../utils/redis';
import { ARTICLE } from '../constants/table';

/**
 * Find all articles.
 *
 * @returns {Promise}
 */
export async function findAll() {
  const articles = await redis.many(ARTICLE, 'SK', async () => {
    const { Items } = await Article.findAll();
    return Items;
  });

  return articles;
}

/**
 * Find all article by article id.
 *
 * @param {string} id
 * @returns {Promise}
 */
export async function findById(id) {
  const article = await redis.get(ARTICLE, `ARTICLE#${id}`, async () => {
    const { Items } = await Article.findById(id);

    if (!Items.length) throw Error();

    return Items[0];
  });

  return article;
}

/**
 * Store an article of auth user.
 *
 * @param {string} userId
 * @param {Object} data
 * @returns {Promise}
 */
export async function save(userId, data) {
  const { Attributes } = await Article.save(userId, data);

  const hash = `USER#${userId}#ARTICLE`;
  redis.put(hash, Attributes.SK, Attributes);
  redis.put(ARTICLE, Attributes.SK, Attributes);

  return Attributes;
}

/**
 * Update an article of auth user by article id.
 *
 * @param {string} userId
 * @param {articleId} articleId
 * @param {Object} data
 * @returns {Promise}
 */
export async function update(userId, articleId, data) {
  const { Attributes } = await Article.update(userId, articleId, data);

  const hash = `USER#${userId}#ARTICLE`;
  redis.put(hash, Attributes.SK, Attributes);
  redis.put(ARTICLE, Attributes.SK, Attributes);

  return Attributes;
}

/**
 * Delete an article of auth user by article id.
 *
 * @param {string} userId
 * @param {articleId} articleId
 * @returns {Promise}
 */
export async function destroy(userId, articleId) {
  const { Attributes } = await Article.destroy(userId, articleId);

  const hash = `USER#${userId}#ARTICLE`;
  redis.forget(hash, Attributes.SK);
  redis.forget(ARTICLE, Attributes.SK);

  return Attributes;
}
