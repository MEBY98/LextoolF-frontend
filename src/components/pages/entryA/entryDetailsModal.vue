<template>
  <a-modal
    :visible="visible"
    title="Detalles de la Entrada"
    width="500px"
    :footer="null"
    @cancel="closeModal"
  >
    <a-form :model="selectedEntryData">
      <a-form-item :colon="false">
        <template #label>
          <span style="font-weight: 700">
            Fuente:
            <span style="font-weight: 500">{{ selectedEntry.source }}</span>
          </span>
        </template>
      </a-form-item>
      <a-form-item :colon="false">
        <template #label>
          <span style="font-weight: 700">
            Unidad Fraseológica:
            <span style="font-weight: 500">{{ selectedEntry.UF }}</span>
          </span>
        </template>
      </a-form-item>
      <a-form-item :colon="false">
        <template #label>
          <span style="font-weight: 700">
            Contexto:
            <video
              :src="MINIO_URL_A + '/' + selectedEntry.context"
              v-show="
                selectedEntry.context.split('_')[0] === 'Video_' ||
                fileType === 'Video_'
              "
              width="320"
              height="240"
              controls
            ></video>
            <audio
              :src="MINIO_URL_A + '/' + selectedEntry.context"
              v-show="
                selectedEntry.context.split('_')[0] === 'Audio_' ||
                fileType === 'Audio_'
              "
              controls
            ></audio>
          </span>
        </template>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
/* eslint-disable vue/no-mutating-props */
import { defineComponent } from 'vue';
import { CheckOutlined } from '@ant-design/icons-vue';
import { MINIO_URL_A as minio_url } from '@/utils/minIO.ts';

export default defineComponent({
  components: {
    CheckOutlined,
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['selectedEntry', 'visible', 'fileType'],
  emits: ['close-modal'],
  setup(props, context) {
    const MINIO_URL_A = minio_url;
    function closeModal() {
      context.emit('close-modal');
    }
    return {
      MINIO_URL_A,
      closeModal,
    };
  },
  data() {
    const selectedEntryData = {};
    return {
      selectedEntryData,
    };
  },
});
</script>
