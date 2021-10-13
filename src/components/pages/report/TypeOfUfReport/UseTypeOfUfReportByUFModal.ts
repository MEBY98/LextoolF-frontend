import { ref, Ref } from 'vue';
import { DictionaryEntriesDescriptorsAsString } from '@/models/Dictionary';

export default function UseTypeOfUfReportByUFModal(
  selectedDictionary: Ref<DictionaryEntriesDescriptorsAsString>
) {
  const showTypeOfUfReportByUF = ref(false);
  const showTypeOfUfReportByUFMethod = (
    record: DictionaryEntriesDescriptorsAsString
  ) => {
    selectedDictionary.value = record;
    showTypeOfUfReportByUF.value = true;
  };
  const closeTypeOfUfReportByUFMethod = () => {
    showTypeOfUfReportByUF.value = false;
  };
  return {
    showTypeOfUfReportByUF,
    showTypeOfUfReportByUFMethod,
    closeTypeOfUfReportByUFMethod,
  };
}
