import { LemarioStore } from './lemarioA';

export class DictionaryAStore {
  id: String;
  name: String;
  reference: String;
  sources: String[];
  description: String;
  state: String;
  lemario: LemarioStore;
}
