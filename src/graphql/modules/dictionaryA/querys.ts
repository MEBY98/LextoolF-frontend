import gql from 'graphql-tag';

export const findAllDictionariesAQuery = gql`
  query findAllDictionariesA {
    findAllDictionariesA {
      id
      name
      reference
      description
      state
      letters
    }
  }
`;

export const getDictionaryByAIDQuery = gql`
  query getDictionaryByID($dictionaryID: String!) {
    getDictionaryByID(dictionaryID: $dictionaryID) {
      id
      name
      reference
      letters
      sources {
        id
        name
        ref
        file
      }
      description
      state
    }
  }
`;
