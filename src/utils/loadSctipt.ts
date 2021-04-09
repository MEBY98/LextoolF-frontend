import config from '@/config';

import { SCRIPTS } from './scripts';

export const loadScripts = async () => {
  (window as any).$ = (window as any).jQuery = require('jquery');
  // let promises = [];
  SCRIPTS.forEach(
    async (scr) =>
      // promises.push(loadScript(`${config.URL}/${scr}`))
      await loadScript(`${config.URL}/${scr}`)
  );
  // await Promise.all(promises);
};

export const unloadScripts = async () => {
  let promises = [];
  SCRIPTS.forEach(async (scr) =>
    promises.push(unloadScript(`${config.URL}/${scr}`))
  );
  await Promise.all(promises);
};

export const loadScript = function (src) {
  return new Promise(function (resolve, reject) {
    let shouldAppend = false;
    let el = document.querySelector(`script[src="${src}"]`);
    if (!el) {
      el = document.createElement('script');
      el['type'] = 'text/javascript';
      el['async'] = true;
      el['src'] = src;
      shouldAppend = true;
    } else if (el.hasAttribute('data-loaded')) {
      resolve(el);
      return;
    }

    el.addEventListener('error', reject);
    el.addEventListener('abort', reject);
    el.addEventListener('load', function loadScriptHandler() {
      el.setAttribute('data-loaded', 'true');
      resolve(el);
    });

    if (shouldAppend) document.head.appendChild(el);
  });
};

export const unloadScript = function (src) {
  return new Promise(function (resolve, reject) {
    const el = document.querySelector(`script[src="${src}"]`);

    if (!el) {
      reject();
      return;
    }

    document.head.removeChild(el);

    resolve(null);
  });
};
