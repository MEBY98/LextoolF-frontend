import { RouteRecordRaw } from 'vue-router';

const Login = () => import('../../components/pages/auth/Login.vue');
const Register = () => import('../../components/pages/auth/Register.vue');
// import { UnauthGuard } from '../guards/unauth.guard';

export const AuthRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { scrollTop: true },
    // beforeEnter: UnauthGuard,
  },
  {
    path: '/signup',
    name: 'signup',
    component: Register,
    meta: { scrollTop: true },
    // beforeEnter: UnauthGuard,
  },
];
