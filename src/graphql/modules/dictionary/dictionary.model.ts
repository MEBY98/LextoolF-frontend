import { apolloMutate, apolloQuery } from './../../apollo';
import { apolloEntryClient } from './../../apolloProvider';
import {
  createDictionaryMutation,
  createManyEntriesMutation,
} from './mutations';
import { getElementsQuery, getManyTemplatesQuery } from './querys';

export class Dictionary {
  static createDictionary(input) {
    return apolloMutate(createDictionaryMutation, { input });
  }

  static getElements() {
    return apolloQuery(getElementsQuery);
  }

  static getManyTemplates() {
    return apolloQuery(getManyTemplatesQuery);
  }

  static createManyEntries(entries) {
    return apolloMutate(
      createManyEntriesMutation,
      { entries },
      null,
      null,
      apolloEntryClient
    );
  }
}

export const letters = [
  { title: 'A', key: 'A' },
  { title: 'B', key: 'B' },
  { title: 'C', key: 'C' },
  { title: 'D', key: 'D' },
  { title: 'E', key: 'E' },
  { title: 'F', key: 'F' },
  { title: 'G', key: 'G' },
  { title: 'H', key: 'H' },
  { title: 'I', key: 'I' },
  { title: 'J', key: 'J' },
  { title: 'K', key: 'K' },
  { title: 'L', key: 'L' },
  { title: 'M', key: 'M' },
  { title: 'N', key: 'N' },
  { title: 'Ñ', key: 'Ñ' },
  { title: 'O', key: 'O' },
  { title: 'P', key: 'P' },
  { title: 'Q', key: 'Q' },
  { title: 'R', key: 'R' },
  { title: 'S', key: 'S' },
  { title: 'T', key: 'T' },
  { title: 'U', key: 'U' },
  { title: 'V', key: 'V' },
  { title: 'W', key: 'W' },
  { title: 'X', key: 'X' },
  { title: 'Y', key: 'Y' },
  { title: 'Z', key: 'Z' },
];
