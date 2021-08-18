<template>
  <a-modal :visible="visible" :footer="null" width="700px" @cancel="closeModal">
    <div
      class="container overflow-scroll"
      style="
        height: 250px;
        width: 350px;
        background-color: rgba(255, 0, 0, 0.1);
      "
    >
      <img
        v-for="(i, index) in entry.context"
        :key="index"
        :src="MINIO_URL + '/' + entry.context[index]"
      />
    </div>
    <a-divider></a-divider>
    <div class="d-flex justify-content-center">
      <span style="font-weight: 700">
        Lema:
        <span style="font-weight: 500">{{ entry.lemma.lemma }}</span>
      </span>
      <a-divider type="vertical"></a-divider>
      <span style="font-weight: 700">
        Clasificacion:
        <span style="font-weight: 500">
          {{ entry.lemma.clasification.clasification }}
        </span>
      </span>
    </div>
    <a-divider>Sublemas</a-divider>
    <div class="d-flex justify-content-center">
      <div>
        <div v-for="(s, indexS) in entry.sublemmas" :key="s.id">
          <span class="d-flex-inline" style="font-weight: 700">
            Sublema {{ indexS + 1 }}:
            <span style="font-weight: 500">{{ s.sublemma }}</span>
          </span>
          <a-divider type="vertical"></a-divider>
          <span class="d-flex-inline" style="font-weight: 700">
            Clasificacion:
            <span style="font-weight: 500">
              {{ s.clasification.clasification }}
            </span>
          </span>
        </div>
      </div>
    </div>
    <a-divider>Unidades Fraseologicas</a-divider>
    <div class="d-flex justify-content-center">
      <div>
        <div v-for="(e, indexUFS) in entry.UFs" :key="e.id">
          <span class="d-flex-inline" style="font-weight: 700">
            UF {{ indexUFS + 1 }}:
            <span style="font-weight: 500">{{ e.UF }}</span>
          </span>
        </div>
      </div>
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
