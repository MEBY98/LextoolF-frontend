<template>
  <a-avatar
    :class="{ 'bg-primary': initial }"
    class="flex-center justify-center"
    v-bind="$attrs"
  >
    <template v-if="!initial" #icon><UserOutlined /></template>
    <span v-if="initial">{{ initialChar }}</span>
  </a-avatar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { UserOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  components: {
    UserOutlined,
  },
  props: {
    initial: {
      type: String,
      default: null,
    },
  },
  setup() {
    return {};
  },
  data: () => ({}),
  computed: {
    initialChar(): string {
      return this.initial?.charAt(0);
    },
  },
  methods: {},
});
</script>
