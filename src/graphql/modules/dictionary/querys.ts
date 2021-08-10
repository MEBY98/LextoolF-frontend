import gql from 'graphql-tag';

export const getDictionaryByIDQuery = gql`
  query getDictionaryByID($dictionaryID: String!) {
    getDictionaryByID(dictionaryID: $dictionaryID) {
      id
      name
      shortName
      author {
        name
        siglas
      }
      annoOfPublication
      reference
      letters
      entries {
        id
        letter
        context
        lemma {
          id
          lemma
          clasification {
            id
            clasification
          }
        }
        UFs {
          id
          UF
          ubication {
            id
            ubication
          }
          generalDescription {
            id
            description
          }
          useInformation {
            anotation
            descriptors {
              id
              description
            }
          }
          orderLemma {
            id
            description
          }
          ContornoDefinition {
            definition {
              definition
              descriptors {
                typeOfDefinition {
                  id
                  description
                }
                relationship {
                  id
                  description
                }
              }
            }
            contorno {
              contorno
              descriptors {
                id
                description
              }
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
            id
            description
          }
        }
        sublemmas {
          id
          sublemma
          clasification {
            id
            clasification
          }
        }
      }
    }
  }
`;
