import gql from 'graphql-tag';

export const deleteEntryByIDMutation = gql`
  mutation deleteEntryByID($entryID: String!) {
    deleteEntryByID(entryID: $entryID) {
      id
      lemma
      letter
      context
      UF
      source
      selected
    }
  }
`;

export const createEntryMutation = gql`
  mutation createEntry($createdEntry: NewEntryType!) {
    createEntry(createdEntry: $createdEntry) {
      id
      lemma
      letter
      context
      UF
      source
      selected
    }
  }
`;

export const updateEntryByIDMutation = gql`
  mutation updateEntryByID($newEntry: EditedEntryType!) {
    updateEntryByID(newEntry: $newEntry) {
      id
      lemma
      letter
      context
      UF
      source
      selected
    }
  }
`;
