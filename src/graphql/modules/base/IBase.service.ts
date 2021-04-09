import { UseQueryOptions } from '@vue/apollo-composable';
import {
  Response,
  GetManyResponse,
  UpdateManyResult,
  CountResponse,
  ExistsResponse,
  DistinctResponse,
  ValidateResult,
  ListResponse,
} from './interfaces/returnsInterfaces';
import { GetOneInput } from './interfaces/getOneInput';
import { GetManyInput } from './interfaces/getManyInput';
import { MutationUpdaterFn } from 'apollo-boost';
import { FetchPolicy } from '@/graphql/apolloProvider';

export interface IBaseService<M> {
  getById(id: string, fetchPolicy?: FetchPolicy): Promise<Response<M>>;
  getOne(input: GetOneInput, fetchPolicy?: FetchPolicy): Promise<Response<M>>;
  getMany(
    getManyInput: GetManyInput,
    fetchPolicy?: FetchPolicy
  ): Promise<GetManyResponse<M>>;
  create(
    input: object,
    scenarios?: string[],
    optimisticResponse?: object,
    update?: MutationUpdaterFn
  ): Promise<Response<M>>;
  createMany(
    input: any,
    scenarios?: string[],
    optimisticResponse?: any,
    update?: MutationUpdaterFn
  ): Promise<Response<M[]>>;
  updateById(
    input: object,
    scenarios?: string[],
    optimisticResponse?: any,
    update?: MutationUpdaterFn
  ): Promise<Response<M>>;

  updateMany(
    input: object,
    where: object,
    scenarios?: string[],
    optimisticResponse?: any,
    update?: MutationUpdaterFn
  ): Promise<Response<UpdateManyResult>>;
  deleteById(
    id: string,
    optimisticResponse?: any,
    update?: MutationUpdaterFn
  ): Promise<Response<M>>;
  deleteOne(
    params: object,
    optimisticResponse?: any,
    update?: MutationUpdaterFn
  ): Promise<Response<M>>;
  // deleteMany(params: object): Promise<DeleteManyResult>;
  validate(
    input: object,
    scenarios: string[],
    specific?: boolean,
    fetchPolicy?: FetchPolicy
  ): Promise<ValidateResult>;
  distinct(
    field: string,
    where: object,
    fetchPolicy?: FetchPolicy
  ): Promise<DistinctResponse>;

  list(where?: object, fetchPolicy?: FetchPolicy): Promise<ListResponse>;

  count(where: object, fetchPolicy?: FetchPolicy): Promise<CountResponse>;
  exists(where: object, fetchPolicy?: FetchPolicy): Promise<ExistsResponse>;
}
