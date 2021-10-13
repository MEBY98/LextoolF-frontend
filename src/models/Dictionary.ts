import { DictionaryInfo } from './DictionaryInfo';
import { Entry } from './Entry';

export class Dictionary {
  id: string;
  dictionaryInfo: DictionaryInfo;
  letters: string[];
  entries: string[];
}

export class DictionaryEntriesDescriptorsAsString {
  id: string;
  dictionaryInfo: DictionaryInfo;
  letters: string[];
  entries: Entry[];
}

export class NewDictionary {
  dictionaryInfo: string;
  letters: string[];
  entries: string[];
}

export class DictionaryToEdit {
  id?: string;
  letters: string[];
  entries: string[];
  dictionaryInfo: string;
}
