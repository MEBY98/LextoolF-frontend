<template>
  <div class="d-flex flex-row-reverse">
    <a-button
      class="d-flex align-items-center justify-center m-1"
      type="primary"
      html-type="submit"
      @click="clickSubmit"
    >
      {{ submitLabel }}
      <show-icon :icon="submitIcon" :style-icon="submitIconStyle"></show-icon>
    </a-button>
    <a-button class="m-1" @click="clickCancel">{{ cancelLabel }}</a-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ShowIcon from './ShowIcon.vue';
export default defineComponent({
  components: {
    'show-icon': ShowIcon,
  },
  props: {
    submitLabel: {
      type: String,
    },
    cancelLabel: {
      type: String,
    },
    submitIcon: {
      type: String,
      default: () => '',
    },
    submitIconStyle: {
      type: Object,
      default: () => {
        return {
          fontSize: '16px',
          color: 'white',
        };
      },
    },
  },
  emits: ['click-cancel', 'click-submit'],
  setup(props, context) {
    const clickCancel = () => context.emit('click-cancel');
    const clickSubmit = () => context.emit('click-submit');
    return {
      clickCancel,
      clickSubmit,
    };
  },
});
</script>
