<template>
  <a-spin :spinning="loading" v-bind="$attrs">
    <template #indicator>
      <loading-outlined :style="loaderStyle" spin />
    </template>
    <slot />
  </a-spin>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { LoadingOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    LoadingOutlined,
  },
  props: {
    iconStyle: {
      type: Object,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    iconSize: {
      type: Number,
      default: 40,
    },
  },

  computed: {
    loaderStyle(): object {
      return {
        'font-size': `${this.iconSize}px`,
        ...this.iconStyle,
      };
    },
  },
  methods: {},
});
</script>
<style lang="scss" scoped>
// .ant-spin-blur{
//    opacity: 0.1 !important;
// }
// .ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
//     padding-top: 30px !important;
// }

// .ant-spin-nested-loading > div > .ant-spin .ant-spin-dot{
//     transform: translate(-50%, -50%) !important;
//      margin: 0px !important;
// }
::v-deep(.ant-spin-dot) {
  // transform: translate(-50%, -50%) !important;
  margin: 0 !important;
}

::v-deep(.ant-spin.ant-spin-spinning) {
  max-height: 100% !important;
}

::v-deep(.ant-spin-text) {
  padding-top: 28px !important;
  font-size: larger;
}

::v-deep(.ant-spin-blur) {
  opacity: 0.2 !important;
}
</style>
