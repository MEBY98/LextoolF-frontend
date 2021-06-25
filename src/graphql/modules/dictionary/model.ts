import { apolloMutate, apolloQuery } from '@/graphql/apollo';
import { createDictionaryByStudyIDMutation } from './mutationts';
import { apolloClient, FetchPolicy } from '@/graphql/apolloProvider';
import { getDictionaryByIDQuery } from './querys';

export class Dictionary {
  static createDictionaryByStudyID(studyID: String, newDictionary: any) {
    return apolloMutate(
      createDictionaryByStudyIDMutation,
      { studyID, newDictionary },
      null,
      null,
      apolloClient
    );
  }

  static getDictionaryByID(dictionaryID: String) {
    return apolloQuery(
      getDictionaryByIDQuery,
      { dictionaryID },
      FetchPolicy.network_only,
      apolloClient
    );
  }
}
