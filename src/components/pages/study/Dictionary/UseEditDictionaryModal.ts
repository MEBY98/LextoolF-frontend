import { ref, Ref } from 'vue';
import { NewDictionary } from '@/models/Dictionary';
import { NewFraseologicStudy } from '@/models/FraseologicStudy';

export default function UseEditDictionaryModal(
  newStudy: Ref<NewFraseologicStudy>,
  dictionariesInfosIndexs: Ref<number[]>,
  selectedDictionary: Ref<NewDictionary>,
  selectedDictionaryInfoIndex: Ref<number>,
  selectedRow: Ref<number>
) {
  const showEditDictionaryModal: Ref<boolean> = ref(false);
  const showEditDictionaryModalMethod = (index: number) => {
    selectedDictionary.value = newStudy.value.dictionaries[index];
    selectedDictionaryInfoIndex.value = dictionariesInfosIndexs.value[index];
    selectedRow.value = index;
    showEditDictionaryModal.value = true;
  };
  const closeEditDictionaryModalMethod = () => {
    showEditDictionaryModal.value = false;
  };

  return {
    showEditDictionaryModal,
    showEditDictionaryModalMethod,
    closeEditDictionaryModalMethod,
  };
}
