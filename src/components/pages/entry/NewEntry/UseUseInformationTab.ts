import { EntryToEdit } from '@/models/Entry';
import { Ref } from 'vue';

export default function UseUseInformationTab(newEntry: Ref<EntryToEdit>) {
  const updateUseInformation = (update) => {
    console.log('uodate', update);
    newEntry.value.elements[update.indexElement].useInformation[
      update.selectedObservation
    ][update.attribute] = update.descriptor;
  };
  return {
    updateUseInformation,
  };
}
