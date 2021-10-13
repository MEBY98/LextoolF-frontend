import gql from 'graphql-tag';

export const getAllStudiesQuery = gql`
  query getAllStudies {
    getAllStudies {
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

export const getStudyByIDQuery = gql`
  query getStudyByID($studyID: String!) {
    getStudyByID(studyID: $studyID) {
      id
      name
      initYear
      finalYear
      state
      dictionaries {
        id
        letters
        dictionaryInfo
        entries
      }
    }
  }
`;

export const getDictionariesInfoByIDQuery = gql`
  query getDictionariesInfoByID($studyID: String!) {
    getDictionariesInfoByID(studyID: $studyID) {
      id
      name
      siglas
      author {
        id
        name
        siglas
      }
      annoOfPublication
      reference
    }
  }
`;
