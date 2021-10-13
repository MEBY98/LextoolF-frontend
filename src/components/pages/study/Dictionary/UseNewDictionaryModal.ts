import { Ref, ref } from 'vue';

export default function UseNewDictionaryModal() {
  const showNewDictionaryModal: Ref<boolean> = ref(false);
  const showNewDictionaryModalMethod = () => {
    showNewDictionaryModal.value = true;
  };
  const closeNewDictionaryModalMethod = () => {
    showNewDictionaryModal.value = false;
  };
  return {
    showNewDictionaryModal,
    showNewDictionaryModalMethod,
    closeNewDictionaryModalMethod,
  };
}
