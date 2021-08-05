import { apolloQuery, apolloMutate } from '@/graphql/apollo';
import { FetchPolicy, apolloClient } from '@/graphql/apolloProvider';
import {
  getAllGeneralDescriptionDescriptorsTypesQuery,
  getAllContornoDescriptorsTypesQuery,
  getAllDefinitionDescriptorsTypesQuery,
  getAllExampleDescriptorsTypesQuery,
  getAllParadigmaticInfoDescriptorsTypesQuery,
} from './querys';
import { createDescriptorByDescriptorTypeMutation } from './mutations';

export class DescriptorType {
  static getAllGeneralDescriptionDescriptorsTypes() {
    return apolloQuery(
      getAllGeneralDescriptionDescriptorsTypesQuery,
      null,
      FetchPolicy.network_only,
      apolloClient
    );
  }
  static getAllDefinitionDescriptorsTypes() {
    return apolloQuery(
      getAllDefinitionDescriptorsTypesQuery,
      null,
      FetchPolicy.network_only,
      apolloClient
    );
  }
  static getAllContornoDescriptorsTypes() {
    return apolloQuery(
      getAllContornoDescriptorsTypesQuery,
      null,
      FetchPolicy.network_only,
      apolloClient
    );
  }
  static getAllExampleDescriptorsTypes() {
    return apolloQuery(
      getAllExampleDescriptorsTypesQuery,
      null,
      FetchPolicy.network_only,
      apolloClient
    );
  }
  static getAllParadigmaticInfoDescriptorsTypes() {
    return apolloQuery(
      getAllParadigmaticInfoDescriptorsTypesQuery,
      null,
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
}
