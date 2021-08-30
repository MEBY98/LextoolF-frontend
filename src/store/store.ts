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
import { SourcesStore } from './modules/sourcesA';
import { DictionaryAStore } from './modules/dictionaryA';
import { LemarioStore } from './modules/lemarioA';
import { EntryAStore } from './modules/entryA';
import { OcurrenceRecordStore } from './modules/ocurrenceRecord';

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
  sources: new SourcesStore(),
  dictionariesA: new DictionaryAStore(),
  lemario: new LemarioStore(),
  entriesA: [EntryAStore],
  ocurrencies: [OcurrenceRecordStore],
});
