<template>
  <a-modal
    title="Detalles del autor"
    :visible="visible"
    :footer="null"
    @cancel="closeModal"
  >
    <div>
      <span :style="{ 'font-weight': '700' }">
        Nombre del autor:
        <span :style="{ 'font-weight': '500' }">
          {{ selectedAuthor.name }}
        </span>
      </span>
    </div>
    <br />
    <div>
      <span :style="{ 'font-weight': '700' }">
        Siglas del autor:
        <span :style="{ 'font-weight': '500' }">
          {{ selectedAuthor.siglas }}
        </span>
      </span>
    </div>
    <br />
  </a-modal>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    visible: {
      type: Boolean,
    },
    selectedAuthor: {
      type: Object,
    },
  },
  emits: ['close-modal'],
  setup(props, context) {
    const closeModal = () => {
      context.emit('close-modal');
    };
    return {
      closeModal,
    };
  },
});
</script>
