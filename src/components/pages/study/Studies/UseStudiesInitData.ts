// import { Ubication as UbicationModel } from '@/graphql/modules/ubication/model';
// import { Clasification as ClasificationModel } from '@/graphql/modules/clasification/model';
// import { DescriptorType as DescriptorTypeModel } from '@/graphql/modules/DescriptorsTypes/model';
// import { Observation as ObservationModel } from '@/graphql/modules/Observation/model';
import { Ref } from 'vue';
import { Study as StudyModel } from '@/graphql/modules/study/model.ts';
import { DictionaryInfo as DictionaryInfoModel } from '@/graphql/modules/dictionaryInfo/model';
import { Author as AuthorModel } from '@/graphql/modules/author/model';
import { FraseologicStudy } from '@/models/FraseologicStudy';
import { store } from '@/store/store';

export default function UseStudiesInitData(studies: Ref<FraseologicStudy[]>) {
  const studiesInitData = async () => {
    store.layout.isLoading = true;
    store.layout.loadingTip = 'Cargando estudios';
    const { data } = await StudyModel.getAllStudies();
    studies.value = data.getAllStudies;
    const dataDictionaryInfo = await DictionaryInfoModel.getAllDictionaryInfo();
    store.dictionariesInfo = dataDictionaryInfo.data.getAllDictionaryInfo;
    const dataAuthor = await AuthorModel.getAllAuthors();
    store.authors = dataAuthor.data.getAllAuthors;
    store.layout.isLoading = false;
    store.layout.loadingTip = '';
    console.log('store', store);
  };
  return { studiesInitData };
}
