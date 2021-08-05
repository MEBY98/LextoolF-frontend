import gql from 'graphql-tag';

export const createEntryByDictionaryIDMutation = gql`
  mutation createEntryByDictionaryID(
    $dictionaryID: String!
    $newEntry: NewEntryType!
  ) {
    createEntryByDictionaryID(
      dictionaryID: $dictionaryID
      newEntry: $newEntry
    ) {
      id
      letter
      context
      lemma {
        id
        clasification {
          id
          clasification
        }
      }
      sublemmas {
        id
        sublemma
        clasification {
          id
          clasification
        }
      }
      UFs {
        id
        UF
      }
    }
  }
`;
