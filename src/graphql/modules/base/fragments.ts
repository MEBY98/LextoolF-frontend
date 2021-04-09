import gql from 'graphql-tag';

export const paginationFragment = gql`
  fragment paginationFragment on Pagination {
    hasNextPage
    totalElements
    lastPage
    nextPage
    previousPage
  }
`;
