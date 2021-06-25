import { RouteRecordRaw } from 'vue-router';
import BaseLayout from '../components/layouts/BaseLayout.vue';
import { SiteRoutes } from './routes/site';

const routes: RouteRecordRaw[] & any = [
  {
    path: '',
    name: 'home',
    component: BaseLayout,
    children: [...SiteRoutes],
  },
  {
    path: '/:pathMatch(.*)',
    redirect: { name: '404' },
    component: null,
  },
];

export default routes;
