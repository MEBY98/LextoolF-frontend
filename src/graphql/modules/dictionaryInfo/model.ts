import { apolloMutate, apolloQuery } from '@/graphql/apollo';
import { apolloClient, FetchPolicy } from '@/graphql/apolloProvider';
import { getAllDictionaryInfoQuery } from './querys';
import {
  createDictionaryInfoMutation,
  editDictionaryInfoMutation,
} from './mutation';

export class DictionaryInfo {
  static getAllDictionaryInfo() {
    return apolloQuery(
      getAllDictionaryInfoQuery,
      null,
      FetchPolicy.network_only,
      apolloClient
    );
  }

  static createDictionaryInfo(newDictionaryInfo) {
    return apolloMutate(
      createDictionaryInfoMutation,
      { newDictionaryInfo },
      null,
      null
    );
  }

  static editDictionaryInfo(editedDictionaryInfo) {
    return apolloMutate(
      editDictionaryInfoMutation,
      { editedDictionaryInfo },
      null,
      null
    );
  }
}
