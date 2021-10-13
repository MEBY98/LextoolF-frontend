import gql from 'graphql-tag';

export const CreateUbicationMutation = gql`
  mutation createUbication($newUbication: NewUbicationtype!) {
    createUbication(newUbication: $newUbication) {
      id
      ubication
    }
  }
`;

export const EditUbicationMutation = gql`
  mutation editUbication($editedUbication: EditedUbicationType!) {
    editUbication(editedUbication: $editedUbication) {
      id
      ubication
    }
  }
`;
