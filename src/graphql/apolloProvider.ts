import { store } from '@/store/store';
import { ApolloLink } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import router from './../router/router';

const cache = new InMemoryCache({
  dataIdFromObject: (obj) => {
    const { __typename, _id } = obj as any;
    if (__typename && _id) {
      return `${__typename}_${_id}`;
    }
    return undefined;
  },
  addTypename: false,
  // fragmentMatcher
});

const httpLink = createHttpLink({
  uri: 'http://localhost:10000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // const token = store.site.token;
  return {
    headers: {
      ...headers,
      // authorization: token ? `Bearer ${token}` : '',
      authorization: '',
    },
  };
});

const defaultOptions: any = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  },
  query: {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
};

export const apolloClient = new ApolloClient({
  connectToDevTools: true,
  link: httpLink,
  cache,
  defaultOptions,
  queryDeduplication: true,
});

export enum FetchPolicy {
  cache_and_network = 'cache-and-network',
  cache_first = 'cache-first',
  cache_only = 'cache-only',
  network_only = 'network-only',
  no_cache = 'no-cache',
  standby = 'standby',
}

export const cache_and_network = 'cache-and-network';
export const cache_first = 'cache-first';
export const cache_only = 'cache-only';
export const network_only = 'network-only';
export const no_cache = 'no-cache';
export const standby = 'standby';
