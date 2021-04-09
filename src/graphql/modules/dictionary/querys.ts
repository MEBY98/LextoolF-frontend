import gql from 'graphql-tag';

export const getElementsQuery = gql`
  query getElements {
    getElements {
      pagination {
        totalElements
      }
      elements {
        _id
        name
      }
    }
  }
`;

export const getManyTemplatesQuery = gql`
  query getManyTemplates {
    getManyTemplates {
      _id
      elements {
        _id
        required
        element
      }
      name
    }
  }
`;
