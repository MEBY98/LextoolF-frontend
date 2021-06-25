import { DictionaryStore } from './dictionary';

export class StudyStore {
  id: String;
  name: String;
  shortName: String;
  dictionaries: [DictionaryStore];
}
