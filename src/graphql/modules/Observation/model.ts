import { apolloQuery, apolloMutate } from '@/graphql/apollo';
import { FetchPolicy, apolloClient } from '@/graphql/apolloProvider';
import {
  getAllUseInformationObservationsQuery,
  getAllOrderLemmaObservationsQuery,
} from './querys';

export class Observation {
  static getAllUseInformationObservations() {
    return apolloQuery(
      getAllUseInformationObservationsQuery,
      null,
      FetchPolicy.network_only,
      apolloClient
    );
  }
  static getAllOrderLemmaObservations() {
    return apolloQuery(
      getAllOrderLemmaObservationsQuery,
      null,
      FetchPolicy.network_only,
      apolloClient
    );
  }
}
