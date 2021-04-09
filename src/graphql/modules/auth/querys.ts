import gql from 'graphql-tag';

export const LOGIN_QUERY = gql`
  query login($input: LoginInputDto!) {
    login(input: $input) {
      user {
        _id
        email
        name
        imgProfile
        __typename
      }
      token
      expiresIn
    }
  }
`;
