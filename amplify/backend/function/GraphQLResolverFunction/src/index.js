/* Amplify Params - DO NOT EDIT
	AUTH_REACTAMPLIFYGEN1EDDD4E5C_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */ /* Amplify Params 

/**
 * Get user pool information from environment variables.
*/

const { CognitoIdentityProviderClient, AdminGetUserCommand } = require("@aws-sdk/client-cognito-identity-provider");
const cognitoIdentityProviderClient = new CognitoIdentityProviderClient({ region: process.env.REGION });

const COGNITO_USERPOOL_ID = process.env.AUTH_MYRESOURCENAME_USERPOOLID;
if (!COGNITO_USERPOOL_ID) {
  throw new Error(`Function requires environment variable: 'COGNITO_USERPOOL_ID'`);
}
const COGNITO_USERNAME_CLAIM_KEY = "cognito:username";

const POSTS = [
  { id: 1, title: "AWS Lambda: How To Guide." },
  { id: 2, title: "AWS Amplify Launches @function and @key directives." },
  { id: 3, title: "Serverless 101" },
];
const COMMENTS = [
  { postId: 1, content: "Great guide!" },
  { postId: 1, content: "Thanks for sharing!" },
  { postId: 2, content: "Can't wait to try them out!" },
];

// Get all posts. Write your own logic that reads from any data source.
function getPosts() {
  return POSTS;
}

// Get the comments for a single post.
function getCommentsForPost(postId) {
  return COMMENTS.filter((comment) => comment.postId === postId);
}

/**
 * Using this as the entry point, you can use a single function to handle many resolvers.
 */
const resolvers = {
  Query: {
    echo: (ctx) => {
      return ctx.arguments.msg;
    },
    me: async (ctx) => {
      const params = {
        UserPoolId: COGNITO_USERPOOL_ID,
        Username: ctx.identity.claims[COGNITO_USERNAME_CLAIM_KEY],
      };
      //doesn't pass the identity
      try {
        const response = await cognitoIdentityProviderClient.send(new AdminGetUserCommand(params));
        return response.UserAttributes;
      } catch (e) {
        throw new Error(`NOT FOUND`);
      }
    },
    posts: () => {
      return getPosts();
    },
  },
  Post: {
    comments: (ctx) => {
      return getCommentsForPost(ctx.source.id);
    },
  },
};

// event
// {
//   "typeName": "Query", /* Filled dynamically based on @function usage location */
//   "fieldName": "me", /* Filled dynamically based on @function usage location */
//   "arguments": { /* GraphQL field arguments via $ctx.arguments */ },
//   "identity": { /* AppSync identity object via $ctx.identity */ },
//   "source": { /* The object returned by the parent resolver. E.G. if resolving field 'Post.comments', the source is the Post object. */ },
//   "request": { /* AppSync request object. Contains things like headers. */ },
//   "prev": { /* If using the built-in pipeline resolver support, this contains the object returned by the previous function. */ },
// }
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
