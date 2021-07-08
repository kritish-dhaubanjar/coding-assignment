import User from '../models/User';
import Article from '../models/Article';

/**
 * Find all users.
 *
 * @returns {Promise}
 */
export function findAll() {
  const users = User.findAll();

  return users;
}

/**
 * Find a user by user id.
 *
 * @param {string} id
 * @returns {Promise}
 */
export function findById(id) {
  const user = User.findById(id);

  return user;
}

/**
 * Find articles of user by user id.
 *
 * @param {string} id
 * @returns {Promise}
 */
export function findArticlesByUserId(id) {
  const articles = Article.findByUserId(id);

  return articles;
}
