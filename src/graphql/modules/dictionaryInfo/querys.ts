import gql from 'graphql-tag';

export const getAllDictionaryInfoQuery = gql`
  query getAllDictionaryInfo {
    getAllDictionaryInfo {
      id
      name
      siglas
      author {
        id
        name
        siglas
      }
      annoOfPublication
      reference
    }
  }
`;
