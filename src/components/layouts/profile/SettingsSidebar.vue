<template>
  <div class="settings-sidebar is-active">
    <div class="settings-sidebar-inner">
      <div class="user-block">
        <a class="close-settings-sidebar is-hidden">
          <feather type="x" />
        </a>
        <div class="avatar-wrap">
          <Avatar :size="70" :src="$store.user.imgProfile" />
          <div class="badge">
            <feather type="check" />
          </div>
        </div>
        <h4>{{ $store.user.name }}</h4>
        <!-- <p>{{ $store.user.city }}</p> -->
      </div>
      <div class="user-menu">
        <div class="user-menu-inner has-slimscroll">
          <div v-for="(block, i) in blocks" :key="i" class="pb-0 menu-block">
            <ul class="p-0">
              <template v-for="element in block.elements" :key="element.title">
                <router-link
                  v-if="element.show"
                  v-slot="{ isActive }"
                  :to="element.to"
                >
                  <li :class="{ 'is-active': isActive }">
                    <a>
                      <feather :type="element.icon" />
                      <span
                        :class="{
                          'text-black-50': !isActive,
                          primary: isActive,
                        }"
                      >
                        {{ element.title }}
                      </span>
                    </a>
                  </li>
                </router-link>
              </template>
            </ul>
            <div class="separator" style="padding-top: 20px"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { store } from '@/store/store';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  props: {},
  setup() {
    return {};
  },
  data: () => ({
    blocks: [
      {
        elements: [
          {
            icon: 'user',
            title: 'Datos Generales',
            to: { name: 'generalSettings' },
            show: true,
          },
          {
            icon: 'dollar-sign',
            title: 'Mis negocios',
            to: { name: 'myBusiness' },
            show: store.isOwner,
          },
        ],
      },

      {
        elements: [
          {
            icon: 'shield',
            title: 'Verificación de cuenta',
            to: { name: 'accountVerification' },
            show: store.isOwner,
          },
          {
            icon: 'lock',
            title: 'Seguridad',
            to: { name: 'securitySettings' },
            show: true,
          },
        ],
      },
      {
        elements: [
          {
            icon: 'life-buoy',
            title: 'Ayuda',
            to: { name: 'helpSettings' },
            show: true,
          },
        ],
      },
    ],
  }),
  computed: {},
  methods: {},
});
</script>
<style lang="scss" scoped>
.menu-block > ul > a > li {
  > a:hover > span:not(.text-black) {
    color: var(--primary) !important;
  }
}
</style>
