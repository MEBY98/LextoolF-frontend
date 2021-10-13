import gql from 'graphql-tag';

export const getObservationsByTabQuery = gql`
  query getObservationsByTab($tab: String!) {
    getObservationsByTab(tab: $tab) {
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
