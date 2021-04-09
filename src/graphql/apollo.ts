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

// const fetch = require('node-fetch');
// import * as fs from 'fs'
// export const getSchemaTypes = async () => {
//     const results = await fetch(`http://localhost:5000/graphql`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             variables: {},
//             query: `
//           {
//             __schema {
//               types {
//                 kind
//                 name
//                 possibleTypes {
//                   name
//                 }
//               }
//             }
//           }
//         `
//         })
//     })
//     const JSONresult = await results.json()

//     // here we're filtering out any type information unrelated to unions or interfaces
//     const filteredData = JSONresult.data.__schema.types.filter(type => type.possibleTypes !== null);
//     JSONresult.data.__schema.types = filteredData;

//     console.log(JSON.stringify(JSONresult.data));
//     console.log(JSON.parse(JSON.stringify(JSONresult.data)));

//     fs.writeFileSync('../config/fragmentTypes.json', JSON.stringify(JSONresult.data), err => {
//         if (err) {
//             console.error('Error writing fragmentTypes file', err);
//         } else {
//             console.log('Fragment types successfully extracted!');
//         }
//     });
// }
