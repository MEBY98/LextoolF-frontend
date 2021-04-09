import Vue from 'vue';
// import VueApollo from 'vue-apollo';
// import {
//     apolloClient
// } from '../graphql/apolloProvider';

// const handler = (apolloError) => {
//     console.log(apolloError, 'apollo Error in error Handler');
//     const {
//         graphQLErrors,
//         networkError
//     } = apolloError

//     if (networkError) {
//         console.log('Error en la red. No pudo conectarse con el servidor', networkError);
//     }
//     if (graphQLErrors) {
//         for (let err of graphQLErrors) {
//             console.dir(err, 'Error intentando buscar datos');
//             if (err.name === 'AuthenticationError') {
//                 console.log('AuthenticationError');
//                 console.log(err);
//             }
//         }
//     }
// }

// export default new VueApollo({
//     defaultClient: apolloClient,
//     defaultOptions: {
//         $error: handler
//     },
//     errorHandler: handler
// });
