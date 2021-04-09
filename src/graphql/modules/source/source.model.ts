import { apolloSourceClient, FetchPolicy } from '@/graphql/apolloProvider';
import { apolloQuery, apolloMutate } from './../../apollo';
import { deleteExcelMutation } from './mutations';
import { generateEntriesQuery, getManyExcelsQuery } from './querys';

export class Source {
  static getManyExcels() {
    return apolloQuery(
      getManyExcelsQuery,
      null,
      FetchPolicy.network_only,
      apolloSourceClient
    );
  }

  static deleteExcel(excelHash: string) {
    return apolloMutate(
      deleteExcelMutation,
      { excelHash },
      null,
      null,
      apolloSourceClient
    );
  }

  static generateEntries(excelData) {
    const { excelHash, sheetName } = excelData;
    return apolloQuery(
      generateEntriesQuery,
      { excelHash, sheetName },
      null,
      apolloSourceClient
    );
  }
}
