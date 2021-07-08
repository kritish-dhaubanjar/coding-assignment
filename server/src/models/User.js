import { docClient } from '../db';
import { TABLE_NAME } from '../constants/table';

class User {
  /**
   * Find all user.
   *
   * @returns {Promise}
   */
  static findAll() {
    const params = {
      TableName: TABLE_NAME,
      FilterExpression: 'begins_with(#SK, :SK)',
      ExpressionAttributeNames: { '#SK': 'SK' },
      ExpressionAttributeValues: {
        ':SK': 'METADATA#',
      },
    };

    return docClient.scan(params).promise();
  }

  /**
   * Find user by id.
   *
   * @param {string} id
   * @returns {Promise}
   */
  static findById(id) {
    const params = {
      TableName: TABLE_NAME,
      KeyConditionExpression: '#PK = :PK and begins_with(#SK, :SK)',
      ExpressionAttributeNames: { '#PK': 'PK', '#SK': 'SK' },
      ExpressionAttributeValues: {
        ':PK': `USER#${id}`,
        ':SK': `METADATA#${id}`,
      },
    };

    return docClient.query(params).promise();
  }

  /**
   * Save a user.
   *
   * @param {Object} data
   * @returns {Promise}
   */
  static save(data) {
    const params = {
      TableName: TABLE_NAME,
      Item: {
        PK: `USER#${data.id}`,
        SK: `METADATA#${data.id}`,
        ...data,
      },
    };

    return docClient.put(params).promise();
  }
}

export default User;
