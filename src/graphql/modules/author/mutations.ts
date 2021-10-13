import gql from 'graphql-tag';
export const createAuthorMutation = gql`
  mutation createAuthor($newAuthor: NewAuthortype!) {
    createAuthor(newAuthor: $newAuthor) {
      id
      name
      siglas
    }
  }
`;
export const editAuthorMutation = gql`
  mutation editAuthor($editedAuthor: EditedAuthorType!) {
    editAuthor(editedAuthor: $editedAuthor) {
      id
      name
      siglas
    }
  }
`;
