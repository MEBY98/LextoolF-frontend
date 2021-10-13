import { Ref } from 'vue';
import { EntryToEdit } from '@/models/Entry';

export default function UseExampleTab(newEntry: Ref<EntryToEdit>) {
  const updateExample = (update) => {
    newEntry.value.elements[update.indexElement].example[update.attribute] =
      update.descriptor;
  };
  return {
    updateExample,
  };
}
