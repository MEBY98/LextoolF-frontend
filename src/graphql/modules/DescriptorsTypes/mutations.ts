import gql from 'graphql-tag';

export const createDescriptorByDescriptorTypeMutation = gql`
  mutation createDescriptorByDescriptorType(
    $descriptor: NewDescriptorType!
    $descriptorTypeID: String!
  ) {
    createDescriptorByDescriptorType(
      descriptor: $descriptor
      descriptorTypeID: $descriptorTypeID
    ) {
      id
      description
    }
  }
`;
