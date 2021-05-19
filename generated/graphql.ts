import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};


export type Mutation = {
  __typename?: 'Mutation';
  createOneUser: User;
  deleteAllUsers?: Maybe<Scalars['String']>;
};


export type MutationCreateOneUserArgs = {
  data: UserCreateInput;
};

export type Query = {
  __typename?: 'Query';
  getAllUsers?: Maybe<Array<Maybe<User>>>;
  users: Array<User>;
  user?: Maybe<User>;
};


export type QueryUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<UserWhereUniqueInput>;
  after?: Maybe<UserWhereUniqueInput>;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};

export type TodoCreateManyUserInput = {
  id?: Maybe<Scalars['Int']>;
  body: Scalars['String'];
  title: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
};

export type TodoCreateManyUserInputEnvelope = {
  data?: Maybe<Array<TodoCreateManyUserInput>>;
  skipDuplicates?: Maybe<Scalars['Boolean']>;
};

export type TodoCreateNestedManyWithoutUserInput = {
  create?: Maybe<Array<TodoCreateWithoutUserInput>>;
  connectOrCreate?: Maybe<Array<TodoCreateOrConnectWithoutUserInput>>;
  createMany?: Maybe<TodoCreateManyUserInputEnvelope>;
  connect?: Maybe<Array<TodoWhereUniqueInput>>;
};

export type TodoCreateOrConnectWithoutUserInput = {
  where: TodoWhereUniqueInput;
  create: TodoCreateWithoutUserInput;
};

export type TodoCreateWithoutUserInput = {
  body: Scalars['String'];
  title: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
};

export type TodoWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  name?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

export type UserCreateInput = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['DateTime']>;
  image?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  Todo?: Maybe<TodoCreateNestedManyWithoutUserInput>;
};

export type UserWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
};

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = (
  { __typename?: 'Query' }
  & { getAllUsers?: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'name'>
  )>>> }
);

export type UserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  )> }
);


export const AllUsersDocument = gql`
    query allUsers {
  getAllUsers {
    name
  }
}
    `;
export const UserDocument = gql`
    query User($id: Int!) {
  user(where: {id: $id}) {
    id
    name
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    allUsers(variables?: AllUsersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AllUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllUsersQuery>(AllUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'allUsers');
    },
    User(variables: UserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserQuery>(UserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'User');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;