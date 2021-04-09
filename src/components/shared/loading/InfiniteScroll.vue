<template>
  <slot></slot>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    distance: {
      type: Number,
      default: 0,
    },
  },
  emits: ['fetch'],
  data: () => ({}),
  computed: {},
  mounted() {
    this.scrollWindow();
  },
  methods: {
    scrollWindow() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop +
            window.innerHeight +
            this.distance >=
          document.documentElement.scrollHeight;
        if (bottomOfWindow && !this.loading) {
          this.$emit('fetch');
        }
      };
    },
  },
});
</script>
