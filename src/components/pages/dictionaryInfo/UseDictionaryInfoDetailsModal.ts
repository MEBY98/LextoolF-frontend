import { Ref, ref } from 'vue';
import { DictionaryInfo } from '@/models/DictionaryInfo';

export default function UseDictionaryInfoDetailsModal(
  selectedDictionaryInfo: Ref<DictionaryInfo>
) {
  const showDicionaryInfoDetailsModal: Ref<boolean> = ref(false);
  const showDicionaryInfoDetailsModalMethod = (record) => {
    selectedDictionaryInfo.value = record;
    showDicionaryInfoDetailsModal.value = true;
  };
  const closeDicionaryInfoDetailsModalMethod = () => {
    showDicionaryInfoDetailsModal.value = false;
  };
  return {
    showDicionaryInfoDetailsModal,
    showDicionaryInfoDetailsModalMethod,
    closeDicionaryInfoDetailsModalMethod,
  };
}
