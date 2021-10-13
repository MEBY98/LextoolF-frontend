import { EntryToEdit } from '@/models/Entry';
import { Ref } from 'vue';

export default function UseOrderLemmaTab(newEntry: Ref<EntryToEdit>) {
  const updateOrderLemma = (update) => {
    newEntry.value.elements[update.indexElement].orderLemma[update.attribute] =
      update.descriptor;
  };
  return {
    updateOrderLemma,
  };
}
