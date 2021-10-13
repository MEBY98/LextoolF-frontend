import { ref, Ref } from 'vue';
import { Descriptor } from '@/models/Descriptor';

export default function UseEditDescriptorModal(
  selectedDescriptor: Ref<Descriptor>
) {
  const showEditDescriptorModal = ref(false);
  const showEditDescriptorModalMethod = (record) => {
    selectedDescriptor.value = record;
    showEditDescriptorModal.value = true;
  };
  const closeEditDescriptorModalMethod = () => {
    showEditDescriptorModal.value = false;
  };
  return {
    showEditDescriptorModal,
    showEditDescriptorModalMethod,
    closeEditDescriptorModalMethod,
  };
}
