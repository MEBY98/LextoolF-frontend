import { ref, Ref } from 'vue';
import { Ubication } from '@/models/Ubication';

export default function UseUbicationReportByDictionaryModal(
  selectedUbication: Ref<string>
) {
  const showUbicationReportByDictionary = ref(false);
  const showUbicationReportByDictionaryMethod = (record: Ubication) => {
    selectedUbication.value = record.id;
    showUbicationReportByDictionary.value = true;
  };
  const closeUbicationReportByDictionaryMethod = () => {
    showUbicationReportByDictionary.value = false;
  };
  return {
    showUbicationReportByDictionary,
    showUbicationReportByDictionaryMethod,
    closeUbicationReportByDictionaryMethod,
  };
}
