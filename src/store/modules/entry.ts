export class EntryStore {
  id: String;
  letter: String;
  context: [String];
  lemma: LemmaStore;
  sublemmas: [SublemmaStore];
  UFs: [UFStore];
}

export class UbicationStore {
  id: String;
  ubication: String;
  clasifications: [ClasificationStore];
}

export class ClasificationStore {
  id: String;
  clasification: String;
}

export class UFStore {
  id: String;
  UF: String;
  // descriptors: [[String]];
}

export class LemmaStore {
  id: String;
  lemma: String;
  clasification: String;
}

export class SublemmaStore {
  id: String;
  sublemma: String;
  clasification: String;
}
