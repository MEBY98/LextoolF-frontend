<template>
  <a-config-provider :locale="es">
    <div id="app">
      <router-view></router-view>
      <!-- <HelloWorldVue /> -->
    </div>
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import es from 'ant-design-vue/lib/locale-provider/es_ES';
import moment from 'moment';
import HelloWorldVue from './components/HelloWorld.vue';
import 'moment/locale/es';
import { store } from './store/store';
import { AuthService } from './graphql/modules/auth/auth.service';
import { classie } from './utils/classie';

moment.locale('es');

export default defineComponent({
  name: 'App',
  components: {},
  data() {
    return {
      es,
    };
  },
  beforeCreate() {
    store.site.tryAutoLogin();
  },
});
</script>
