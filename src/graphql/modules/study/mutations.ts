import gql from 'graphql-tag';

export const deleteStudyByIDMutation = gql`
  mutation deleteStudyByID($studyID: String!) {
    deleteStudyByID(studyID: $studyID) {
      id
      name
      shortName
    }
  }
`;

export const createStudyMutation = gql`
  mutation createStudyMutation($fraseograficStudy: NewfraseograficStudyType!) {
    createStudy(fraseograficStudy: $fraseograficStudy) {
      id
      name
      shortName
      period
      dictionaries
    }
  }
`;

export const editStudyMutation = gql`
  mutation editStudy($newStudy: EditfraseograficStudyType!) {
    editStudy(newStudy: $newStudy) {
      id
      name
      shortName
      period
      dictionaries {
        id
        name
        annoOfPublication
        author {
          name
          siglas
        }
        reference
        letters
        shortName
      }
    }
  }
`;
