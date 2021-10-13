import { ref } from 'vue';

export default function UseNewUbicationModal() {
  const showNewUbicationModal = ref(false);
  const showNewUbicationModalMethod = () => {
    showNewUbicationModal.value = true;
  };
  const closeNewUbicationModalMethod = () => {
    showNewUbicationModal.value = false;
  };
  return {
    showNewUbicationModal,
    showNewUbicationModalMethod,
    closeNewUbicationModalMethod,
  };
}
