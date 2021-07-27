import { apolloClient, apolloClientA } from '../graphql/apolloProvider';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { store } from '@/store/store';
import router from '@/router/router';
import { antdGlobal } from './antdGlobal';
import Spinner from '../components/shared/Spinner.vue';
import { VuelidatePlugin } from '@vuelidate/core';

export function registerPlugins(app: any): void {
  // global properties
  app.config.productionTip = false;
  app.config.globalProperties.$store = store;

  // Plugins
  app.use(VuelidatePlugin);
  app.use(router);
  antdGlobal(app);
  app.provide(DefaultApolloClient, apolloClient);
  app.component('Spinner', Spinner);
}
