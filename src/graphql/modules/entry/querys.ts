import gql from 'graphql-tag';

export const getEntryUbicationsByIDQuery = gql`
  query getEntryUbicationsByID($entryID: String!) {
    getEntryUbicationsByID(entryID: $entryID)
  }
`;

export const getEntryByIDQuery = gql`
  query getEntryByID($entryID: String!) {
    getEntryByID(entryID: $entryID) {
      id
      letter
      context
      lemma {
        id
        lemma
        clasification
      }
      sublemmas {
        id
        sublemma
        clasification
      }
      UFs {
        id
        UF
        ubication
        generalDescription
        useInformation {
          anotation
          descriptors
        }
        orderLemma
        ContornoDefinition {
          definition {
            definition
            descriptors {
              typeOfDefinition
              relationship
            }
          }
          contorno {
            contorno
            descriptors
          }
        }
        example {
          anotation
          typeOfExample
          formatOfExample
          functionOfExample
        }
        paradigmaticInfo
      }
    }
  }
`;
