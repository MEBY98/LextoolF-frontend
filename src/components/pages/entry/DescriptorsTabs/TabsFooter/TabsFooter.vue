<template>
  <div class="d-flex flex-row-reverse">
    <a-button
      type="primary"
      class="m-2 d-flex align-items-center justify-center"
      @click="save"
    >
      Guardar
      <SaveOutlined />
    </a-button>
    <a-button
      v-if="!lastTab"
      class="m-2 d-flex align-items-center justify-center"
      type="primary"
      :disabled="disableNextButton"
      @click="goNextTab"
    >
      Siguiente
      <DoubleRightOutlined />
    </a-button>
    <a-button class="m-2" @click="goEntries">Cancelar</a-button>
    <a-button
      v-if="!firstTab"
      class="m-2 d-flex align-items-center justify-center"
      type="primary"
      :disabled="disablePreviewButton"
      @click="goPreviewTab"
    >
      <DoubleLeftOutlined />
      Anterior
    </a-button>
  </div>
</template>

<script lang="ts">
import {
  SaveOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
} from '@ant-design/icons-vue';
import UseTabFooter from './UseTabFooter';
import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    SaveOutlined,
    DoubleRightOutlined,
    DoubleLeftOutlined,
  },
  props: {
    lastTab: {
      type: Boolean,
    },
    firstTab: {
      type: Boolean,
    },
    disableNextButton: {
      type: Boolean,
      default: () => false,
    },
    disablePreviewButton: {
      type: Boolean,
      default: () => false,
    },
  },
  emits: ['save', 'go-next-tab', 'go-preview-tab', 'go-entries'],
  setup(props, context) {
    const { save, goNextTab, goPreviewTab, goEntries } = UseTabFooter(context);
    return {
      save,
      goNextTab,
      goPreviewTab,
      goEntries,
    };
  },
});
</script>
