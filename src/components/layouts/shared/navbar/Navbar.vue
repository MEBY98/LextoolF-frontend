<template>
  <div class="br-header">
    <div class="left">
      <div class="navicon hidden-md-down mt-1 ml-4">
        <!-- <a id="btnLeftMenu"><i class="icon ion-navicon-round"></i></a> -->
        <a id="btnLeftMenu">
          <show-icon
            v-if="SideBarOpen"
            :icon="'LeftCircleOutlined'"
            :style-icon="{
              fontSize: '32px',
              color: '#08c',
            }"
            @click="SideBarOpen = !SideBarOpen"
          ></show-icon>
          <show-icon
            v-else
            :icon="'RightCircleOutlined'"
            :style-icon="{
              fontSize: '32px',
              color: '#08c',
            }"
            @click="SideBarOpen = !SideBarOpen"
          ></show-icon>
        </a>
      </div>
      <div class="navicon-left hidden-lg-up">
        <!-- <a id="btnLeftMenuMobile">
          <i class="icon ion-navicon-round"></i>
        </a> -->
        <a id="btnLeftMenuMobile">
          <show-icon :icon="'RightCircleOutlined'"></show-icon>
        </a>
      </div>
    </div>
    <!-- br-header-left -->

    <!-- br-header-right -->
  </div>
</template>

<script lang="ts">
import ShowIcon from '@/components/shared/ShowIcon.vue';
import { defineComponent, Ref, ref } from 'vue';

export default defineComponent({
  components: {
    'show-icon': ShowIcon,
  },
  props: {},
  setup() {
    const SideBarOpen: Ref<boolean> = ref(true);
    return {
      SideBarOpen,
    };
  },
  data: () => ({}),
  computed: {},
  methods: {},
});
</script>
<style lang="scss" scoped>
.br-header,
.br-logo {
  z-index: 999;
}
</style>
