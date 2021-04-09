<template>
  <transition
    appear
    mode="out-in"
    v-bind="$attrs"
    :duration="computedDuration"
    :enter-active-class="enterActiveClass"
    :leave-active-class="leaveActiveClass"
  >
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    name: {
      type: String,
      default: 'fadeIn',
    },
    duration: {
      type: [Object, String],
      default: '2',
    },
  },
  data() {
    return {
      durations: {
        1: { enter: 100, leave: 100 },
        2: { enter: 150, leave: 150 },
        3: { enter: 200, leave: 200 },
        4: { enter: 250, leave: 250 },
      },
    };
  },
  computed: {
    enterActiveClass(): string {
      return `animated ${this.name}`;
    },
    computedDuration(): object {
      const { duration, durations } = this;
      return typeof duration == 'string' ? durations[duration] : duration;
    },
    leaveActiveClass(): string {
      let leave;
      switch (this.name) {
        case 'fadeIn':
          leave = 'fadeOut';
          break;
        case 'zoomIn':
          leave = 'zoomOut';
          break;
        case 'fadeInUpBig':
          leave = 'fadeOutDownBig';
          break;
        case 'fadeInUp':
          leave = 'fadeOutDown';
          break;

        case 'slideInLeft':
          leave = 'slideOutRight';
          break;

        case 'slideInRight':
          leave = 'slideOutLeft';
          break;
      }
      return `animated ${leave}`;
    },
  },
  methods: {},
});
</script>
