import Vue, { reactive } from 'vue';
import { StudyStore } from './modules/study';
import { LayoutStore } from './modules/layout/layout.store';
import { DictionaryStore } from './modules/dictionary';
import { EntryStore } from './modules/entry';
import { SourcesStore } from './modules/sourcesA';

export const store = reactive({
  layout: new LayoutStore(),
  study: new StudyStore(),
  dictionary: new DictionaryStore(),
  entries: [EntryStore],
  sources: new SourcesStore(),
});
