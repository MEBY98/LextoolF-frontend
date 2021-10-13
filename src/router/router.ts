import modal from 'ant-design-vue/lib/modal';
import { createRouter, createWebHistory } from 'vue-router';

import routes from './routes';

const scrollBehavior = (to: any, from: any, savedPosition: any) => {
  // else {
  const position: any = { left: 0, top: 0 };
  // new navigation.
  // scroll to anchor by returning the selector
  if (to.hash) {
    return {
      el: to.hash,
      behavior: 'smooth',
    };
  }

  // check if any matched route config has meta that requires scrolling to top
  if (to.matched.some((m: any) => m.meta.scrollTop)) {
    return { left: 0, top: 0 };
  }

  if (savedPosition) {
    return savedPosition;
  }

  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  return position;
};

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior,
});

// }

//  Chanche title depending on actual page
router.beforeEach((to, from, next) => {
  modal.destroyAll();
  if (
    to.meta.progress !== false &&
    from.name &&
    !from.fullPath.match(/login/) &&
    !from.fullPath.match(/register/)
  ) {
    // start();
  }

  // if (to.meta.grayBody) {
  //   store.layout.grayBody();
  // } else {
  //   store.layout.whiteBody();
  // }

  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);
  if (nearestWithTitle) document.title = nearestWithTitle.path;

  next();
});

router.afterEach(() => {
  setTimeout(() => {
    // done();
  }, 200);
});

export default router;
