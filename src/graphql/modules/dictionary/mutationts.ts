import gql from 'graphql-tag';

export const createDictionaryByStudyIDMutation = gql`
  mutation createDictionaryByStudyID(
    $studyID: String!
    $newDictionary: NewDictionaryType!
  ) {
    createDictionaryByStudyID(
      studyID: $studyID
      newDictionary: $newDictionary
    ) {
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
      entries
    }
  }
`;
