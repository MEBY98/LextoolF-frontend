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
      elements {
        id
        element
        clasification
        ubication
        generalDescription {
          tipo
          structure
          conceptualDomain
        }
        orderLemma {
          order
          criteriaOfLematization
          formalStructure
          ubicationOfContorno
          typeOfVariant
          formatOfVariant
          tipographyOfVariant
        }
        useInformation {
          anotation
          position
          format
          tipography
        }
        contornoDefinition {
          definition
          typeOfDefinition
          argumentalSchema
          relationship
          contorno
          typeOfContorno
          positionOfContorno
          formatOfContorno
        }
        example {
          anotation
          typeOfExample
          formatOfExample
          functionOfExample
        }
        paradigmaticInfo {
          typeOfRelationship
          formOfPresentation
          position
        }
      }
    }
  }
`;
