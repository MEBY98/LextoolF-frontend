import { Ref, ref } from 'vue';
import { Author } from '@/models/Author';

export default function UseAuthorDetailsModal(selectedAuthor: Ref<Author>) {
  const showAuthorDetailsModal: Ref<boolean> = ref(false);
  const showAuthorDetailsModalMethod = (record) => {
    selectedAuthor.value = record;
    showAuthorDetailsModal.value = true;
  };
  const closeAuthorDetailsModalMethod = () => {
    showAuthorDetailsModal.value = false;
  };
  return {
    showAuthorDetailsModal,
    showAuthorDetailsModalMethod,
    closeAuthorDetailsModalMethod,
  };
}
