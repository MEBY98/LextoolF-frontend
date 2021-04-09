import { apolloClient } from '../graphql/apolloProvider';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { store } from '@/store/store';
import router from '@/router/router';
import '@/sass/main.scss';
import { antdGlobal } from './antdGlobal';

import { VuelidatePlugin } from '@vuelidate/core';
import { registerSharedComponents } from '@/components/shared/registerSharedComponents';
import { registerScreenSizeGlobal } from './registerScreenSize';
import { registerSharedDirectives } from '@/components/shared/directives/registerSharedDirectives';
import { registerSharedFilters } from '@/components/shared/filters/registerSharedFilters';

export function registerPlugins(app: any): void {
  // global properties
  app.config.productionTip = false;
  app.config.globalProperties.$store = store;

  // Plugins
  app.use(VuelidatePlugin);
  app.use(router);
  antdGlobal(app);
  app.provide(DefaultApolloClient, apolloClient);

  registerSharedComponents(app);
  registerSharedDirectives(app);
  registerSharedFilters(app);
  registerScreenSizeGlobal(app);
}
