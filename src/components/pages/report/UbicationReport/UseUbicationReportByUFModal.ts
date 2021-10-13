import { ref, Ref } from 'vue';
import { DictionaryEntriesDescriptorsAsString } from '@/models/Dictionary';

export default function UseUbicationReportByUFModal(
  selectedDictionary: Ref<DictionaryEntriesDescriptorsAsString>
) {
  const showUbicationReportByUF = ref(false);
  const showUbicationReportByUFMethod = (
    record: DictionaryEntriesDescriptorsAsString
  ) => {
    selectedDictionary.value = record;
    showUbicationReportByUF.value = true;
  };
  const closeUbicationReportByUFMethod = () => {
    showUbicationReportByUF.value = false;
  };
  return {
    showUbicationReportByUF,
    showUbicationReportByUFMethod,
    closeUbicationReportByUFMethod,
  };
}
