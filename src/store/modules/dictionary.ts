import { EntryStore } from './entry';
import { DictionaryInfoStore } from './dictionaryInfo';

export class DictionaryStore {
  id: string;
  dictionaryInfo: DictionaryInfoStore;
  letters: string[];
  entries: EntryStore[];
}
