<template>
  <result
    class="u-absCenter"
    :status="status"
    :title="status"
    :sub-title="title"
  >
    <template #extra>
      <a-button class="mr-3" @click="$router.go(-1)">
        Ir Atrás
        <template #icon>
          <i class="ion mr-2 ion-arrow-left-c"></i>
        </template>
      </a-button>
      <router-link :to="{ name: 'home' }">
        <a-button type="primary">
          {{ btnText }}
          <template #icon>
            <i class="ion mr-2 ion-home"></i>
          </template>
        </a-button>
      </router-link>
    </template>
  </result>
</template>

<script lang="ts">
import result from 'ant-design-vue/lib/result';
import 'ant-design-vue/lib/result/style';

import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    result,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    status: String,
    // eslint-disable-next-line vue/require-default-prop
    title: String,
    // eslint-disable-next-line vue/require-default-prop
    btnText: String,
  },
  setup() {
    return {};
  },
  data: () => ({}),
  computed: {},
  methods: {},
});
</script>
