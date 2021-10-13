import gql from 'graphql-tag';

export const getAllClasificationsQuery = gql`
  query getAllClasifications {
    getAllClasifications {
      id
      clasification
    }
  }
`;
