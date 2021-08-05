import gql from 'graphql-tag';

export const getAllGeneralDescriptionDescriptorsTypesQuery = gql`
  query getAllGeneralDescriptionDescriptorsTypes {
    getAllGeneralDescriptionDescriptorsTypes {
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

export const getAllDefinitionDescriptorsTypesQuery = gql`
  query getAllDefinitionDescriptorsTypes {
    getAllDefinitionDescriptorsTypes {
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

export const getAllContornoDescriptorsTypesQuery = gql`
  query getAllContornoDescriptorsTypes {
    getAllContornoDescriptorsTypes {
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

export const getAllExampleDescriptorsTypesQuery = gql`
  query getAllExampleDescriptorsTypes {
    getAllExampleDescriptorsTypes {
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

export const getAllParadigmaticInfoDescriptorsTypesQuery = gql`
  query getAllParadigmaticInfoDescriptorsTypes {
    getAllParadigmaticInfoDescriptorsTypes {
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
