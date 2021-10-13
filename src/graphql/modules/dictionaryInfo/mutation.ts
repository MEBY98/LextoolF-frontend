import gql from 'graphql-tag';
export const createDictionaryInfoMutation = gql`
  mutation createDictionaryInfo($newDictionaryInfo: NewDictionaryInfotype!) {
    createDictionaryInfo(newDictionaryInfo: $newDictionaryInfo) {
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

export const editDictionaryInfoMutation = gql`
  mutation editDictionaryInfo(
    $editedDictionaryInfo: EditedDictionaryInfotype!
  ) {
    editDictionaryInfo(editedDictionaryInfo: $editedDictionaryInfo) {
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
