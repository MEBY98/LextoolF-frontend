import gql from 'graphql-tag';

export const editDescriptorMutation = gql`
  mutation editDescriptor($editedDescriptor: DescriptorInputType!) {
    editDescriptor(editedDescriptor: $editedDescriptor) {
      id
      description
    }
  }
`;
