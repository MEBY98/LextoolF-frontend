import gql from 'graphql-tag';

import { paginationFragment } from '../base/fragments';
import { userFragment } from './fragments';

export const getByIdUserQuery = gql`
  ${userFragment}

  query getByIdUser($id: ID!) {
    getByIdUser(id: $id) {
      ...userFragment
    }
  }
`;

export const getOneUserQuery = gql`
  ${userFragment}

  query getOneUser($input: GetOneInput!) {
    getOneUser(input: $input) {
      ...userFragment
    }
  }
`;

export const getManyUsersQuery = gql`
  ${userFragment}
  ${paginationFragment}
  query getManyUsers($getManyInput: GetManyInput!) {
    getManyUsers(getManyInput: $getManyInput) {
      elements {
        ...userFragment
      }
      pagination {
        ...paginationFragment
      }
    }
  }
`;

export const distinctUsersQuery = gql`
  query distinctUsers($where: JSON!, $field: String!) {
    distinctUsers(where: $where, field: $field)
  }
`;

export const countUsersQuery = gql`
  query countUsers($where: JSON!) {
    countUsers(where: $where)
  }
`;

export const existsUserQuery = gql`
  query existsUser($where: JSON!) {
    existsUser(where: $where)
  }
`;

export const listUsersQuery = gql`
  query listUsers {
    listUsers {
      _id
      text
      descriptiveText
    }
  }
`;

export const validateUserQuery = gql`
  query validateUser(
    $specific: Boolean
    $scenarios: [String!]!
    $input: JSON!
  ) {
    validateUser(specific: $specific, scenarios: $scenarios, input: $input) {
      errors
      status
    }
  }
`;
