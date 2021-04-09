import gql from 'graphql-tag';

export const createDictionaryMutation = gql`
  mutation createDictionary($input: CreateDictionaryInput!) {
    createDictionary(input: $input)
  }
`;

export const createManyEntriesMutation = gql`
  mutation createManyEntries($entries: JSON!) {
    createManyEntries(entries: $entries)
  }
`;
