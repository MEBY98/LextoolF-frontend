import { apolloQuery, apolloMutate } from '@/graphql/apollo';
import { FetchPolicy, apolloClient } from '@/graphql/apolloProvider';
import { getAllUbicationsQuery } from './querys';
import { CreateUbicationMutation, EditUbicationMutation } from './mutations';

export class Ubication {
  static getAllUbications() {
    return apolloQuery(
      getAllUbicationsQuery,
      null,
      FetchPolicy.network_only,
      apolloClient
    );
  }

  static createUbication(newUbication) {
    return apolloMutate(CreateUbicationMutation, { newUbication }, null, null);
  }

  static editUbication(editedUbication) {
    return apolloMutate(EditUbicationMutation, { editedUbication }, null, null);
  }
}
