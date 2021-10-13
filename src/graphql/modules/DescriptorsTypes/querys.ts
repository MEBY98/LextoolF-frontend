import gql from 'graphql-tag';

export const getDescriptorsTypesByTabQuery = gql`
  query getDescriptorsTypesByTab($tab: String!) {
    getDescriptorsTypesByTab(tab: $tab) {
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
