import { ref } from 'vue';

export default function UseAddDescriptorModal() {
  const showAddDescriptorModal = ref(false);
  const showAddDescriptorModalMethod = () => {
    showAddDescriptorModal.value = true;
  };
  const closeAddDescriptorModalMethod = () => {
    showAddDescriptorModal.value = false;
  };
  return {
    showAddDescriptorModal,
    showAddDescriptorModalMethod,
    closeAddDescriptorModalMethod,
  };
}
