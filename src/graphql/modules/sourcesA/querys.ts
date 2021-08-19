import gql from 'graphql-tag';

export const findAllSourcesQuery = gql`
  query findAllSources {
    findAllSources {
      id
      name
      ref
      file
      type
      subType
      support
      bloque
      theme
      publication
      URL
      cantMin
      broadcastMedium
      typology
      speaker
      dictionaryType
      century
    }
  }
`;

export const getSourceByIDQuery = gql`
  query getSourceByID($sourceID: String!) {
    getSourceByID(sourceID: $sourceID) {
      id
      name
      ref
      file
      type
      subType
      support
      bloque
      theme
      publication
      URL
      cantMin
      broadcastMedium
      typology
      speaker
      dictionaryType
      century
    }
  }
`;
