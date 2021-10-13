import { ref, Ref } from 'vue';
import { NewDictionary } from '@/models/Dictionary';

export default function UseSelectedDictionary() {
  const selectedDictionary: Ref<NewDictionary> = ref({
    dictionaryInfo: '',
    letters: [],
    entries: [],
  });
  const selectedDictionaryInfoIndex: Ref<number> = ref(0);
  const selectedRow: Ref<number> = ref();
  return {
    selectedDictionary,
    selectedDictionaryInfoIndex,
    selectedRow,
  };
}
