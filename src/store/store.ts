import { reactive } from 'vue';
import { LayoutStore } from './modules/layout/layout.store';
import { UbicationStore, ClasificationStore } from './modules/entry';
import {
  DescriptorTypeStore,
  ObservationStore,
} from './modules/descriptorTabs';
import { DictionaryInfoStore, AuthorStore } from './modules/dictionaryInfo';
import { FraseologicStudy } from '@/models/FraseologicStudy';
import { DictionaryEntriesDescriptorsAsString } from '@/models/Dictionary';
import { Entry } from '@/models/Entry';
import { Descriptor } from '@/models/Descriptor';

export const store = reactive({
  layout: new LayoutStore(),
  study: new FraseologicStudy(),
  dictionary: new DictionaryEntriesDescriptorsAsString(),
  dictionariesInfo: new Array<DictionaryInfoStore>(),
  authors: new Array<AuthorStore>(),
  entries: new Array<Entry>(),
  ubications: new Array<UbicationStore>(),
  clasifications: new Array<ClasificationStore>(),
  GeneralDescriptionDescriptorsTypes: new Array<DescriptorTypeStore>(),
  UseInformationObservations: new Array<ObservationStore>(),
  OrderLemmaObservations: new Array<ObservationStore>(),
  DefinitionDescriptorsTypes: new Array<DescriptorTypeStore>(),
  ContornoDescriptorsTypes: new Array<DescriptorTypeStore>(),
  ExampleDescriptorsTypes: new Array<DescriptorTypeStore>(),
  ParadigmaticInfoDescriptorsTypes: new Array<DescriptorTypeStore>(),
  NoApplyDescriptor: new Descriptor(),
  NoDescribeDescriptor: new Descriptor(),
});
