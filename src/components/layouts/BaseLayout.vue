<template>
  <div class="br-logo">
    <a @click="goToStudies">
      <h2 class="mb-1 ml-2">
        <span class="text-primary">Lex</span>
        <span class="fw-500">tool &#402;</span>
      </h2>
    </a>
  </div>
  <div :class="{ active: $store.layout.isLoading }" class="spinner-base-layout">
    <div class="h-100 position-relative w-100">
      <spinner
        wrapper-class-name="u-absCenter"
        :tip="$store.layout.loadingTip"
        :loading="true"
      ></spinner>
    </div>
  </div>

  <Sidebar />
  <Navbar />

  <!-- <div
      class="br-mainpanel br-mainpanel-large d-flex flex-column"
      style="position: relative"
    >
      <div class="br-pageheader pd-y-15 pd-l-20">
      <BreadCrumbs />
    </div>
      br-pageheader

      <div class="container-fluid pd-30">
        <router-view />
      </div>
      <Footer />
      <ResizeSensor />
    </div> -->
  <div
    class="br-mainpanel br-mainpanel-large d-flex flex-column"
    style="position: relative"
  >
    <div class="container-fluid pd-30">
      <router-view v-slot="{ Component }">
        <transition name="slide-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
  <backTop />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import backTop from 'ant-design-vue/lib/back-top';
import 'ant-design-vue/lib/back-top/style';
import Sidebar from './shared/Sidebar.vue';
import Navbar from './shared/navbar/Navbar.vue';
import Footer from './shared/Footer.vue';
import ResizeSensor from './shared/ResizeSensor.vue';
import BreadCrumbs from './shared/BreadCrumbs.vue';
import { loadScripts } from '@/utils/loadSctipt';
import UseRoutes from '@/router/UseRoutes';

export default defineComponent({
  components: {
    backTop,
    Sidebar,
    Navbar,
    Footer,
    ResizeSensor,
    BreadCrumbs,
  },
  props: {},
  setup() {
    const { goToStudies } = UseRoutes();
    return { goToStudies };
  },
  data: () => ({}),
  computed: {},
  mounted() {
    loadScripts();
  },
  methods: {},
});
</script>
<style lang="scss">
.spinner-base-layout {
  position: fixed;
  margin-top: -60px;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: white;
  opacity: 0;
  transition: all 0.2s;

  & > div > div > .anticon-loading {
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
  }

  &.active {
    opacity: 0.9;
    z-index: 99999999999;
  }

  .ant-spin-dot {
    position: absolute !important;
    top: 50%;
    left: 50%;
  }
  .ant-spin-text {
    position: absolute !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 18%);
  }
}
.br-mainpanel-large {
  min-height: 100vh;
}

.slide-fade-enter-from {
  opacity: 0;
}
.slide-fade-enter-active {
  animation: slide-in 0.5s ease-out forwards;
  transition: opacity 0.5s;
}
.slide-fade-leave-to {
  opacity: 0;
}
.slide-fade-leave-active {
  animation: slide-out 0.5s ease-out forwards;
  transition: opacity 0.5s ease;
}

@keyframes slide-in {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes slide-out {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(20px);
  }
}
</style>
