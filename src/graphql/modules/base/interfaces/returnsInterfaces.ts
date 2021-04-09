import { GraphQLError } from 'graphql';

export interface Response<T> {
  data: Partial<T> | null;
  errors: readonly GraphQLError[] | undefined;
}

export interface GetManyResponse<T> {
  data: GetMany<T>;
  errors: readonly GraphQLError[] | undefined;
}

export interface DistinctResponse {
  data: string[];
  errors: readonly GraphQLError[] | undefined;
}

export interface CountResponse {
  data: number;
  errors: readonly GraphQLError[] | undefined;
}

export interface ListResponse {
  data: [{ _id; text }];
  errors: readonly GraphQLError[] | undefined;
}

export interface ExistsResponse {
  data: boolean;
  errors: readonly GraphQLError[] | undefined;
}

export interface GetMany<T> {
  elements: Partial<T>[];
  pagination: Pagination;
}

export interface Pagination {
  hasNextPage: boolean;
  totalElements: number;
  lastPage: number;
  nextPage: number;
  previousPage: number;
}

export interface UpdateManyResult {
  n: Number; // Number of documents matched
  nModified: Number; // Number of documents modified
}

export interface DeleteManyResult {
  ok?: Number; // 1 if no errors occurred
  deletedCount?: Number; // the number of documents deleted
  n?: Number; // the number of documents deleted. Equal to deletedCount.
}

export interface ValidateResult {
  status: number;
  errors?: object;
}
