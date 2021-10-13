import { Ref, ref } from 'vue';

export default function UseNewDictionaryInfoModal() {
  const showNewDictionaryInfoModal: Ref<boolean> = ref(false);
  const showNewDictionaryInfoModalMethod = () => {
    showNewDictionaryInfoModal.value = true;
  };
  const closeNewDictionaryInfoModalMethod = () => {
    showNewDictionaryInfoModal.value = false;
  };
  return {
    showNewDictionaryInfoModal,
    showNewDictionaryInfoModalMethod,
    closeNewDictionaryInfoModalMethod,
  };
}
