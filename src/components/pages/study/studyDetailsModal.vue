<template>
  <a-modal title="Detalles">
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
            Siglas del Estudio:
            <span style="font-weight: 500">{{ selectedStudy.shortName }}</span>
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
        <a-table
          :data-source="selectedStudy.dictionaries"
          :row-key="(record) => record.id"
          :columns="columns"
          bordered
        ></a-table>
      </a-form-item>
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
  props: ['selectedStudy'],
  data() {
    const columns = [
      {
        title: 'Siglas del Diccionario',
        dataIndex: 'shortName',
      },
      {
        title: 'Siglas del Autor',
        dataIndex: 'author',
        sorter: true,
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
        title: 'Año de Publicacion',
        dataIndex: 'annoOfPublication',
        sorter: true,
      },
    ];
    const selectedStudyData = {};
    return {
      columns,
      selectedStudyData,
    };
  },
  methods: {
    s() {
      console.log(this.selectedStudyData);
    },
  },
});
</script>
