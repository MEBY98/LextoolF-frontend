import { apolloClient, FetchPolicy } from '@/graphql/apolloProvider';
import { apolloQuery } from '@/graphql/apollo';
import { GetAllElementsQuery } from './querys';

export class Element {
  static getAllElements() {
    return apolloQuery(
      GetAllElementsQuery,
      null,
      FetchPolicy.network_only,
      apolloClient
    );
  }
}
