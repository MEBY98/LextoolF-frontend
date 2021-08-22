import { RouteRecordRaw } from 'vue-router';

const home = () => import('@/components/pages/home.vue');
const studies = () => import('@/components/pages/study/studies.vue');
const newStudy = () => import('@/components/pages/study/newStudy.vue');
const editStudy = () => import('@/components/pages/study/editStudy.vue');
const dictionaries = () =>
  import('@/components/pages/dictionary/dictionaries.vue');
const newEntry = () => import('@/components/pages/entry/newEntry.vue');
const editEntry = () => import('@/components/pages/entry/editEntry.vue');

const sources = () => import('@/components/pages/sourcesA/sources.vue');
const dictionariesA = () =>
  import('@/components/pages/dictionaryA/dictionariesA.vue');
const newDictionaryA = () =>
  import('@/components/pages/dictionaryA/newDictionaryA.vue');
const lemario = () => import('@/components/pages/lemarioA/lemario.vue');
const extractionTask = () =>
  import('@/components/pages/entryA/extractionTask.vue');
const newEntryA = () => import('@/components/pages/entryA/newEntryA.vue');
const newSource = () => import('@/components/pages/sourcesA/newSource.vue');
const upload = () => import('@/components/pages/entryA/upload.vue');

export const SiteRoutes: RouteRecordRaw[] & any = [
  {
    name: 'home',
    exact: true,
    path: '',
    component: home,
  },
  {
    name: 'studies',
    exact: true,
    path: 'studies',
    component: studies,
  },
  {
    name: 'newStudy',
    exact: true,
    path: 'newStudy',
    component: newStudy,
  },
  {
    name: 'editStudy',
    exact: true,
    path: 'editStudy/:id',
    component: editStudy,
  },
  {
    name: 'dictionaries',
    exact: true,
    path: 'dictionaries',
    component: dictionaries,
  },
  {
    name: 'newEntry',
    exact: true,
    path: 'newEntry/:letter',
    component: newEntry,
  },
  {
    name: 'editEntry',
    exact: true,
    path: 'editEntry/:id',
    component: editEntry,
  },
  {
    name: 'sources',
    exact: true,
    path: 'sources',
    component: sources,
  },
  {
    name: 'newSourceA',
    exact: true,
    path: 'newSourceA',
    component: newSource,
  },
  {
    name: 'dictionariesA',
    exact: true,
    path: 'dictionariesA',
    component: dictionariesA,
  },
  {
    name: 'newDictionaryA',
    exact: true,
    path: 'newDictionaryA',
    component: newDictionaryA,
  },
  {
    name: 'lemario',
    exact: true,
    path: 'lemario',
    component: lemario,
  },
  {
    name: 'extractionTask',
    exact: true,
    path: 'extractionTask',
    component: extractionTask,
  },
  {
    name: 'newEntryA',
    exact: true,
    path: 'newEntryA/:source',
    component: newEntryA,
  },
  {
    name: 'upload',
    exact: true,
    path: 'upload',
    component: upload,
  },
];
