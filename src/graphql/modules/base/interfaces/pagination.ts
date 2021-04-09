export interface PaginationInput {
  page?: number;
  limit?: number;
  skip?: number;

  // Only for cursor based pagination
  startingAfter?: string;
}

export const DEFAULT_PAGINATION = { page: 1, limit: 10, skip: 0 };
