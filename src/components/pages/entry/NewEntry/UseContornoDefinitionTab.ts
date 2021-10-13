import { Ref } from 'vue';
import { EntryToEdit } from '@/models/Entry';

export default function UseContornoDefinitionTab(newEntry: Ref<EntryToEdit>) {
  const updateContornoDefinition = (update) => {
    newEntry.value.elements[update.indexElement].contornoDefinition[
      update.indexCD
    ][update.attribute] = update.descriptor;
  };
  const addContornoDefinition = (selectedElement) => {
    newEntry.value.elements[selectedElement].contornoDefinition.push({
      definition: '',
      typeOfDefinition: '',
      argumentalSchema: '',
      relationship: [],
      contorno: '',
      typeOfContorno: [],
      positionOfContorno: [],
      formatOfContorno: [],
    });
  };
  const removeContornoDefinition = (update) => {
    newEntry.value.elements[update.indexElement].contornoDefinition.splice(
      update.indexCD,
      1
    );
  };
  const updateElementContorno = (update) => {
    newEntry.value.elements[update.indexElement].contornoDefinition[
      update.indexCD
    ].contorno = update.contorno;
  };
  const updateElementDefinition = (update) => {
    newEntry.value.elements[update.indexElement].contornoDefinition[
      update.indexCD
    ].definition = update.definition;
  };
  return {
    updateContornoDefinition,
    addContornoDefinition,
    removeContornoDefinition,
    updateElementContorno,
    updateElementDefinition,
  };
}
