import gql from 'graphql-tag';

export const findAllLemariosAQuery = gql`
  query findAllLemarios {
    findAllLemarios {
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

export const getLemarioByIDQuery = gql`
  query getLemarioByID($lemarioID: String!) {
    getLemarioByID(lemarioID: $lemarioID) {
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

export const findAllEntriesBylemarioIDQuery = gql`
  query findAllEntriesBylemarioID($lemarioID: String!) {
    findAllEntriesBylemarioID(lemarioID: $lemarioID) {
      id
      lemma
      letter
      ref
      context
      UF
      source {
        id
        name
        ref
        file
      }
    }
  }
`;
