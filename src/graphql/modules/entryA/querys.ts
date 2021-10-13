import gql from 'graphql-tag';

export const findAllEntriesQuery = gql`
  query findAllEntries {
    findAllEntries {
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

export const getEntryByIDQuery = gql`
  query getEntryByID($entryID: String!) {
    getEntryByID(entryID: $entryID) {
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

export const getAllEntriesBySourceIDQuery = gql`
  query getAllEntriesBySourceID($sourceID: String!) {
    getAllEntriesBySourceID(sourceID: $sourceID) {
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

export const findAllEntriesWhithSourceRefQuery = gql`
  query findAllEntriesWhithSourceRef {
    findAllEntriesWhithSourceRef {
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
