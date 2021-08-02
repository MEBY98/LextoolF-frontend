import gql from 'graphql-tag';

export const findAllDictionariesAQuery = gql`
  query findAllDictionariesA {
    findAllDictionariesA {
      id
      name
      reference
      description
      state
      lemario
    }
  }
`;

export const getDictionaryByAIDQuery = gql`
  query getDictionaryByID($dictionaryID: String!) {
    getDictionaryByID(dictionaryID: $dictionaryID) {
      id
      name
      reference
      sources {
        id
        name
        ref
        file
      }
      description
      state
      lemario
    }
  }
`;

export const getLemarioByDictionaryIDQuery = gql`
  query getLemarioByDictionaryID($dictionaryID: String!) {
    getLemarioByDictionaryID(dictionaryID: $dictionaryID) {
      id
      name
      dictionaryType
      entries {
        id
        lemma
        letter
        ref
        context
        source {
          id
          name
          ref
          file
        }
      }
    }
  }
`;
