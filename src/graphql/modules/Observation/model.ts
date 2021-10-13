import { apolloQuery } from '@/graphql/apollo';
import { FetchPolicy, apolloClient } from '@/graphql/apolloProvider';
import { getObservationsByTabQuery } from './querys';

export class Observation {
  static getAllUseInformationObservations() {
    return apolloQuery(
      getObservationsByTabQuery,
      { tab: 'UseInformation' },
      FetchPolicy.network_only,
      apolloClient
    );
  }
  static getAllOrderLemmaObservations() {
    return apolloQuery(
      getObservationsByTabQuery,
      { tab: 'OrderLemma' },
      FetchPolicy.network_only,
      apolloClient
    );
  }
}
