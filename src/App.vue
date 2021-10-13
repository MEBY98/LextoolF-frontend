<template>
  <a-config-provider :locale="es">
    <div id="app">
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import es from 'ant-design-vue/lib/locale-provider/es_ES';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');
export default defineComponent({
  name: 'App',
  components: {},
  data() {
    return {
      es,
    };
  },
});
</script>
