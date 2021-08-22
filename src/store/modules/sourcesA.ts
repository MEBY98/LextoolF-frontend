export class SourcesStore {
  id: String;
  name: String;
  file: String;
  ref: String;
  type: String;
  subType: String;

  // linguisticas libro o prensa
  bloque: String;
  support: String;
  theme: String;
  publication: String;

  //linguisticas internet
  URL: String;

  //linguisticas audio o video
  cantMin: String;
  broadcastMedium: String;
  typology: String;
  speaker: String;

  //metalinguisticas
  dictionaryType: String;
  century: String;
}
