import { store } from './../../store/store';
import router from './../router';

export const AuthGuard = (to, from) => {
  if (!store.site.user) {
    router.push({ name: 'login' });
    return false;
  }
  return true;
};
