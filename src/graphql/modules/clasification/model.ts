import { apolloQuery, apolloMutate } from '@/graphql/apollo';
import { FetchPolicy, apolloClient } from '@/graphql/apolloProvider';
import { getAllClasificationsQuery } from './querys';
import {
  CreateClasificationMutation,
  EditClasificationMutation,
} from './mutations';

export class Clasification {
  static getAllClasifications() {
    return apolloQuery(
      getAllClasificationsQuery,
      null,
      FetchPolicy.network_only,
      apolloClient
    );
  }
  static createClasification(newClasification) {
    return apolloMutate(
      CreateClasificationMutation,
      { newClasification },
      null,
      null
    );
  }
  static editClasification(editedClasification) {
    return apolloMutate(
      EditClasificationMutation,
      { editedClasification },
      null,
      null
    );
  }
}
