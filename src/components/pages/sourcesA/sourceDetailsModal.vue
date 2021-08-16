<template>
  <a-modal
    :visible="visible"
    title="Detalles de la Fuente"
    width="500px"
    :footer="null"
    @cancel="closeModal"
  >
    <a-form :model="selectedSourceData">
      <a-form-item :colon="false">
        <template #label>
          <span style="font-weight: 700">
            Nombre de la Fuente:
            <span style="font-weight: 500">{{ selectedSource.name }}</span>
          </span>
        </template>
      </a-form-item>
      <a-form-item :colon="false">
        <template #label>
          <span style="font-weight: 700">
            Referencia:
            <span style="font-weight: 500">{{ selectedSource.ref }}</span>
          </span>
        </template>
      </a-form-item>
      <a-form-item :colon="false">
        <template #label>
          <span style="font-weight: 700">
            Tipo:
            <span style="font-weight: 500">{{ selectedSource.type }}</span>
          </span>
        </template>
      </a-form-item>
      <a-form-item :colon="false">
        <template #label>
          <span style="font-weight: 700">
            Sub-Tipo:
            <span style="font-weight: 500">{{ selectedSource.subType }}</span>
          </span>
        </template>
      </a-form-item>
      <a-form-item :colon="false">
        <template #label>
          <span style="font-weight: 700">
            Archivo:
            <span style="font-weight: 500">{{ selectedSource.file }}</span>
          </span>
        </template>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
/* eslint-disable vue/no-mutating-props */
import { defineComponent, h } from 'vue';
import { CheckOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    CheckOutlined,
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['selectedSource', 'visible'],
  emits: ['close-modal'],
  data() {
    const selectedSourceData = {};
    return {
      selectedSourceData,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
  },
});
</script>
