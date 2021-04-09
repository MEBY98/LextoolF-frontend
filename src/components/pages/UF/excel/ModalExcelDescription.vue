<template>
  <a-modal
    :width="550"
    :visible="visible"
    title="Se subió el excel correctamente"
    style="top: 30px"
    :mask-closable="false"
    @cancel="cancel"
  >
    <div class="mb-3">
      <label for="" class="fw-500">
        Cantidad de hojas del excel: {{ excelData.sheets.length }}
      </label>
      <label for="" class="ml-4 fw-500">
        Primera hoja: {{ excelData.sheets[0].name }}
      </label>
      <label for="" class="ml-4 fw-500">
        Última hoja: {{ excelData.sheets[excelData.sheets.length - 1].name }}
      </label>
    </div>

    <a-table
      :columns="columns"
      :row-key="(record, i) => record.name"
      :data-source="excelData.sheets"
      :pagination="false"
      :scroll="{ y: 300 }"
    ></a-table>

    <template #footer>
      <div class="d-flex">
        <a-button class="ml-auto" type="primary" @click="cancel">
          Aceptar
        </a-button>
      </div>
    </template>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  props: {
    visible: Boolean,
    excelData: Object,
  },
  emits: ['update:visible'],
  data: () => ({
    columns: [
      {
        title: 'Letra',
        dataIndex: 'name',
        // slots: { customRender: 'name' },
      },
      {
        title: 'Cantidad de UF',
        dataIndex: 'rowsCount',
      },
    ],
  }),
  computed: {},
  methods: {
    cancel() {
      this.$emit('update:visible', false);
    },
    handleOk() {
      this.$emit('update:visible', false);
    },
  },
});
</script>
