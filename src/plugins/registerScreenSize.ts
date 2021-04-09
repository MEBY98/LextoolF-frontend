import { reactive } from 'vue';

function getScreenHeight() {
  return (
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
  );
}

function getScreenWidth() {
  return (
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  );
}

export function registerScreenSizeGlobal(app) {
  let screenSizeReactive = reactive({
    w: getScreenWidth(),
    h: getScreenHeight(),
  });

  app.config.globalProperties.$s = screenSizeReactive;

  const handleResize = (event) => {
    screenSizeReactive.w = getScreenWidth();
    screenSizeReactive.h = getScreenHeight();
  };

  window.addEventListener('resize', handleResize);
}
