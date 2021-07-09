import client from '../config/redis';

/**
 * Get a value from a hash field if cache hit, else set.
 *
 * @param {string} hash
 * @param {string} key
 * @param {Function} cb
 * @returns {Promise}
 */
export async function get(hash, key, cb) {
  return new Promise(async (resolve, reject) => {
    client.hget(hash, key, async (err, data) => {
      if (err) reject(err);

      if (data) {
        resolve(JSON.parse(data));
      } else {
        try {
          data = await cb();
          put(hash, key, data);
          resolve(data);
        } catch (err) {
          reject(err);
        }
      }
    });
  });
}

/**
 * Get all values from a hash if cache hit, else set.
 *
 * @param {string} hash
 * @param {string} key
 * @param {Function} cb
 * @returns {Promise}
 */
export async function many(hash, key, cb) {
  return new Promise(async (resolve, reject) => {
    client.hvals(hash, async (err, data) => {
      if (err) reject(err);

      if (data.length) {
        resolve(data.map(JSON.parse));
      } else {
        try {
          data = await cb();
          putMany(hash, key, data);
          resolve(data);
        } catch (err) {
          reject(err);
        }
      }
    });
  });
}

/**
 * Set a values for a hash field.
 *
 * @param {string} hash
 * @param {string} key
 * @param {Object} data
 */
export function put(hash, key, data) {
  client.hset(hash, key, JSON.stringify(data));
}

/**
 * Set values for a hash using key as field.
 *
 * @param {string} hash
 * @param {string} key
 * @param {Object} data
 * @returns
 */
export function putMany(hash, key, data) {
  if (data.length) {
    let collection = [];
    data.forEach((el) => {
      collection.push(el[key], JSON.stringify(el));
    });

    client.hmset(hash, collection);
  }
}

/**
 * Remove specified field from a hash.
 *
 * @param {string} hash
 * @param {string} key
 * @returns
 */
export function forget(hash, key) {
  client.hdel(hash, key);
}
