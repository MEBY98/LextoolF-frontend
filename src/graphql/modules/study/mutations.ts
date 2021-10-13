import gql from 'graphql-tag';

export const deleteStudyByIDMutation = gql`
  mutation deleteStudyByID($studyID: String!) {
    deleteStudyByID(studyID: $studyID)
  }
`;

export const createStudyMutation = gql`
  mutation createStudy($fraseograficStudy: NewfraseograficStudyType!) {
    createStudy(fraseograficStudy: $fraseograficStudy) {
      id
      name
      initYear
      finalYear
      state
      dictionaries {
        id
        letters
        entries
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
      }
    }
  }
`;

export const editStudyMutation = gql`
  mutation editStudy($newStudy: EditedfraseograficStudyType!) {
    editStudy(newStudy: $newStudy) {
      id
      name
      initYear
      finalYear
      state
      dictionaries {
        id
        letters
        entries
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
      }
    }
  }
`;
