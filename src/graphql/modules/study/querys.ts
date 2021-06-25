import gql from 'graphql-tag';

export const getAllStudiesQuery = gql`
  query getAllStudies {
    getAllStudies {
      id
      name
      shortName
      period
      dictionaries {
        id
        name
        shortName
        author {
          name
          siglas
        }
        annoOfPublication
        letters
      }
    }
  }
`;

export const getStudyByIDQuery = gql`
  query getStudyByID($studyID: String!) {
    getStudyByID(studyID: $studyID) {
      id
      name
      shortName
      period
      dictionaries {
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
      }
    }
  }
`;
