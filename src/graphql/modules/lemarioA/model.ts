import { apolloQuery, apolloMutate } from '@/graphql/apollo';
import {
  findAllEntriesBylemarioIDQuery,
  getLemarioByIDQuery,
  findAllLemariosAQuery,
} from './querys';
import { FetchPolicy, apolloClientA } from '@/graphql/apolloProvider';
import {
  createEntryByLemarioIDMutation,
  createLemarioAMutation,
  deleteLemarioByIDMutation,
  updateLemarioByIDMutation,
} from './mutations';

export class LemarioA {
  static findAllLemariosA() {
    return apolloQuery(
      findAllLemariosAQuery,
      null,
      FetchPolicy.network_only,
      apolloClientA
    );
  }

  static getLemarioByID(lemarioID: String) {
    return apolloQuery(
      getLemarioByIDQuery,
      { lemarioID },
      FetchPolicy.network_only,
      apolloClientA
    );
  }

  static findAllEntriesBylemario(lemarioID: String) {
    return apolloQuery(
      findAllEntriesBylemarioIDQuery,
      { lemarioID },
      FetchPolicy.network_only,
      apolloClientA
    );
  }

  static createLemarioA(createdLemario: any) {
    return apolloMutate(
      createLemarioAMutation,
      { createdLemario: createdLemario },
      null,
      null,
      apolloClientA
    );
  }

  static createEntryByLemarioID(lemarioID: String, newEntry: any) {
    return apolloMutate(
      createEntryByLemarioIDMutation,
      { lemarioID: lemarioID, newEntry: newEntry },
      null,
      null,
      apolloClientA
    );
  }

  static updateLemarioByID(newLemario: any) {
    return apolloMutate(
      updateLemarioByIDMutation,
      { newLemario: newLemario },
      null,
      null,
      apolloClientA
    );
  }

  static deleteLemarioByID(lemarioID: String) {
    return apolloMutate(
      deleteLemarioByIDMutation,
      { lemarioID },
      null,
      null,
      apolloClientA
    );
  }
}
