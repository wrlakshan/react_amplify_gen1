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
