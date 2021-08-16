import gql from 'graphql-tag';

export const findAllSourcesQuery = gql`
  query findAllSources {
    findAllSources {
      id
      name
      file
      ref
      type
      subType
    }
  }
`;

export const getSourceByIDQuery = gql`
  query getSourceByID($sourceID: String!) {
    getSourceByID(sourceID: $sourceID) {
      id
      name
      type
      ref
      subType
      file
    }
  }
`;
