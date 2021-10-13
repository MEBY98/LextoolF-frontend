import { Ref, ref } from 'vue';
import { EntryToEdit } from '@/models/Entry';

export default function UseEntryDetailsModal(selectedEntry: Ref<EntryToEdit>) {
  const showEntryDetailsModal: Ref<boolean> = ref(false);
  const showEntryDetailsModalMethod = (record) => {
    selectedEntry.value = record;
    showEntryDetailsModal.value = true;
  };
  const closeEntryDetailsModalMethod = () => {
    showEntryDetailsModal.value = false;
  };
  return {
    showEntryDetailsModal,
    showEntryDetailsModalMethod,
    closeEntryDetailsModalMethod,
  };
}
