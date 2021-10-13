import { ref } from 'vue';

export default function UseUbicationsModal() {
  const showUbicationsModal = ref(false);
  const closeUbicationsModalMethod = () => {
    showUbicationsModal.value = false;
  };
  const showUbicationsModalMethod = () => {
    showUbicationsModal.value = true;
  };
  return {
    showUbicationsModal,
    showUbicationsModalMethod,
    closeUbicationsModalMethod,
  };
}
