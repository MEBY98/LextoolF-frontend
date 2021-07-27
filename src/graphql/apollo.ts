import { DocumentNode } from 'graphql';
import { apolloClient, FetchPolicy } from './apolloProvider';
import { MutationUpdaterFn } from 'apollo-boost';

export const apolloMutate = (
  mutation: DocumentNode,
  variables = {},
  optimisticResponse?: any,
  update?: MutationUpdaterFn,
  client?
) => {
  let useClient = client ?? apolloClient;
  return useClient.mutate({
    mutation,
    variables,
    optimisticResponse,
    update,
  });
};

export const apolloWatchQuery = (
  query: DocumentNode,
  variables = {},
  fetchPolicy: FetchPolicy = FetchPolicy.cache_and_network,
  client?
) => {
  let useClient = client ?? apolloClient;
  return useClient.watchQuery({
    query,
    variables,
    fetchPolicy,
  });
};

export const apolloQuery = (
  query: DocumentNode,
  variables = {},
  fetchPolicy: FetchPolicy = FetchPolicy.cache_first,
  client?
) => {
  const policy: any = fetchPolicy;
  let useClient = client ?? apolloClient;

  return useClient.query({
    query,
    variables,
    fetchPolicy: policy,
  });
};
export const apolloSubscription = (query: DocumentNode, variables = {}) => {
  return apolloClient.subscribe({
    query,
    variables,
  });
};
