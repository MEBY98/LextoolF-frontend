export class DictionaryStore {
  id: String;
  name: String;
  shortName: String;
  author: [Author];
  annoOfPublication: Number;
  reference: String;
  letters: String[];
}

export class Author {
  name: String;
  siglas: String;
}
