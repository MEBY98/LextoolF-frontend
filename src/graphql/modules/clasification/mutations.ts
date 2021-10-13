import gql from 'graphql-tag';

export const CreateClasificationMutation = gql`
  mutation createClasification($newClasification: NewClasificationtype!) {
    createClasification(newClasification: $newClasification) {
      id
      clasification
    }
  }
`;
export const EditClasificationMutation = gql`
  mutation editClasification($editedClasification: EditedClasificationType!) {
    editClasification(editedClasification: $editedClasification) {
      id
      clasification
    }
  }
`;
