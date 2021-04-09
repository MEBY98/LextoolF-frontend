import { PaginationInput, DEFAULT_PAGINATION } from './pagination';
import { Params } from './params.interface';

export interface GetManyInput {
  params?: Params;
  paginationInput: PaginationInput;
}

export const DEFAULT_GET_MANY = {
  params: { find: {} },
  paginationInput: DEFAULT_PAGINATION,
};
