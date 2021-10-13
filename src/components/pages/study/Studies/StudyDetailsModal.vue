<template>
  <a-modal
    :visible="visible"
    title="Detalles del estudio"
    width="775px"
    :footer="null"
    @cancel="closeModal"
  >
    <div>
      <span :style="{ 'font-weight': '700' }">
        Nombre del Estudio:
        <span :style="{ 'font-weight': '500' }">
          {{ selectedStudy.name }}
        </span>
      </span>
    </div>
    <br />
    <div>
      <span :style="{ 'font-weight': '700' }">
        Periodo:
        <span :style="{ 'font-weight': '500' }">
          {{ selectedStudy.initYear }} -- {{ selectedStudy.finalYear }}
        </span>
      </span>
    </div>
    <br />
    <div>
      <span :style="{ 'font-weight': '700' }">
        Estado:
        <span :style="{ 'font-weight': '500' }">
          {{ selectedStudy.state }}
        </span>
      </span>
    </div>
    <br />
    <a-table
      :data-source="selectedStudy.dictionaries"
      :row-key="(record) => record.id"
      :columns="columns"
      :pagination="false"
      bordered
    >
      <template #title>
        <span :style="{ 'font-weight': '500' }">Diccionarios</span>
      </template>
    </a-table>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, h } from 'vue';
export default defineComponent({
  props: {
    visible: {
      type: Boolean,
    },
    selectedStudy: {
      type: Object,
    },
  },
  emits: ['close-modal'],
  setup(props, context) {
    const closeModal = () => {
      context.emit('close-modal');
    };
    const columns = [
      {
        title: 'Nombre del Diccionario',
        dataIndex: 'dictionaryInfo.name',
        width: 200,
      },
      {
        title: 'Año',
        dataIndex: 'dictionaryInfo.annoOfPublication',
        width: 100,
      },
      {
        title: 'Nombre del autor(es)',
        dataIndex: 'dictionaryInfo.author',
        width: 250,
        customRender: ({ text }) => {
          let result = [];
          text.forEach((element) => {
            result.push(element.name);
            result.push(', ');
          });
          return h('span', { href: 'javascript:;' }, result);
        },
      },
      {
        title: 'Letras',
        dataIndex: 'letters',
        width: 250,
        customRender: ({ text }) => {
          let result = [];
          text.forEach((element) => {
            result.push(element);
            result.push(', ');
          });
          return h('span', { href: 'javascript:;' }, result);
        },
      },
    ];
    return {
      columns,
      closeModal,
    };
  },
});
</script>
