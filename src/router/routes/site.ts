import { RouteRecordRaw } from 'vue-router';

const home = () => import('@/components/pages/home.vue');
const studies = () => import('@/components/pages/study/Studies/Studies.vue');
const newStudy = () => import('@/components/pages/study/NewStudy/NewStudy.vue');
const editStudy = () =>
  import('@/components/pages/study/EditStudy/EditStudy.vue');
const entries = () => import('@/components/pages/entry/Entries/Entries.vue');
const dictionariesInfo = () =>
  import('@/components/pages/dictionaryInfo/DictionariesInfo.vue');
const authors = () => import('@/components/pages/author/Authors.vue');
const newEntry = () => import('@/components/pages/entry/NewEntry/NewEntry.vue');
const editEntry = () =>
  import('@/components/pages/entry/EditEntry/EditEntry.vue');
const descriptors = () =>
  import('@/components/pages/descriptor/Descriptors.vue');
const ubications = () => import('@/components/pages/ubication/Ubications.vue');
const clasifications = () =>
  import('@/components/pages/clasification/Clasifications.vue');
const reports = () => import('@/components/pages/report/Reports.vue');

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
    name: 'dictionariesInfo',
    exact: true,
    path: 'dictionariesInfo',
    component: dictionariesInfo,
  },
  {
    name: 'authors',
    exact: true,
    path: 'authors',
    component: authors,
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
    name: 'entries',
    exact: true,
    path: 'entries',
    component: entries,
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
    name: 'descriptors',
    exact: true,
    path: 'descriptors',
    component: descriptors,
  },
  {
    name: 'ubications',
    exact: true,
    path: 'ubications',
    component: ubications,
  },
  {
    name: 'clasifications',
    exact: true,
    path: 'clasifications',
    component: clasifications,
  },
  {
    name: 'reports',
    exact: true,
    path: 'reports',
    component: reports,
  },
];
