import { store } from './../../store/store';
import router from './../router';

export const UnauthGuard = (_, __) => {
  if (store.site.user == null || store.site.isSessionClosed) {
    return true;
  }
  router.push({ name: 'generalSettings' });
  return false;
};
