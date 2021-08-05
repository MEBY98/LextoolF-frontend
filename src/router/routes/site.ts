import { RouteRecordRaw } from 'vue-router';

const home = () => import('@/components/pages/home.vue');
const studies = () => import('@/components/pages/study/studies.vue');
const newStudy = () => import('@/components/pages/study/newStudy.vue');
const editStudy = () => import('@/components/pages/study/editStudy.vue');
const dictionaries = () =>
  import('@/components/pages/dictionary/dictionaries.vue');

const newEntry = () => import('@/components/pages/entry/newEntry.vue');
const editEntry = () => import('@/components/pages/entry/editEntry.vue');
<<<<<<< HEAD
=======
const sources = () => import('@/components/pages/sourcesA/sources.vue');
const dictionariesA = () =>
  import('@/components/pages/dictionaryA/dictionariesA.vue');
const newDictionaryA = () =>
  import('@/components/pages/dictionaryA/newDictionaryA.vue');
const lemario = () => import('@/components/pages/lemarioA/lemario.vue');
>>>>>>> de0e6ee4b3326d7004cc51503a3d578a7f7da214

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
<<<<<<< HEAD
=======
  }
  {
    name: 'sources',
    exact: true,
    path: 'sources',
    component: sources,
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
>>>>>>> de0e6ee4b3326d7004cc51503a3d578a7f7da214
  },
];
