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
      elements {
        id
        element
        clasification {
          id
          clasification
        }
        ubication {
          id
          ubication
        }
      }
    }
  }
`;

export const deleteEntryByDictionaryIDMutation = gql`
  mutation deleteEntryByDictionaryID(
    $dictionaryID: String!
    $entryID: String!
  ) {
    deleteEntryByDictionaryID(dictionaryID: $dictionaryID, entryID: $entryID)
  }
`;

export const editEntryMutation = gql`
  mutation editEntry($entry: EditedEntryType!) {
    editEntry(entry: $entry) {
      id
      letter
      context
      elements {
        id
        element
        clasification {
          id
          clasification
        }
        ubication {
          id
          ubication
        }
      }
    }
  }
`;
