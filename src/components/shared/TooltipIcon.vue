<template>
  <a-tooltip :placement="titlePlacement">
    <template #title>
      <span>{{ title }}</span>
    </template>
    <a @click="click">
      <show-icon :icon="icon" :style-icon="styleIcon"></show-icon>
      <span style="font-weight: 500; margin-left: 5px; margin-top: 12px">
        {{ text }}
      </span>
    </a>
  </a-tooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ShowIcon from './ShowIcon.vue';

export default defineComponent({
  components: {
    'show-icon': ShowIcon,
  },
  props: {
    title: {
      type: String,
      default: () => '',
    },
    titlePlacement: {
      type: String,
      default: () => 'top',
    },
    icon: {
      type: String,
    },
    styleIcon: {
      type: Object,
      default: () => {
        return {
          fontSize: '25px',
          color: '#08c',
          marginBottom: '5px',
          marginLeft: '10px',
        };
      },
    },
    text: {
      type: String,
      default: () => '',
    },
  },
  emits: ['click'],
  setup(props, context) {
    const click = () => {
      context.emit('click');
    };
    return {
      click,
    };
  },
});
</script>
