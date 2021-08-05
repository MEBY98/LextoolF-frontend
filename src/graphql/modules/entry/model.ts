import { createEntryByDictionaryIDMutation } from './mutations';
import { apolloClient } from '@/graphql/apolloProvider';
import { apolloMutate } from '@/graphql/apollo';

export class UF {
  static createUF(dictionaryID, newEntry) {
    return apolloMutate(
      createEntryByDictionaryIDMutation,
      { dictionaryID, newEntry },
      null,
      null
    );
  }
}
