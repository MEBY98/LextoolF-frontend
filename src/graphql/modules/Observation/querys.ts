import gql from 'graphql-tag';

export const getAllUseInformationObservationsQuery = gql`
  query getAllUseInformationObservations {
    getAllUseInformationObservations {
      id
      name
      tab
      descriptorsTypes {
        id
        name
        tab
        inputType
        multiInput
        descriptors {
          id
          description
        }
      }
    }
  }
`;

export const getAllOrderLemmaObservationsQuery = gql`
  query getAllOrderLemmaObservations {
    getAllOrderLemmaObservations {
      id
      name
      tab
      descriptorsTypes {
        id
        name
        tab
        inputType
        multiInput
        descriptors {
          id
          description
        }
      }
    }
  }
`;
