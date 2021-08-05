<template>
  <div class="d-flex flex-row-reverse">
    <a-button
      type="primary"
      class="m-2 d-flex align-items-center justify-center"
      @click="save"
    >
      Guardar
      <PlusOutlined />
    </a-button>
    <a-button
      v-if="!lastTab"
      class="m-2 d-flex align-items-center justify-center"
      type="primary"
      @click="goNextTab"
    >
      Siguiente
      <DoubleRightOutlined />
    </a-button>
    <a-button class="m-2" @click="goDictionaries">Cancelar</a-button>
    <a-button
      v-if="!firstTab"
      class="m-2 d-flex align-items-center justify-center"
      type="primary"
      @click="goPreviewTab"
    >
      <DoubleLeftOutlined />
      Anterior
    </a-button>
  </div>
</template>

<script lang="ts">
import {
  PlusOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
} from '@ant-design/icons-vue';

import TabsFooterMixin from './TabsFooter.mixin.js';

import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    PlusOutlined,
    DoubleRightOutlined,
    DoubleLeftOutlined,
  },
  mixins: [TabsFooterMixin],
  props: {
    lastTab: {
      type: Boolean,
    },
    firstTab: {
      type: Boolean,
    },
  },
});
</script>
