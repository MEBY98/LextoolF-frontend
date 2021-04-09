import { store } from '@/store/store';
import { ApolloLink } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getOperationAST } from 'graphql';

import router from './../router/router';

const cache = new InMemoryCache({
  dataIdFromObject: (obj) => {
    const { __typename, _id } = obj as any;
    if (__typename && _id) {
      return `${__typename}_${_id}`;
    }
    return undefined;
  },
  // fragmentMatcher
});

const httpLink = createHttpLink({
  uri: 'http://localhost:10000/graphql',
});

const sourceHttpLink = createHttpLink({
  uri: 'http://localhost:12000/graphql',
});

const entryHttpLink = createHttpLink({
  uri: 'http://localhost:11000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = store.site.token;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const responseLogger = new ApolloLink((operation, forward) => {
  return forward(operation).map((result) => {
    // if (result.errors) {
    //   let status = result.errors[0].extensions?.exception?.status;
    //   if (status == 403 || status == 401 || status == 404) {
    //     router.push({ name: '404' });
    //   }
    // }
    return result;
  });
});

const linkWithAuth = ApolloLink.from([responseLogger, authLink, httpLink]); // TODO: Verificar el http link
const sourcelinkWithAuth = ApolloLink.from([
  responseLogger,
  authLink,
  sourceHttpLink,
]); // TODO: Verificar el http link

const webSocketLink = new WebSocketLink({
  // Para las subscriptions
  uri: `ws://localhost:5000/subscriptions`,
  options: {
    lazy: true,
    reconnect: true,
    connectionParams: () => ({
      authToken: store.site.token,
    }),
    reconnectionAttempts: 20,
    connectionCallback: (error: any, result: any) => {
      if (error) {
        console.log(error, 'connectionCallback error');
      }
    },
  },
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
  link: ApolloLink.split(
    (operation) => {
      const operationAST = getOperationAST(
        operation.query,
        operation.operationName
      );
      return !!operationAST && operationAST.operation === 'subscription';
    },
    webSocketLink,
    linkWithAuth
  ),
  cache,
  defaultOptions,
  queryDeduplication: true,
});

export const apolloSourceClient = new ApolloClient({
  connectToDevTools: true,
  link: ApolloLink.split(
    (operation) => {
      const operationAST = getOperationAST(
        operation.query,
        operation.operationName
      );
      return !!operationAST && operationAST.operation === 'subscription';
    },
    webSocketLink,
    sourcelinkWithAuth
  ),
  cache,
  defaultOptions,
  queryDeduplication: true,
});

export const apolloEntryClient = new ApolloClient({
  connectToDevTools: true,
  link: ApolloLink.split(
    (operation) => {
      const operationAST = getOperationAST(
        operation.query,
        operation.operationName
      );
      return !!operationAST && operationAST.operation === 'subscription';
    },
    webSocketLink,
    entryHttpLink
  ),
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
