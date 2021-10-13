import { apolloQuery } from '@/graphql/apollo';
import { apolloClient, FetchPolicy } from '@/graphql/apolloProvider';
import { getDictionaryByIDQuery, getAllDictionariesQuery } from './querys';

export class Dictionary {
  static getDictionaryByID(dictionaryID: String) {
    return apolloQuery(
      getDictionaryByIDQuery,
      { dictionaryID },
      FetchPolicy.network_only,
      apolloClient
    );
  }
  static getAllDictionaries() {
    return apolloQuery(
      getAllDictionariesQuery,
      null,
      FetchPolicy.network_only,
      apolloClient
    );
  }
}
