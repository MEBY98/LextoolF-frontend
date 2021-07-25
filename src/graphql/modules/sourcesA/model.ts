import { apolloQuery, apolloMutate } from '@/graphql/apollo';
import { findAllSourcesQuery, getSourceByIDQuery } from './querys';
import { FetchPolicy, apolloClientA } from '@/graphql/apolloProvider';
import {
  createSourceMutation,
  deleteSourceByIDMutation,
  updateSourceByIDMutation,
} from './mutations';

export class Sources {
  static findAllSources() {
    return apolloQuery(
      findAllSourcesQuery,
      null,
      FetchPolicy.network_only,
      apolloClientA
    );
  }

  static getSourceByID(sourceID: String) {
    return apolloQuery(
      getSourceByIDQuery,
      { sourceID },
      FetchPolicy.network_only,
      apolloClientA
    );
  }

  static createSource(source: any) {
    return apolloMutate(
      createSourceMutation,
      { source: source },
      null,
      null,
      apolloClientA
    );
  }

  static updateSourceByID(source: any) {
    return apolloMutate(
      updateSourceByIDMutation,
      { source: source },
      null,
      null,
      apolloClientA
    );
  }

  static deleteSourceByID(SourceID: String) {
    return apolloMutate(
      deleteSourceByIDMutation,
      { SourceID },
      null,
      null,
      apolloClientA
    );
  }
}
