import gql from 'graphql-tag';

export const getDescriptorByDescriptionQuery = gql`
  query getDescriptorByDescription($description: String!) {
    getDescriptorByDescription(description: $description) {
      id
      description
    }
  }
`;
