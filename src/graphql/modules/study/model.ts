import { apolloQuery, apolloMutate } from '@/graphql/apollo';
import {
  getAllStudiesQuery,
  getStudyByIDQuery,
  getDictionariesInfoByIDQuery,
} from './querys';
import { FetchPolicy, apolloClient } from '@/graphql/apolloProvider';
import {
  deleteStudyByIDMutation,
  createStudyMutation,
  editStudyMutation,
} from './mutations';

export class Study {
  static getAllStudies() {
    return apolloQuery(
      getAllStudiesQuery,
      null,
      FetchPolicy.network_only,
      apolloClient
    );
  }

  static getStudyByID(studyID: String) {
    return apolloQuery(
      getStudyByIDQuery,
      { studyID },
      FetchPolicy.network_only,
      apolloClient
    );
  }

  static getDictionariesInfoByID(studyID: String) {
    return apolloQuery(
      getDictionariesInfoByIDQuery,
      { studyID },
      FetchPolicy.network_only,
      apolloClient
    );
  }

  static createStudy(fraseologicStudy: any) {
    return apolloMutate(
      createStudyMutation,
      { fraseograficStudy: fraseologicStudy },
      null,
      null
    );
  }

  static editStudy(fraseologicStudy: any) {
    return apolloMutate(
      editStudyMutation,
      { newStudy: fraseologicStudy },
      null,
      null
    );
  }

  static deleteStudyByID(studyID: String) {
    return apolloMutate(deleteStudyByIDMutation, { studyID }, null, null);
  }
}
