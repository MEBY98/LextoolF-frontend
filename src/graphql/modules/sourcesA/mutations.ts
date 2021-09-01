import gql from 'graphql-tag';

export const deleteSourceByIDMutation = gql`
  mutation deleteSourceByID($SourceID: String!) {
    deleteSourceByID(SourceID: $SourceID) {
      id
      name
      ref
      file
      type
      subType
      support
      bloque
      theme
      provice_p
      session_p
      magazine_type_p
      URL
      cantMin
      broadcastMedium
      typology
      speaker
      recording_date
      broadcast_date
      dictionaryType
      century
      library_name
      url_location
    }
  }
`;

export const createSourceMutation = gql`
  mutation createSource($source: NewSourcesType!) {
    createSource(source: $source) {
      id
      name
      ref
      file
      type
      subType
      support
      bloque
      theme
      provice_p
      session_p
      magazine_type_p
      URL
      cantMin
      broadcastMedium
      typology
      speaker
      recording_date
      broadcast_date
      dictionaryType
      century
      library_name
      url_location
    }
  }
`;

export const updateSourceByIDMutation = gql`
  mutation updateSourceByID($source: EditedSource!) {
    updateSourceByID(source: $source) {
      id
      name
      ref
      file
      type
      subType
      support
      bloque
      theme
      provice_p
      session_p
      magazine_type_p
      URL
      cantMin
      broadcastMedium
      typology
      speaker
      recording_date
      broadcast_date
      dictionaryType
      century
      library_name
      url_location
    }
  }
`;
