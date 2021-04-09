interface Options {
  limit: Number;
}

export interface Populate {
  path: string;
  select?: string;
  model?: string;
  match?: object;
  options?: Options;
  populate?: Populate;
}

export interface Params {
  where?: object;
  populate?: Populate[];
  aggregate?: any[];
  select?: string;
  distinct?: string;
  sort?: string | object;
}
