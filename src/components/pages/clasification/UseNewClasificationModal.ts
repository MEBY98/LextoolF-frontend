import { ref } from 'vue';

export default function UseNewClasificationModal() {
  const showNewClasificationModal = ref(false);
  const showNewClasificationModalMethod = () => {
    showNewClasificationModal.value = true;
  };
  const closeNewClasificationModalMethod = () => {
    showNewClasificationModal.value = false;
  };
  return {
    showNewClasificationModal,
    showNewClasificationModalMethod,
    closeNewClasificationModalMethod,
  };
}
