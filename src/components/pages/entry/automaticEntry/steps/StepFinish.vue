<template>
  <div class="d-flex justify-center">
    <div class="w-25 mt-4 flexC">
      <a-space size="middle" class="text-center" direction="vertical">
        <SpreadsheetIcon class="icon-generate" />
        <a-button class="w-100" type="primary" @click="$emit('save')">
          Guardar entradas generadas
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
import SpreadsheetIcon from '@/components/shared/icons/SpreadsheetIcon.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    SpreadsheetIcon,
  },
  props: {},
  emits: ['save'],
  setup() {
    return {};
  },
  data: () => ({}),
  computed: {},
  methods: {},
});
</script>
<style lang="scss" scoped>
.icon-generate {
  width: 200px;
  height: auto;
}
</style>
