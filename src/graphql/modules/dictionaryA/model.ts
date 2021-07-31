import { apolloQuery, apolloMutate } from '@/graphql/apollo';
import { findAllDictionariesAQuery, getDictionaryByAIDQuery } from './querys';
import { FetchPolicy, apolloClientA } from '@/graphql/apolloProvider';
import {
  createDictionaryAMutation,
  deleteDictionaryAByIDMutation,
  updateDictionaryAByIDMutation,
  addSourcesToDictionaryAMutation,
} from './mutations';

export class DictionaryA {
  static findAllDictionariesA() {
    return apolloQuery(
      findAllDictionariesAQuery,
      null,
      FetchPolicy.network_only,
      apolloClientA
    );
  }

  static getDictionaryByAID(dictionaryID: String) {
    return apolloQuery(
      getDictionaryByAIDQuery,
      { dictionaryID },
      FetchPolicy.network_only,
      apolloClientA
    );
  }

  static createDictionaryA(createdDictionary: any) {
    return apolloMutate(
      createDictionaryAMutation,
      { createdDictionary: createdDictionary },
      null,
      null,
      apolloClientA
    );
  }

  static addSourcesToDictionaryA(sourcesIDs: any, dictionaryID: any) {
    return apolloMutate(
      addSourcesToDictionaryAMutation,
      { sourcesIDs: sourcesIDs, dictionaryID: dictionaryID },
      null,
      null,
      apolloClientA
    );
  }

  static updateDictionaryAByID(newDictionary: any) {
    return apolloMutate(
      updateDictionaryAByIDMutation,
      { newDictionary: newDictionary },
      null,
      null,
      apolloClientA
    );
  }

  static deleteDictionaryAByID(dictionaryID: String) {
    return apolloMutate(
      deleteDictionaryAByIDMutation,
      { dictionaryID },
      null,
      null,
      apolloClientA
    );
  }
}
