import gql from 'graphql-tag';

export const deleteDictionaryAByIDMutation = gql`
  mutation deleteDictionaryByID($dictionaryID: String!) {
    deleteDictionaryByID(dictionaryID: $dictionaryID) {
      id
      name
      reference
      description
      state
      lemario
    }
  }
`;

export const createDictionaryAMutation = gql`
  mutation createDictionary($createdDictionary: NewDictionaryType!) {
    createDictionary(createdDictionary: $createdDictionary) {
      id
      name
      reference
      sources {
        id
        name
        ref
        file
        letters
      }
      description
      state
    }
  }
`;

export const updateDictionaryAByIDMutation = gql`
  mutation updateDictionaryByID($newDictionary: EditedDictionaryType!) {
    updateDictionaryByID(newDictionary: $newDictionary) {
      id
      name
      reference
      sources {
        id
        name
        ref
        file
        letters
      }
      description
      state
    }
  }
`;

export const addSourcesToDictionaryAMutation = gql`
  mutation addSourcesToDictionary(
    $sourcesIDs: [String]!
    $dictionaryID: String!
  ) {
    addSourcesToDictionary(
      sourcesIDs: $sourcesIDs
      dictionaryID: $dictionaryID
    ) {
      id
      name
      reference
      sources {
        id
        name
        ref
        file
        letters
      }
      description
      state
    }
  }
`;

export const createLemarioByDictionaryIDMutation = gql`
  mutation createLemarioByDictionaryID(
    $dictionaryID: String!
    $newLemario: NewLemarioType!
  ) {
    createLemarioByDictionaryID(
      dictionaryID: $dictionaryID
      newLemario: $newLemario
    ) {
      id
      name
      reference
      description
      state
      sources {
        id
        name
        ref
        file
        letters
      }
      lemario
    }
  }
`;
