import { ref } from 'vue';
export default function UseNewDescriptorModal() {
  const showNewDescriptorModal = ref(false);
  const showNewDescriptorModalMethod = () => {
    showNewDescriptorModal.value = true;
  };
  const closeNewDescriptorModalMethod = () => {
    showNewDescriptorModal.value = false;
  };
  return {
    showNewDescriptorModal,
    showNewDescriptorModalMethod,
    closeNewDescriptorModalMethod,
  };
}
