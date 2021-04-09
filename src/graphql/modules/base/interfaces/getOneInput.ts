import { Populate } from './params.interface';

export interface GetOneInput {
  populate?: Populate[];
  select?: string;
  where: object;
}
