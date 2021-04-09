<template>
  <div
    class="resize-sensor"
    style="
      position: absolute;
      left: 0px;
      top: 0px;
      right: 0px;
      bottom: 0px;
      overflow: hidden;
      z-index: -1;
      visibility: hidden;
    "
  >
    <div
      class="resize-sensor-expand"
      style="
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        z-index: -1;
        visibility: hidden;
      "
    >
      <div
        style="
          position: absolute;
          left: 0px;
          top: 0px;
          transition: all 0s ease 0s;
          width: 100000px;
          height: 100000px;
        "
      ></div>
    </div>
    <div
      class="resize-sensor-shrink"
      style="
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        z-index: -1;
        visibility: hidden;
      "
    >
      <div
        style="
          position: absolute;
          left: 0;
          top: 0;
          transition: 0s;
          width: 200%;
          height: 200%;
        "
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  props: {},
  setup() {
    return {};
  },
  data: () => ({}),
  computed: {},
  methods: {},
});
</script>
