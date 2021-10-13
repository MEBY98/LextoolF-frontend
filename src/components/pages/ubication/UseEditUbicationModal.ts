import { ref, Ref } from 'vue';
import { Ubication } from '@/models/Ubication';

export default function UseEditUbicationModal(
  selectedUbication: Ref<Ubication>
) {
  const showEditUbicationModal = ref(false);
  const showEditUbicationModalMethod = (ubication: Ubication) => {
    selectedUbication.value = ubication;
    showEditUbicationModal.value = true;
  };
  const closeEditUbicationModalMethod = () => {
    showEditUbicationModal.value = false;
  };
  return {
    showEditUbicationModal,
    showEditUbicationModalMethod,
    closeEditUbicationModalMethod,
  };
}
