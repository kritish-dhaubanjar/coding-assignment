import { dynamodb } from '../config/db';
import { TABLE_NAME } from '../constants/table';

const schema = {
  TableName: TABLE_NAME,
  KeySchema: [
    {
      AttributeName: 'PK',
      KeyType: 'HASH',
    },
    {
      AttributeName: 'SK',
      KeyType: 'RANGE',
    },
  ],
  AttributeDefinitions: [
    { AttributeName: 'PK', AttributeType: 'S' },
    { AttributeName: 'SK', AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

dynamodb.createTable(schema, (err, data) => {
  if (err) {
    console.error('Unable to create table. Error:\n', JSON.stringify(err));
  } else {
    console.log('Created table. Table description:\n', JSON.stringify(data));
  }
});
