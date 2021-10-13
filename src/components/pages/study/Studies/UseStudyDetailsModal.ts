import { Ref, ref } from 'vue';
import { FraseologicStudy } from '@/models/FraseologicStudy';

export default function UseStudyDetailsModal(
  selectedStudy: Ref<FraseologicStudy>
) {
  const showStudyDetailsModal: Ref<boolean> = ref(false);
  const showStudyDetailsModalMethod = (record) => {
    console.log('record', record);
    selectedStudy.value = record;
    showStudyDetailsModal.value = true;
  };
  const closeStudyDetailsModalMethod = () => {
    showStudyDetailsModal.value = false;
  };
  return {
    showStudyDetailsModal,
    showStudyDetailsModalMethod,
    closeStudyDetailsModalMethod,
  };
}
