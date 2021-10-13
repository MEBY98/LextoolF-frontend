import { ref } from 'vue';

export default function UseTabs() {
  const tabs = ref([
    {
      id: 'GeneralDescriptionDescriptorsTypes',
      name: 'Descripción general',
    },
    {
      id: 'OrderLemmaObservations',
      name: 'Ordernación y lematización',
    },
    {
      id: 'UseInformationObservations',
      name: 'Información de use',
    },
    {
      id: 'DefinitionDescriptorsTypes',
      name: 'Definición',
    },
    {
      id: 'ContornoDescriptorsTypes',
      name: 'Contorno',
    },
    {
      id: 'ExampleDescriptorsTypes',
      name: 'Ejemplificación',
    },
    {
      id: 'ParadigmaticInfoDescriptorsTypes',
      name: 'Información paradigmática',
    },
  ]);

  return { tabs };
}
