import {
  createEntryByDictionaryIDMutation,
  editEntryMutation,
} from './mutations';
import { apolloClient, FetchPolicy } from '@/graphql/apolloProvider';
import { apolloMutate, apolloQuery } from '@/graphql/apollo';
import { getEntryByIDQuery, getEntryUbicationsByIDQuery } from './querys';

export class UF {
  static createUF(dictionaryID, newEntry) {
    return apolloMutate(
      createEntryByDictionaryIDMutation,
      { dictionaryID, newEntry },
      null,
      null
    );
  }
  static editEntry(entry) {
    return apolloMutate(editEntryMutation, { entry }, null, null);
  }
  static getEntryByID(entryID: String) {
    return apolloQuery(
      getEntryByIDQuery,
      { entryID },
      FetchPolicy.network_only,
      apolloClient
    );
  }
  static getEntryUbicationsByID(entryID: String) {
    return apolloQuery(
      getEntryUbicationsByIDQuery,
      { entryID },
      FetchPolicy.network_only,
      apolloClient
    );
  }
}
