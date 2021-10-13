import { apolloQuery, apolloMutate } from '@/graphql/apollo';
import { FetchPolicy, apolloClient } from '@/graphql/apolloProvider';
import { getDescriptorsTypesByTabQuery } from './querys';
import {
  createDescriptorByDescriptorTypeMutation,
  deleteDescriptorByDescriptorTypeMutation,
} from './mutations';

export class DescriptorType {
  static getAllGeneralDescriptionDescriptorsTypes() {
    return apolloQuery(
      getDescriptorsTypesByTabQuery,
      { tab: 'GeneralDescription' },
      FetchPolicy.network_only,
      apolloClient
    );
  }
  static getAllDefinitionDescriptorsTypes() {
    return apolloQuery(
      getDescriptorsTypesByTabQuery,
      { tab: 'Definition' },
      FetchPolicy.network_only,
      apolloClient
    );
  }
  static getAllContornoDescriptorsTypes() {
    return apolloQuery(
      getDescriptorsTypesByTabQuery,
      { tab: 'Contorno' },
      FetchPolicy.network_only,
      apolloClient
    );
  }
  static getAllExampleDescriptorsTypes() {
    return apolloQuery(
      getDescriptorsTypesByTabQuery,
      { tab: 'Example' },
      FetchPolicy.network_only,
      apolloClient
    );
  }
  static getAllParadigmaticInfoDescriptorsTypes() {
    return apolloQuery(
      getDescriptorsTypesByTabQuery,
      { tab: 'ParadigmaticInfo' },
      FetchPolicy.network_only,
      apolloClient
    );
  }
  static createDescriptorByDescriptorType(descriptorTypeID, descriptor) {
    return apolloMutate(
      createDescriptorByDescriptorTypeMutation,
      { descriptorTypeID, descriptor },
      null,
      null
    );
  }
  static deleteDescriptorByDescriptorType(descriptorID, descriptorTypeID) {
    return apolloMutate(
      deleteDescriptorByDescriptorTypeMutation,
      { descriptorID, descriptorTypeID },
      null,
      null
    );
  }
}
