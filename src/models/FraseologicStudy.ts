import { NewDictionary, DictionaryToEdit, Dictionary } from './Dictionary';

export class FraseologicStudy {
  id: string;
  name: string;
  initYear: number;
  finalYear: number;
  state: string;
  dictionaries: Dictionary[];
}

export class FraseologicStudyToEdit {
  id: string;
  name: string;
  initYear: number;
  finalYear: number;
  state: string;
  dictionaries: DictionaryToEdit[];
}

export class NewFraseologicStudy {
  name: string;
  initYear: number;
  finalYear: number;
  state: string;
  dictionaries: NewDictionary[];
}
