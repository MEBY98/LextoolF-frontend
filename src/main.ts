import './registerApplications';

import App from '@/App.vue';
import { createApp } from 'vue';

import { registerPlugins } from './plugins/allPlugins';

export const app = createApp(App);

registerPlugins(app);
app.mount('#app');
