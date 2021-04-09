<template>
  <div class="py-3">
    <a-tabs tab-position="left">
      <a-tab-pane key="1" tab="Subir excel">
        <upload-excel></upload-excel>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Excels subidos">
        <div class="px-3">
          <uploaded-excels></uploaded-excels>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, Ref } from 'vue';
import UploadedExcels from './uploadedExcels/UploadedExcels.vue';
import UploadExcel from './UploadExcel.vue';

export default defineComponent({
  components: { UploadExcel, UploadedExcels },
  props: {},
  setup(props) {
    return {};
  },
});
</script>
<style lang="scss" scoped>
::v-deep(.ant-tabs .ant-tabs-left-bar .ant-tabs-tab) {
  text-align: left;
}
</style>
