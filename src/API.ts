/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type TodoInput = {
  id: string,
  name?: string | null,
  description?: string | null,
};

export type Todo = {
  __typename: "Todo",
  id?: string | null,
  name?: string | null,
  description?: string | null,
};

export type User = {
  __typename: "User",
  Username: string,
  UserAttributes?:  Array<Value | null > | null,
  UserCreateDate?: string | null,
  UserLastModifiedDate?: string | null,
  Enabled?: boolean | null,
  UserStatus?: UserStatus | null,
  MFAOptions?:  Array<MFAOption | null > | null,
  PreferredMfaSetting?: string | null,
  UserMFASettingList?: string | null,
};

export type Value = {
  __typename: "Value",
  Name: string,
  Value?: string | null,
};

export enum UserStatus {
  UNCONFIRMED = "UNCONFIRMED",
  CONFIRMED = "CONFIRMED",
  ARCHIVED = "ARCHIVED",
  COMPROMISED = "COMPROMISED",
  UNKNOWN = "UNKNOWN",
  RESET_REQUIRED = "RESET_REQUIRED",
  FORCE_CHANGE_PASSWORD = "FORCE_CHANGE_PASSWORD",
}


export type MFAOption = {
  __typename: "MFAOption",
  DeliveryMedium?: string | null,
  AttributeName?: string | null,
};

export type Post = {
  __typename: "Post",
  id: string,
  title: string,
  comments?:  Array<Comment | null > | null,
};

export type Comment = {
  __typename: "Comment",
  postId: string,
  content?: string | null,
};

export type CreateTodoMutationVariables = {
  input: TodoInput,
};

export type CreateTodoMutation = {
  createTodo?:  {
    __typename: "Todo",
    id?: string | null,
    name?: string | null,
    description?: string | null,
  } | null,
};

export type UpdateTodoMutationVariables = {
  input: TodoInput,
};

export type UpdateTodoMutation = {
  updateTodo?:  {
    __typename: "Todo",
    id?: string | null,
    name?: string | null,
    description?: string | null,
  } | null,
};

export type DeleteTodoMutationVariables = {
  input: TodoInput,
};

export type DeleteTodoMutation = {
  deleteTodo?:  {
    __typename: "Todo",
    id?: string | null,
    name?: string | null,
    description?: string | null,
  } | null,
};

export type MeQueryVariables = {
};

export type MeQuery = {
  me?:  {
    __typename: "User",
    Username: string,
    UserAttributes?:  Array< {
      __typename: "Value",
      Name: string,
      Value?: string | null,
    } | null > | null,
    UserCreateDate?: string | null,
    UserLastModifiedDate?: string | null,
    Enabled?: boolean | null,
    UserStatus?: UserStatus | null,
    MFAOptions?:  Array< {
      __typename: "MFAOption",
      DeliveryMedium?: string | null,
      AttributeName?: string | null,
    } | null > | null,
    PreferredMfaSetting?: string | null,
    UserMFASettingList?: string | null,
  } | null,
};

export type EchoQueryVariables = {
  msg?: string | null,
};

export type EchoQuery = {
  echo?: string | null,
};

export type GetTodosQueryVariables = {
};

export type GetTodosQuery = {
  getTodos?:  Array< {
    __typename: "Todo",
    id?: string | null,
    name?: string | null,
    description?: string | null,
  } | null > | null,
};

export type PostsQueryVariables = {
};

export type PostsQuery = {
  posts?:  Array< {
    __typename: "Post",
    id: string,
    title: string,
    comments?:  Array< {
      __typename: "Comment",
      postId: string,
      content?: string | null,
    } | null > | null,
  } | null > | null,
};
