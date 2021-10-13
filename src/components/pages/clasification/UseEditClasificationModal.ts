import { ref, Ref } from 'vue';
import { Clasification } from '@/models/Clasification';

export default function UseEditUbicationModal(
  selectedClasification: Ref<Clasification>
) {
  const showEditClasificationModal = ref(false);
  const showEditClasificationModalMethod = (clasification: Clasification) => {
    selectedClasification.value = clasification;
    showEditClasificationModal.value = true;
  };
  const closeEditClasificationModalMethod = () => {
    showEditClasificationModal.value = false;
  };
  return {
    showEditClasificationModal,
    showEditClasificationModalMethod,
    closeEditClasificationModalMethod,
  };
}
