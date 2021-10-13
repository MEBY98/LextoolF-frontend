import UseAllDescriptorsInitData from '../../DescriptorsInitOnMounted/UseAllDescriptorsInitData';

export default function UseUpdateStoreDescriptors(tab) {
  const {
    GeneralDescriptionInitData,
    OrderLemmaInitData,
    UseInformationInitData,
    DefinitionInitData,
    ContornoInitData,
    ExampleInitData,
    ParadigmaticInfoInitData,
  } = UseAllDescriptorsInitData();
  const updateStore = async () => {
    if (tab === 1 || tab === 'Descripción general') {
      await GeneralDescriptionInitData();
    } else if (tab === 2 || tab === 'Ordernación y lematización') {
      await OrderLemmaInitData();
    } else if (tab === 3 || tab === 'Información de uso') {
      await UseInformationInitData();
    } else if (tab === 4 || tab === 'Definición' || tab === 'Contorno') {
      await DefinitionInitData();
      await ContornoInitData();
    } else if (tab === 5 || tab === 'Ejemplificación') {
      await ExampleInitData();
    } else if (tab === 6 || tab === 'Información paradigmática') {
      await ParadigmaticInfoInitData();
    }
  };
  return {
    updateStore,
  };
}
