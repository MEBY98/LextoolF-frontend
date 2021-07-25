import { RouteRecordRaw } from 'vue-router';

const home = () => import('@/components/pages/home.vue');
const studies = () => import('@/components/pages/study/studies.vue');
const newStudy = () => import('@/components/pages/study/newStudy.vue');
const editStudy = () => import('@/components/pages/study/editStudy.vue');
const dictionaries = () =>
  import('@/components/pages/dictionary/dictionaries.vue');

const newEntry = () => import('@/components/pages/entry/newEntry.vue');
const sources = () => import('@/components/pages/sourcesA/sources.vue');

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
    name: 'sources',
    exact: true,
    path: 'sources',
    component: sources,
  },
];
