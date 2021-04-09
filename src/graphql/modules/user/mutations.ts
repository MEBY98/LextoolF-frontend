import gql from 'graphql-tag';

import { userFragment } from './fragments';

export const createUserMutation = gql`
  ${userFragment}
  mutation createUser($scenarios: [String!], $input: CreateUserInput!) {
    createUser(scenarios: $scenarios, input: $input) {
      ...userFragment
    }
  }
`;

export const createManyUsersMutation = gql`
  ${userFragment}
  mutation createManyUsers($scenarios: [String!], $input: [CreateUserInput!]!) {
    createManyUsers(scenarios: $scenarios, input: $input) {
      ...userFragment
    }
  }
`;

export const updateByIdUserMutation = gql`
  ${userFragment}
  mutation updateByIdUser($scenarios: [String!], $input: UpdateUserInput!) {
    updateByIdUser(scenarios: $scenarios, input: $input) {
      ...userFragment
    }
  }
`;

export const updateManyUsersMutation = gql`
  mutation updateManyUsers(
    $scenarios: [String!]
    $input: UpdateUserInput!
    $where: JSON!
  ) {
    updateManyUsers(scenarios: $scenarios, input: $input, where: $where) {
      n
      nModified
    }
  }
`;

export const deleteByIdUserMutation = gql`
  ${userFragment}
  mutation deleteByIdUser($id: ID!) {
    deleteByIdUser(id: $id) {
      ...userFragment
    }
  }
`;

export const deleteOneUserMutation = gql`
  ${userFragment}
  mutation deleteOneUser($where: JSON!) {
    deleteOneUser(where: $where) {
      ...userFragment
    }
  }
`;
