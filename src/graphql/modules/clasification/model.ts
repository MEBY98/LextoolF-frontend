import { apolloQuery, apolloMutate } from '@/graphql/apollo';
import { FetchPolicy, apolloClient } from '@/graphql/apolloProvider';
import {
  getAllClasificationsQuery,
  getAllLemmaClasificationsQuery,
  getAllSublemmaClasificationsQuery,
} from './querys';

export class Clasification {
  static getAllClasifications() {
    return apolloQuery(
      getAllClasificationsQuery,
      null,
      FetchPolicy.network_only,
      apolloClient
    );
  }
  static getLemmaClasifications() {
    return apolloQuery(
      getAllLemmaClasificationsQuery,
      null,
      FetchPolicy.network_only,
      apolloClient
    );
  }
  static getSublemmaClasifications() {
    return apolloQuery(
      getAllSublemmaClasificationsQuery,
      null,
      FetchPolicy.network_only,
      apolloClient
    );
  }
}
