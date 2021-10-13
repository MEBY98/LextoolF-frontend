import { Ref } from 'vue';
import { EntryToEdit } from '@/models/Entry';

export default function UseParadigmaticInfo(newEntry: Ref<EntryToEdit>) {
  const updateParadigmaticInfo = (update) => {
    newEntry.value.elements[update.indexElement].paradigmaticInfo[
      update.attribute
    ] = update.descriptor;
  };
  return {
    updateParadigmaticInfo,
  };
}
