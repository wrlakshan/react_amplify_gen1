const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { PutCommand, UpdateCommand, DeleteCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const region = process.env.REGION;
const docClient = new DynamoDBClient({ region: region });
const TODO_TABLE = process.env.CUSTOM_TODO_TABLE_NAME;

const getTodos = async () => {
  const command = new ScanCommand({
    TableName: TODO_TABLE,
  });
  try {
    const response = await docClient.send(command);
    return response.Items;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching todos");
  }
};

const createTodo = async (input) => {
  const command = new PutCommand({
    TableName: TODO_TABLE,
    Item: input,
  });
  try {
    await docClient.send(command);
    return input;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating todo");
  }
};

const updateTodo = async (input) => {
  const command = new UpdateCommand({
    TableName: TODO_TABLE,
    Key: { id: input.id },
    UpdateExpression: "set #name = :name, #description = :description",
    ExpressionAttributeNames: {
      "#name": "name",
      "#description": "description",
    },
    ExpressionAttributeValues: {
      ":name": input.name,
      ":description": input.description,
    },
    ReturnValues: "ALL_NEW",
  });
  try {
    const response = await docClient.send(command);
    return response.Attributes;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating todo");
  }
};

const deleteTodo = async (id) => {
  const command = new DeleteCommand({
    TableName: TODO_TABLE,
    Key: { id },
    ReturnValues: "ALL_OLD",
  });
  try {
    const response = await docClient.send(command);
    return response.Attributes;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting todo");
  }
};

const resolvers = {
  Query: {
    getTodos: async () => {
      return await getTodos();
    },
  },
  Mutation: {
    createTodo: async (ctx) => {
      return await createTodo(ctx.arguments.input);
    },
    updateTodo: async (ctx) => {
      return await updateTodo(ctx.arguments.input);
    },
    deleteTodo: async (ctx) => {
      return await deleteTodo(ctx.arguments.input.id);
    },
  },
};

exports.handler = async (event) => {
  console.log("🚀 ~ exports.handler= ~ event:", event);
  const typeHandler = resolvers[event.typeName];
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName];
    if (resolver) {
      return await resolver(event);
    }
  }
  throw new Error("Resolver not found.");
};
