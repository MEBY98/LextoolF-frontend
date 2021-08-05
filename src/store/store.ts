import Vue, { reactive } from 'vue';
import { StudyStore } from './modules/study';
import { LayoutStore } from './modules/layout/layout.store';
import { DictionaryStore } from './modules/dictionary';
import {
  EntryStore,
  UbicationStore,
  ClasificationStore,
} from './modules/entry';
import {
  DescriptorTypeStore,
  ObservationStore,
} from './modules/descriptorTabs';
export const store = reactive({
  layout: new LayoutStore(),
  study: new StudyStore(),
  dictionary: new DictionaryStore(),
  entries: [EntryStore],
  ubications: [UbicationStore],
  clasifications: [ClasificationStore],
  lemmaClasifications: [ClasificationStore],
  sublemmaClasifications: [ClasificationStore],
  GeneralDescriptionDescriptorsTypes: [DescriptorTypeStore],
  UseInformationObservations: [ObservationStore],
  OrderLemmaObservations: [ObservationStore],
  DefinitionDescriptorsTypes: [DescriptorTypeStore],
  ContornoDescriptorsTypes: [DescriptorTypeStore],
  ExampleDescriptorsTypes: [DescriptorTypeStore],
  ParadigmaticInfoDescriptorsTypes: [DescriptorTypeStore],
});
