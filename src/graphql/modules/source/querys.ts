import gql from 'graphql-tag';

export const getManyExcelsQuery = gql`
  query getManyExcels {
    getManyExcels
  }
`;

export const generateEntriesQuery = gql`
  query generateEntries($sheetName: String!, $excelHash: String!) {
    generateEntries(sheetName: $sheetName, excelHash: $excelHash)
  }
`;
