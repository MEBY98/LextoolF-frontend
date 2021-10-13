import { apolloQuery, apolloMutate } from '@/graphql/apollo';
import { apolloClient, FetchPolicy } from '@/graphql/apolloProvider';
import { getDescriptorByDescriptionQuery } from './querys';
import { editDescriptorMutation } from './mutations';

export class Descriptor {
  static getDescriptorByDescription(description: string) {
    return apolloQuery(
      getDescriptorByDescriptionQuery,
      { description },
      FetchPolicy.network_only,
      apolloClient
    );
  }
  static editDescriptor(editedDescriptor) {
    return apolloMutate(
      editDescriptorMutation,
      { editedDescriptor },
      null,
      null
    );
  }
}
