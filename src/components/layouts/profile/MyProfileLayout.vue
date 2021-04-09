<template>
  <div class="view-wrapper is-full">
    <SettingsSidebar />

    <div class="settings-wrapper p-4">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '@/sass/app.scss';
import SettingsSidebar from './SettingsSidebar.vue';
import BgGrayMixin from '../mixins/bgGray.js';
import { User } from '@/graphql/modules/user/user.model';
import { store } from '@/store/store';
import { apolloQuery } from '@/graphql/apollo';
import { getByIdUserQuery } from '@/graphql/modules/user/querys';
import { FetchPolicy } from '@/graphql/apolloProvider';

export default defineComponent({
  components: {
    SettingsSidebar,
  },
  mixins: [BgGrayMixin],
  async beforeRouteEnter(to, from, next) {
    const { data, errors } = await User.getById(
      store.user._id,
      FetchPolicy.cache_first
    );
    if (data) {
      delete data.imgProfile;
      store.site.user.assign(data);
      next();
    } else {
      next({ name: '404' });
    }
  },
  props: {},
  data: () => ({
    userData: {},
  }),
  computed: {},
  methods: {},
});
</script>
<style lang="scss" scoped></style>
