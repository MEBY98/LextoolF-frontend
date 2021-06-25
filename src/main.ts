import App from '@/App.vue';
import { createApp } from 'vue';
import { registerPlugins } from './plugins/allPlugins';

export const app = createApp(App);

import Antd from 'ant-design-vue';
app.use(Antd);

registerPlugins(app);
app.mount('#app');
