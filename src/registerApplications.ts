import { LifeCycles, registerApplication, start } from 'single-spa';

registerApplication({
  name: '@vue-mf/automatic-entry',
  app: (): Promise<LifeCycles> =>
    (window as any).System.import('http://localhost:8503/js/app.js'),
  activeWhen: (loc) => true,
});

start();
