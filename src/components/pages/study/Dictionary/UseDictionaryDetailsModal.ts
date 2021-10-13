import { ref, Ref } from 'vue';
import { NewDictionary } from '@/models/Dictionary';
import { NewFraseologicStudy } from '@/models/FraseologicStudy';

export default function UseDictionaryDetailsModal(
  newStudy: Ref<NewFraseologicStudy>,
  dictionariesInfosIndexs: Ref<number[]>,
  selectedDictionary: Ref<NewDictionary>,
  selectedDictionaryInfoIndex: Ref<number>,
  selectedRow: Ref<number>
) {
  const showDictionaryDetailsModal: Ref<boolean> = ref(false);
  const showDictionaryDetailsModalMethod = (index: number) => {
    selectedDictionary.value = newStudy.value.dictionaries[index];
    selectedDictionaryInfoIndex.value = dictionariesInfosIndexs.value[index];
    selectedRow.value = index;
    showDictionaryDetailsModal.value = true;
  };
  const closeDictionaryDetailsModalMethod = () => {
    showDictionaryDetailsModal.value = false;
  };
  return {
    showDictionaryDetailsModal,
    showDictionaryDetailsModalMethod,
    closeDictionaryDetailsModalMethod,
  };
}
