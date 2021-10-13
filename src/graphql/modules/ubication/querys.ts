import gql from 'graphql-tag';

export const getAllUbicationsQuery = gql`
  query getAllUbications {
    getAllUbications {
      id
      ubication
    }
  }
`;
