import { docClient } from '../db';
import { TABLE_NAME } from '../constants/table';
import { v4 as uuidv4 } from 'uuid';

class Article {
  /**
   * Find user by id.
   *
   * @param {string} id
   * @returns {Promise}
   */
  static findAll() {
    const params = {
      TableName: TABLE_NAME,
      FilterExpression: 'begins_with(#SK, :SK)',
      ExpressionAttributeNames: { '#SK': 'SK' },
      ExpressionAttributeValues: {
        ':SK': 'ARTICLE#',
      },
    };

    return docClient.scan(params).promise();
  }

  /**
   * Find articles by article id.
   *
   * @param {string} id
   * @returns {Promise}
   */
  static findById(id) {
    const params = {
      TableName: TABLE_NAME,
      FilterExpression: '#SK = :SK',
      ExpressionAttributeNames: { '#SK': 'SK' },
      ExpressionAttributeValues: {
        ':SK': `ARTICLE#${id}`,
      },
    };

    return docClient.scan(params).promise();
  }

  /**
   * Find all articles by user id.
   *
   * @param {string} userId
   * @returns {Promise}
   */
  static findByUserId(userId) {
    const params = {
      TableName: TABLE_NAME,
      KeyConditionExpression: '#PK = :PK and begins_with(#SK, :SK)',
      ExpressionAttributeNames: { '#PK': 'PK', '#SK': 'SK' },
      ExpressionAttributeValues: {
        ':PK': `USER#${userId}`,
        ':SK': `ARTICLE#`,
      },
    };

    return docClient.query(params).promise();
  }

  /**
   * Save an article with user id.
   *
   * @param {string} userId
   * @param {Object} data
   * @returns {Promise}
   */
  static save(userId, data) {
    const id = uuidv4();

    const params = {
      TableName: TABLE_NAME,
      Item: {
        PK: `USER#${userId}`,
        SK: `ARTICLE#${id}`,
        id,
        userId,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };

    return new Promise((resolve, reject) => {
      docClient.put(params, (err, data) => {
        if (err) reject(err);

        if (data) resolve({ Attributes: params.Item });
      });
    });
  }

  /**
   * Update an article by article id & user id.
   *
   * @param {string} userId
   * @param {string} articleId
   * @param {Object} data
   * @returns {Promise}
   */
  static update(userId, articleId, data) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        PK: `USER#${userId}`,
        SK: `ARTICLE#${articleId}`,
      },
      UpdateExpression:
        'SET #title = :title, #body = :body, #updatedAt = :updatedAt',
      ConditionExpression: '#PK = :PK and #SK = :SK',
      ExpressionAttributeNames: {
        '#PK': 'PK',
        '#SK': 'SK',
        '#title': 'title',
        '#body': 'body',
        '#updatedAt': 'updatedAt',
      },
      ExpressionAttributeValues: {
        ':PK': `USER#${userId}`,
        ':SK': `ARTICLE#${articleId}`,
        ':title': data.title,
        ':body': data.body,
        ':updatedAt': new Date().toISOString(),
      },
      ReturnValues: 'ALL_NEW',
    };

    return docClient.update(params).promise();
  }

  /**
   * Delete an article by user id.
   *
   * @param {string} userId
   * @param {string} articleId
   * @returns {Promise}
   */
  static destroy(userId, articleId) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        PK: `USER#${userId}`,
        SK: `ARTICLE#${articleId}`,
      },
      ConditionExpression: '#PK = :PK and #SK = :SK',
      ExpressionAttributeNames: { '#PK': 'PK', '#SK': 'SK' },
      ExpressionAttributeValues: {
        ':PK': `USER#${userId}`,
        ':SK': `ARTICLE#${articleId}`,
      },
      ReturnValues: 'ALL_OLD',
    };

    return docClient.delete(params).promise();
  }
}

export default Article;
