import gql from 'graphql-tag';

export const GetAllElementsQuery = gql`
  query getAllElements {
    getAllElements {
      id
      element
      clasification {
        id
        clasification
      }
      ubication {
        id
        ubication
      }
      generalDescription {
        tipo {
          id
          description
        }
        structure {
          id
          description
        }
        conceptualDomain {
          id
          description
        }
      }
      orderLemma {
        order {
          id
          description
        }
        criteriaOfLematization {
          id
          description
        }
        formalStructure {
          id
          description
        }
        ubicationOfContorno {
          id
          description
        }
        typeOfVariant {
          id
          description
        }
        formatOfVariant {
          id
          description
        }
        tipographyOfVariant {
          id
          description
        }
      }
      useInformation {
        anotation
        position {
          id
          description
        }
        format {
          id
          description
        }
        tipography {
          id
          description
        }
      }
      contornoDefinition {
        definition
        typeOfDefinition {
          id
          description
        }
        argumentalSchema {
          id
          description
        }
        relationship {
          id
          description
        }
        contorno
        typeOfContorno {
          id
          description
        }
        positionOfContorno {
          id
          description
        }
        formatOfContorno {
          id
          description
        }
      }
      example {
        anotation
        typeOfExample {
          id
          description
        }
        formatOfExample {
          id
          description
        }
        functionOfExample {
          id
          description
        }
      }
      paradigmaticInfo {
        typeOfRelationship {
          id
          description
        }
        formOfPresentation {
          id
          description
        }
        position {
          id
          description
        }
      }
    }
  }
`;
