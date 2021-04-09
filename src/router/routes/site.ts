import { RouteRecordRaw } from 'vue-router';

const CreateProject = () =>
  import('@/components/pages/project/CreateProject.vue');

const ExcelView = () => import('@/components/pages/UF/excel/ExcelView.vue');

const AutomaticEntry = () =>
  import('@/components/pages/entry/automaticEntry/AutomaticEntry.vue');

const EditEntry = () =>
  import('@/components/pages/entry/editEntries/EditEntries.vue');

export const SiteRoutes: RouteRecordRaw[] & any = [
  {
    name: 'createProject',
    exact: true,
    path: 'create-project',
    component: CreateProject,
  },
  {
    path: 'home',
    exact: true,
    name: 'home',
  },
  {
    path: 'excel',
    exact: true,
    name: 'excel',
    component: ExcelView,
  },
];
