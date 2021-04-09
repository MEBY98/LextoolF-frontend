<template>
  <all-excels-table></all-excels-table>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, Ref } from 'vue';
import AllExcelsTable from './AllExcelsTable.vue';

export default defineComponent({
  components: { AllExcelsTable },
  props: {},
  setup(props) {
    return {};
  },
});
</script>
<style lang="scss" scoped></style>
