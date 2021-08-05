import gql from 'graphql-tag';

export const deleteLemarioByIDMutation = gql`
  mutation deleteLemarioByID($lemarioID: String!) {
    deleteLemarioByID(lemarioID: $lemarioID) {
      id
      name
      dictionaryType
      entries {
        id
        lemma
        letter
        ref
        context
        UF
        sources {
          id
          name
          ref
          file
        }
      }
    }
  }
`;

export const createLemarioAMutation = gql`
  mutation createLemario($createdLemario: NewLemarioType!) {
    createLemario(createdLemario: $createdLemario) {
      id
      name
      dictionaryType
    }
  }
`;

export const updateLemarioByIDMutation = gql`
  mutation updateLemarioByID($newLemario: EditedLemarioType!) {
    updateLemarioByID(newLemario: $newLemario) {
      id
      name
      dictionaryType
    }
  }
`;

export const createEntryByLemarioIDMutation = gql`
  mutation createEntryByLemarioID(
    $lemarioID: String!
    $newEntry: NewEntryType!
  ) {
    createEntryByLemarioID(lemarioID: $lemarioID, newEntry: $newEntry) {
      id
      lemma
      letter
      ref
      context
      UF
      sources {
        id
        name
        ref
        file
      }
    }
  }
`;
