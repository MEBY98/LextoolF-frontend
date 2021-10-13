import { Ref, ref } from 'vue';
import { DictionaryInfo } from '@/models/DictionaryInfo';

export default function UseEditDictionaryInfoModal(
  selectedDictionaryInfo: Ref<DictionaryInfo>
) {
  const showEditDictionaryInfoModal: Ref<boolean> = ref(false);
  const showEditDictionaryInfoModalMethod = (record) => {
    selectedDictionaryInfo.value = record;
    showEditDictionaryInfoModal.value = true;
  };
  const closeEditDictionaryInfoModalMethod = () => {
    showEditDictionaryInfoModal.value = false;
  };
  return {
    showEditDictionaryInfoModal,
    showEditDictionaryInfoModalMethod,
    closeEditDictionaryInfoModalMethod,
  };
}
