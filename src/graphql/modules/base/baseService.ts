import { MutationUpdaterFn } from 'apollo-boost';
import * as _ from 'lodash';
import { pluralize } from '../../../utils/utils';
import { Type } from './../../../utils/type';
import { apolloMutate, apolloQuery } from './../../apollo';
import { IBaseService } from './IBase.service';
import { GetManyInput } from './interfaces/getManyInput';
import { GetOneInput } from './interfaces/getOneInput';
import {
  CountResponse,
  DistinctResponse,
  ExistsResponse,
  GetManyResponse,
  ValidateResult,
  Response,
  UpdateManyResult,
  ListResponse,
} from './interfaces/returnsInterfaces';
import {
  getManyResult,
  getResult,
  getResultCount,
  getResultDistinct,
  getResultExists,
  getResultList,
  getResultValidate,
} from './utils';
import { FetchPolicy } from '@/graphql/apolloProvider';

export function BaseService<M>(modelName: string): Type<IBaseService<M>> {
  const modelNameCap = _.upperFirst(_.camelCase(modelName));
  const modelNamePlu = pluralize(modelNameCap);

  const getByIdQuery = require(`../${modelName}/querys.ts`)[
    `getById${modelNameCap}Query`
  ];
  const getOneQuery = require(`../${modelName}/querys.ts`)[
    `getOne${modelNameCap}Query`
  ];
  const getManyQuery = require(`../${modelName}/querys.ts`)[
    `getMany${modelNamePlu}Query`
  ];
  const distinctQuery = require(`../${modelName}/querys.ts`)[
    `distinct${modelNamePlu}Query`
  ];
  const countQuery = require(`../${modelName}/querys.ts`)[
    `count${modelNamePlu}Query`
  ];
  const existsQuery = require(`../${modelName}/querys.ts`)[
    `exists${modelNameCap}Query`
  ];
  const listQuery = require(`../${modelName}/querys.ts`)[
    `list${modelNamePlu}Query`
  ];
  const validateQuery = require(`../${modelName}/querys.ts`)[
    `validate${modelNameCap}Query`
  ];

  const createMutation = require(`../${modelName}/mutations.ts`)[
    `create${modelNameCap}Mutation`
  ];
  const createManyMutation = require(`../${modelName}/mutations.ts`)[
    `createMany${modelNamePlu}Mutation`
  ];
  const updateByIdMutation = require(`../${modelName}/mutations.ts`)[
    `updateById${modelNameCap}Mutation`
  ];
  const updateManyMutation = require(`../${modelName}/mutations.ts`)[
    `updateMany${modelNamePlu}Mutation`
  ];
  const deleteByIdMutation = require(`../${modelName}/mutations.ts`)[
    `deleteById${modelNameCap}Mutation`
  ];
  const deleteOneMutation = require(`../${modelName}/mutations.ts`)[
    `deleteOne${modelNameCap}Mutation`
  ];

  class InnerBaseService implements IBaseService<M> {
    getById<M>(id: string, fetchPolicy?: FetchPolicy): Promise<Response<M>> {
      const result = apolloQuery(getByIdQuery, { id }, fetchPolicy);
      return getResult<M>(result);
    }

    getOne<M>(
      input: GetOneInput,
      fetchPolicy?: FetchPolicy
    ): Promise<Response<M>> {
      const result = apolloQuery(getOneQuery, { input }, fetchPolicy);
      return getResult<M>(result);
    }

    getMany(
      getManyInput: GetManyInput,
      fetchPolicy?: FetchPolicy
    ): Promise<GetManyResponse<M>> {
      const result = apolloQuery(getManyQuery, { getManyInput }, fetchPolicy);
      return getManyResult<M>(result);
    }

    create(
      input: any,
      scenarios?: string[],
      optimisticResponse?: any,
      update?: MutationUpdaterFn
    ): Promise<Response<M>> {
      const result = apolloMutate(
        createMutation,
        { input, scenarios },
        optimisticResponse,
        update
      );
      return getResult<M>(result);
    }

    createMany(
      input: any,
      scenarios?: string[],
      optimisticResponse?: any,
      update?: MutationUpdaterFn
    ): Promise<Response<M[]>> {
      const result = apolloMutate(
        createManyMutation,
        { input, scenarios },
        optimisticResponse,
        update
      );
      return getResult<M[]>(result);
    }

    updateById(
      input: Partial<any>,
      scenarios?: string[],
      optimisticResponse?: any,
      update?: MutationUpdaterFn
    ): Promise<Response<M>> {
      const result = apolloMutate(
        updateByIdMutation,
        { input, scenarios },
        optimisticResponse,
        update
      );
      return getResult<M>(result);
    }

    async updateMany(
      input: object,
      where: object,
      scenarios?: string[],
      optimisticResponse?: any,
      update?: MutationUpdaterFn
    ): Promise<Response<UpdateManyResult>> {
      if (input['_id']) {
        delete input['_id'];
      }
      const result = await apolloMutate(updateManyMutation, {
        input,
        where,
        scenarios,
        optimisticResponse,
        update,
      });

      return { data: result.data, errors: result.errors };
    }

    deleteById(
      id: string,
      optimisticResponse?: object,
      update?: MutationUpdaterFn
    ): Promise<Response<M>> {
      const result = apolloMutate(
        deleteByIdMutation,
        { id },
        optimisticResponse,
        update
      );
      return getResult<M>(result);
    }

    deleteOne(
      where: object,
      optimisticResponse?: object,
      update?: MutationUpdaterFn
    ): Promise<Response<M>> {
      const result = apolloMutate(
        deleteOneMutation,
        { where },
        optimisticResponse,
        update
      );
      return getResult<M>(result);
    }

    count(where: object, fetchPolicy?: FetchPolicy): Promise<CountResponse> {
      const result = apolloQuery(countQuery, { where }, fetchPolicy);
      return getResultCount(result);
    }
    exists(where: object, fetchPolicy?: FetchPolicy): Promise<ExistsResponse> {
      const result = apolloQuery(existsQuery, { where }, fetchPolicy);
      return getResultExists(result);
    }

    distinct(
      field: string,
      where: object,
      fetchPolicy?: FetchPolicy
    ): Promise<DistinctResponse> {
      const result = apolloQuery(distinctQuery, { field, where }, fetchPolicy);
      return getResultDistinct(result);
    }

    list(where: object = {}, fetchPolicy?: FetchPolicy): Promise<ListResponse> {
      const result = apolloQuery(listQuery, { where }, fetchPolicy);
      return getResultList(result);
    }

    validate(
      input: object,
      scenarios: string[],
      specific?: boolean,
      fetchPolicy?: FetchPolicy
    ): Promise<ValidateResult> {
      const result = apolloQuery(
        validateQuery,
        { input, scenarios, specific },
        fetchPolicy
      );
      return getResultValidate(result);
    }
  }
  return InnerBaseService;
}
