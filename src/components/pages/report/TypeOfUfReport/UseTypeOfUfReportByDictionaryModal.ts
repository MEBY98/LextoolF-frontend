import { ref, Ref } from 'vue';
import { Descriptor } from '@/models/Descriptor';

export default function UseTypeOfUfByDictionaryModal(
  selectedDescriptor: Ref<string>
) {
  const showTypeOfUfByDictionary = ref(false);
  const showTypeOfUfByDictionaryMethod = (record: Descriptor) => {
    selectedDescriptor.value = record.id;
    showTypeOfUfByDictionary.value = true;
  };
  const closeTypeOfUfByDictionaryMethod = () => {
    showTypeOfUfByDictionary.value = false;
  };
  return {
    showTypeOfUfByDictionary,
    showTypeOfUfByDictionaryMethod,
    closeTypeOfUfByDictionaryMethod,
  };
}
