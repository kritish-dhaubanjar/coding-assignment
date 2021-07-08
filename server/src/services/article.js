import Article from '../models/Article';

/**
 * Find all articles.
 *
 * @returns {Promise}
 */
export function findAll() {
  const articles = Article.findAll();

  return articles;
}

/**
 * Find all article by article id.
 *
 * @param {string} id
 * @returns {Promise}
 */
export function findById(id) {
  const article = Article.findById(id);

  return article;
}

/**
 * Store an article of auth user.
 *
 * @param {string} userId
 * @param {Object} data
 * @returns {Promise}
 */
export function save(userId, data) {
  const article = Article.save(userId, data);

  return article;
}

/**
 * Update an article of auth user by article id.
 *
 * @param {string} userId
 * @param {articleId} articleId
 * @param {Object} data
 * @returns {Promise}
 */
export function update(userId, articleId, data) {
  const article = Article.update(userId, articleId, data);

  return article;
}

/**
 * Delete an article of auth user by article id.
 *
 * @param {string} userId
 * @param {articleId} articleId
 * @returns {Promise}
 */
export function destroy(userId, articleId) {
  const article = Article.destroy(userId, articleId);

  return article;
}
