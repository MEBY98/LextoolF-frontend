import { apolloQuery, apolloMutate } from '@/graphql/apollo';
import { FetchPolicy, apolloClient } from '@/graphql/apolloProvider';
import { getAllUbicationsQuery } from './querys';

export class Ubication {
  static getAllUbications() {
    return apolloQuery(
      getAllUbicationsQuery,
      null,
      FetchPolicy.network_only,
      apolloClient
    );
  }
}
