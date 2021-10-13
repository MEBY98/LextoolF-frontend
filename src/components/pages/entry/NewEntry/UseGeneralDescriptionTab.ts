import { Ref } from 'vue';
import { EntryToEdit } from '@/models/Entry';

export default function UseGeneralDescriptionTab(newEntry: Ref<EntryToEdit>) {
  const updateGeneralDescription = (update) => {
    console.log('update', update);
    newEntry.value.elements[update.indexElement];
    newEntry.value.elements[update.indexElement].generalDescription[
      update.attribute
    ] = update.value;
  };
  return {
    updateGeneralDescription,
  };
}
