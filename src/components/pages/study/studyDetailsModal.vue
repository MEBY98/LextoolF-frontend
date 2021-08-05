<template>
  <a-modal
    :visible="visible"
    title="Detalles del Estudio"
    width="775px"
    :footer="null"
    @cancel="closeModal"
  >
    <a-form :model="selectedStudyData">
      <a-form-item :colon="false">
        <template #label>
          <span style="font-weight: 700">
            Nombre del Estudio:
            <span style="font-weight: 500">{{ selectedStudy.name }}</span>
          </span>
        </template>
      </a-form-item>
      <a-form-item :colon="false">
        <template #label>
          <span style="font-weight: 700">
            Periodo del Estudio:
            <span style="font-weight: 500">{{ selectedStudy.period }}</span>
          </span>
        </template>
      </a-form-item>
      <a-table
        :data-source="selectedStudy.dictionaries"
        :row-key="(record) => record.id"
        :columns="columns"
        :pagination="false"
        bordered
      ></a-table>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
/* eslint-disable vue/no-mutating-props */
import { defineComponent, h } from 'vue';
import { CheckOutlined } from '@ant-design/icons-vue';
import { FraseologicStudy } from '@/models/fraseologicStudy.model';

export default defineComponent({
  components: {
    CheckOutlined,
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['selectedStudy', 'visible'],
  emits: ['close-modal'],
  data() {
    const columns = [
      {
        title: 'Nombre del Diccionario',
        dataIndex: 'shortName',
      },
      {
        title: 'Siglas',
        dataIndex: 'shortName',
      },
      {
        title: 'Siglas del Autor',
        dataIndex: 'author',
        customRender: ({ text }) => {
          let result = [];
          text.forEach((element) => {
            result.push(element.siglas);
            result.push(', ');
          });
          return h('span', { href: 'javascript:;' }, result);
        },
      },
      {
        title: 'Año',
        dataIndex: 'annoOfPublication',
      },
    ];
    const selectedStudyData = {};
    return {
      columns,
      selectedStudyData,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
  },
});
</script>
