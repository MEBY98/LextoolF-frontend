<template>
  <div class="br-sideleft overflow-y-auto">
    <label class="sidebar-label pd-x-15 mg-t-20">Menú</label>
    <div class="br-sideleft-menu">
      <template v-for="link in links" :key="link.text">
        <router-link
          v-if="!link.children"
          active-class="active"
          :to="link.to"
          class="br-menu-link"
        >
          <div class="br-menu-item">
            <show-icon :icon="link.icon" :style-icon="styleIcon"></show-icon>
            <!-- <i :class="link.icon" class="menu-item-icon icon tx-25"></i> -->
            <span class="menu-item-label">{{ link.text }}</span>
            <i
              v-if="link.children"
              class="menu-item-arrow fa fa-angle-down"
            ></i>
          </div>
        </router-link>
        <div v-else class="u-pointer br-menu-link show-sub">
          <div class="br-menu-item">
            <i class="menu-item-icon icon ion-ios-filing-outline tx-24"></i>
            <span class="menu-item-label">{{ link.text }}</span>
            <i class="menu-item-arrow fa fa-angle-down"></i>
          </div>
        </div>

        <ul v-if="link.children" class="br-menu-sub nav flex-column">
          <li
            v-for="children in link.children"
            :key="children.text"
            class="nav-item hvr-forward"
          >
            <router-link :to="children.to" class="nav-link">
              {{ children.text }}
            </router-link>
          </li>
        </ul>
      </template>
    </div>
    <br />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ShowIcon from '@/components/shared/ShowIcon.vue';

export default defineComponent({
  components: {
    'show-icon': ShowIcon,
  },
  props: {},
  setup() {
    return {};
  },
  data: () => ({
    styleIcon: {
      fontSize: '20px',
      color: '#ccc',
      opacity: 1,
    },
    links: [
      {
        text: 'Estudios fraseográficos',
        icon: 'BookOutlined',
        to: { name: 'studies' },
      },
      {
        text: 'Reportes',
        icon: 'BarChartOutlined',
        to: { name: 'reports' },
      },
    ],
  }),
  computed: {},
  methods: {},
});
</script>
<style lang="scss" scoped>
.menu-item-label {
  font-weight: 500;
}
.br-menu-link.active {
  color: #fff;
  background: #0a1017;
}
</style>
