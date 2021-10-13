import gql from 'graphql-tag';

export const getAllAuthorsQuery = gql`
  query getAllAuthors {
    getAllAuthors {
      id
      name
      siglas
    }
  }
`;
