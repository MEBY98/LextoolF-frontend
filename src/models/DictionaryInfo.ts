import { Author } from './Author';

export class DictionaryInfo {
  id: string;
  siglas: string;
  name: string;
  author: Author[];
  annoOfPublication: number;
  reference: string;
}

export class DictionaryInfoToEdit {
  id: string;
  siglas: string;
  name: string;
  author: string[];
  annoOfPublication: number;
  reference: string;
}

export class NewDictionaryInfo {
  siglas: string;
  name: string;
  author: string[];
  annoOfPublication: number;
  reference: string;
}
