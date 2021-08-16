import gql from 'graphql-tag';

export const deleteSourceByIDMutation = gql`
  mutation deleteSourceByID($SourceID: String!) {
    deleteSourceByID(SourceID: $SourceID) {
      id
      name
      type
      ref
      subType
      file
    }
  }
`;

export const createSourceMutation = gql`
  mutation createSource($source: NewSourcesType!) {
    createSource(source: $source) {
      id
      name
      type
      ref
      subType
      file
    }
  }
`;

export const updateSourceByIDMutation = gql`
  mutation updateSourceByID($source: EditedSource!) {
    updateSourceByID(source: $source) {
      id
      name
      type
      subType
      file
    }
  }
`;
