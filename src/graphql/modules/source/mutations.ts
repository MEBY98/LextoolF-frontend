import gql from 'graphql-tag';

export const deleteExcelMutation = gql`
  mutation deleteExcel($excelHash: String!) {
    deleteExcel(excelHash: $excelHash)
  }
`;
