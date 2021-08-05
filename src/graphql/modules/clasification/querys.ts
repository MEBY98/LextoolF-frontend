import gql from 'graphql-tag';

export const getAllClasificationsQuery = gql`
  query getAllClasifications {
    getAllClasifications {
      id
      clasification
    }
  }
`;

export const getAllLemmaClasificationsQuery = gql`
  query getAllLemmaClasifications {
    getAllLemmaClasifications {
      id
      clasification
    }
  }
`;

export const getAllSublemmaClasificationsQuery = gql`
  query getAllSublemmaClasifications {
    getAllSublemmaClasifications {
      id
      clasification
    }
  }
`;
