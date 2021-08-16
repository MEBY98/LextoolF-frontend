<template>
  <a-modal
    :visible="visible"
    title="Detalles de la Entrada"
    width="500px"
    :footer="null"
    @cancel="closeModal"
  >
    <a-form :model="selectedEntryData">
      <a-form-item :colon="false">
        <template #label>
          <span style="font-weight: 700">
            Lemma:
            <span style="font-weight: 500">{{ selectedEntry.lemma }}</span>
          </span>
        </template>
      </a-form-item>
      <a-form-item :colon="false">
        <template #label>
          <span style="font-weight: 700">
            Unidad Fraseológica:
            <span style="font-weight: 500">{{ selectedEntry.UF }}</span>
          </span>
        </template>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
/* eslint-disable vue/no-mutating-props */
import { defineComponent } from 'vue';
import { CheckOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    CheckOutlined,
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['selectedEntry', 'visible'],
  emits: ['close-modal'],
  data() {
    const selectedEntryData = {};
    return {
      selectedEntryData,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
  },
});
</script>
