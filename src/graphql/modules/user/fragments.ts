import gql from 'graphql-tag';

export const userFragment = gql`
  fragment userFragment on User {
    __typename
    _id
    email
    name
  }
`;
