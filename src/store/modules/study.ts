import { DictionaryStore } from './dictionary';

export class StudyStore {
  id: string;
  name: string;
  initYear: number;
  finalYear: number;
  dictionaries: DictionaryStore[];
}
