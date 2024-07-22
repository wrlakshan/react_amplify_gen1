/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const me = /* GraphQL */ `query Me {
  me {
    Username
    UserAttributes {
      Name
      Value
      __typename
    }
    UserCreateDate
    UserLastModifiedDate
    Enabled
    UserStatus
    MFAOptions {
      DeliveryMedium
      AttributeName
      __typename
    }
    PreferredMfaSetting
    UserMFASettingList
    __typename
  }
}
` as GeneratedQuery<APITypes.MeQueryVariables, APITypes.MeQuery>;
export const echo = /* GraphQL */ `query Echo($msg: String) {
  echo(msg: $msg)
}
` as GeneratedQuery<APITypes.EchoQueryVariables, APITypes.EchoQuery>;
export const getTodos = /* GraphQL */ `query GetTodos {
  getTodos {
    id
    name
    description
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTodosQueryVariables, APITypes.GetTodosQuery>;
export const posts = /* GraphQL */ `query Posts {
  posts {
    id
    title
    comments {
      postId
      content
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<APITypes.PostsQueryVariables, APITypes.PostsQuery>;
