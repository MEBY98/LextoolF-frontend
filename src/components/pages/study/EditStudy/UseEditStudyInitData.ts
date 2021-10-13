import { Ref } from 'vue';
import { Study as StudyModel } from '@/graphql/modules/study/model.ts';
import { FraseologicStudyToEdit } from '@/models/FraseologicStudy';
import { DictionaryInfo } from '@/models/DictionaryInfo';
import { store } from '@/store/store';

export default function UseEditStudyInitData(
  id: string,
  selectedStudyCopy: Ref<FraseologicStudyToEdit>,
  dictionariesInfoCopy: Ref<DictionaryInfo[]>,
  dictionariesInfoIndexsCopy: Ref<number[]>
) {
  const editStudyInitData = async () => {
    store.layout.isLoading = true;
    store.layout.loadingTip = 'Cargando estudio';
    const selectedStudyData = await StudyModel.getStudyByID(id);
    selectedStudyCopy.value = selectedStudyData.data.getStudyByID;
    const dictionariesInfoData = await StudyModel.getDictionariesInfoByID(id);
    dictionariesInfoCopy.value =
      dictionariesInfoData.data.getDictionariesInfoByID;
    dictionariesInfoCopy.value.forEach((diC) => {
      let found = false;
      for (
        let sdiIndex = 0;
        sdiIndex < store.dictionariesInfo.length && !found;
        sdiIndex++
      ) {
        const sdi = store.dictionariesInfo[sdiIndex];
        if (sdi.id.toString() === diC.id.toString()) {
          dictionariesInfoIndexsCopy.value.push(sdiIndex);
          found = true;
        }
      }
    });
    store.layout.isLoading = false;
    store.layout.loadingTip = '';
  };

  return {
    editStudyInitData,
  };
}
