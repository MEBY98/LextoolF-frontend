<template>
  <div class="row bg-white card card-sales row-sm mg-b-20">
    <div class="bg-white border-bottom">
      <h6 class="card-title">Excel</h6>
    </div>
    <div class="col-12 mt-4">
      <a-tabs type="card">
        <a-tab-pane key="1" tab="Gestión de excel">
          <ExcelManagment />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Unidad fraseológica">
          <AutomaticEntry />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, Ref } from 'vue';
import AutomaticEntry from '../../entry/automaticEntry/AutomaticEntry.vue';
import ExcelManagment from './ExcelManagment.vue';

export default defineComponent({
  components: { AutomaticEntry, ExcelManagment },
  props: {},
  setup(props) {
    return {};
  },
});
</script>
<style lang="scss" scoped></style>
