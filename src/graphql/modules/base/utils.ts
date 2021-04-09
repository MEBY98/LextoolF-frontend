import { ApolloQueryResult, FetchResult } from 'apollo-boost';
import {
  CountResponse,
  DistinctResponse,
  Response,
  ExistsResponse,
  GetManyResponse,
  GetMany,
  ValidateResult,
  ListResponse,
} from './interfaces/returnsInterfaces';
import { logErrorMessages } from '@vue/apollo-util';

function processError(errors) {
  logErrorMessages({ graphQLErrors: errors });
}

export async function getResult<T>(
  result: Promise<ApolloQueryResult<any>> | Promise<FetchResult>
): Promise<Response<T>> {
  let resultData = await result;
  const { data: dataResult, errors } = resultData;
  if (dataResult) {
    const keys: any = Object.keys(dataResult);
    let data = dataResult[keys[0]];
    return { data: data as T, errors };
  } else {
    return { data: null, errors };
  }
}

export async function getResultValidate(
  result: Promise<ApolloQueryResult<any>> | Promise<FetchResult>
): Promise<ValidateResult> {
  let resultData = await result;
  const { data: dataResult, errors } = resultData;

  if (dataResult) {
    const keys: any = Object.keys(dataResult);
    let data = dataResult[keys[0]];
    return { status: data.status, errors: data.errors };
  } else {
    return { status: null, errors };
  }
}

export async function getResultCount(
  result: Promise<ApolloQueryResult<any>> | Promise<FetchResult>
): Promise<CountResponse> {
  let resultData = await result;
  const { data: dataResult, errors } = resultData;
  if (dataResult) {
    const keys: any = Object.keys(dataResult);
    let data = dataResult[keys[0]];
    return { data, errors };
  } else {
    return { data: null, errors };
  }
}

export async function getResultDistinct(
  result: Promise<ApolloQueryResult<any>> | Promise<FetchResult>
): Promise<DistinctResponse> {
  let resultData = await result;
  const { data: dataResult, errors } = resultData;
  if (dataResult) {
    const keys: any = Object.keys(dataResult);
    let data = dataResult[keys[0]];
    return { data, errors };
  } else {
    return { data: null, errors };
  }
}

export async function getResultExists(
  result: Promise<ApolloQueryResult<any>> | Promise<FetchResult>
): Promise<ExistsResponse> {
  let resultData = await result;
  const { data: dataResult, errors } = resultData;
  if (dataResult) {
    const keys: any = Object.keys(dataResult);
    let data = dataResult[keys[0]];
    return { data, errors };
  } else {
    return { data: null, errors };
  }
}

export async function getResultList(
  result: Promise<ApolloQueryResult<any>> | Promise<FetchResult>
): Promise<ListResponse> {
  let resultData = await result;
  const { data: dataResult, errors } = resultData;
  if (dataResult) {
    const keys: any = Object.keys(dataResult);
    let data = dataResult[keys[0]];
    return { data, errors };
  } else {
    return { data: null, errors };
  }
}

export async function getManyResult<T>(
  result: Promise<ApolloQueryResult<any>>
): Promise<GetManyResponse<T>> {
  let resultData = await result;
  const { data: dataResult, errors } = resultData;

  if (errors) {
    processError(errors);
  }

  if (dataResult) {
    const keys: any = Object.keys(dataResult);
    let data = dataResult[keys[0]];
    return { data: data as GetMany<T>, errors };
  } else {
    return { data: null, errors };
  }
}
