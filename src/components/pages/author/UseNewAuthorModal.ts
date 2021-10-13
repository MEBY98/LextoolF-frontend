import { Ref, ref } from 'vue';

export default function UseNewAuthorModal() {
  const showNewAuthorModal: Ref<boolean> = ref(false);
  const showNewAuthorModalMethod = () => {
    showNewAuthorModal.value = true;
  };
  const closeNewAuthorModalMethod = () => {
    showNewAuthorModal.value = false;
  };
  return {
    showNewAuthorModal,
    showNewAuthorModalMethod,
    closeNewAuthorModalMethod,
  };
}
