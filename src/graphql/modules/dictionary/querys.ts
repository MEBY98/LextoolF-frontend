import gql from 'graphql-tag';

export const getAllDictionariesQuery = gql`
  query getAllDictionaries {
    getAllDictionaries {
      id
      dictionaryInfo {
        id
        siglas
      }
      letters
      entries {
        letter
        elements {
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
  }
`;

export const getDictionaryByIDQuery = gql`
  query getDictionaryByID($dictionaryID: String!) {
    getDictionaryByID(dictionaryID: $dictionaryID) {
      id
      dictionaryInfo {
        id
        name
        siglas
        annoOfPublication
        reference
        author {
          id
          name
          siglas
        }
      }
      letters
      entries {
        id
        letter
        context
        elements {
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
  }
`;
