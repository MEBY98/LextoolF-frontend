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

export const deleteDescriptorByDescriptorTypeMutation = gql`
  mutation deleteDescriptorByDescriptorType(
    $descriptorID: String!
    $descriptorTypeID: String!
  ) {
    deleteDescriptorByDescriptorType(
      descriptorID: $descriptorID
      descriptorTypeID: $descriptorTypeID
    ) {
      id
      name
      tab
      descriptors {
        id
        description
      }
      inputType
      multiInput
    }
  }
`;
