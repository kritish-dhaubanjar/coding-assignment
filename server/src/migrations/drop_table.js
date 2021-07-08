import { dynamodb } from "../db";
import { TABLE_NAME } from "../constants/table";

const schema = {
  TableName: TABLE_NAME,
};

dynamodb.deleteTable(schema, (err, data) => {
  if (err) {
    console.error("Unable to delete table. Error:\n", JSON.stringify(err));
  } else {
    console.log("Deleted table. Table description:\n", JSON.stringify(data));
  }
});
