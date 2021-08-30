export class OcurrenceRecordStore {
  corpus_treasure: String;
  numAppearance: Number;
  numSources: Number;
  appearances: [Appearence];
  isVariation: Boolean;
  variationUF: String;
}

export class Appearence {
  useContext: String;
  contextSource: String;
}
