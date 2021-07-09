import AWS from 'aws-sdk';
import config from '../config';

AWS.config.update(config.aws);

const dynamodb = new AWS.DynamoDB();

const docClient = new AWS.DynamoDB.DocumentClient();

export { dynamodb, docClient };
