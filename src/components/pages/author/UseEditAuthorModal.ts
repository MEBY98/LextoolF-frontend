import { Ref, ref } from 'vue';
import { Author } from '@/models/Author';

export default function UseEditAuthorModal(selectedAuthor: Ref<Author>) {
  const showEditAuthorModal: Ref<boolean> = ref(false);
  const showEditAuthorModalMethod = (record) => {
    selectedAuthor.value = record;
    showEditAuthorModal.value = true;
  };
  const closeEditAuthorModalMethod = () => {
    showEditAuthorModal.value = false;
  };
  return {
    showEditAuthorModal,
    showEditAuthorModalMethod,
    closeEditAuthorModalMethod,
  };
}
