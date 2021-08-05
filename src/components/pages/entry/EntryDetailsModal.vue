<template>
  <a-modal :visible="visible" :footer="null" width="700px" @cancel="closeModal">
    <div
      class="container overflow-scroll"
      style="
        height: 400px;
        width: 600px;
        background-color: rgba(255, 0, 0, 0.1);
      "
    >
      <img
        v-for="(i, index) in entry.context"
        :key="index"
        :src="MINIO_URL + '/' + entry.context[index]"
      />
    </div>
  </a-modal>
</template>

<script lang="ts">
import { LoadingOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';

import { MINIO_URL as minio_url } from '@/utils/minIO.ts';

export default defineComponent({
  components: {
    LoadingOutlined,
  },
  props: {
    entry: {
      type: Object,
      default: () => null,
    },
    visible: {
      type: Boolean,
    },
  },
  emits: ['close-modal'],
  setup(props, context) {
    const MINIO_URL = minio_url;
    function closeModal() {
      context.emit('close-modal');
    }
    return {
      MINIO_URL,
      closeModal,
    };
  },
});
</script>
