import { DictionaryStore } from './dictionary';

export class StudyStore {
  id: String;
  name: String;
  dictionaries: [DictionaryStore];
}
