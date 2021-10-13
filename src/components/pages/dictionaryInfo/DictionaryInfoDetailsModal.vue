<template>
  <a-modal
    title="Detalles del diccionario"
    :visible="visible"
    :footer="null"
    @cancel="closeModal"
  >
    <div>
      <span :style="{ 'font-weight': '700' }">
        Nombre del Diccionario:
        <span :style="{ 'font-weight': '500' }">
          {{ selectedDictionaryInfo.name }}
        </span>
      </span>
    </div>
    <br />
    <div>
      <span :style="{ 'font-weight': '700' }">
        Siglas del Diccionario:
        <span :style="{ 'font-weight': '500' }">
          {{ selectedDictionaryInfo.siglas }}
        </span>
      </span>
    </div>
    <br />
    <div>
      <span :style="{ 'font-weight': '700' }">
        Ano de Publicacion:
        <span :style="{ 'font-weight': '500' }">
          {{ selectedDictionaryInfo.annoOfPublication }}
        </span>
      </span>
    </div>
    <br />
    <div>
      <span :style="{ 'font-weight': '700' }">
        Referencia:
        <span :style="{ 'font-weight': '500' }">
          {{ selectedDictionaryInfo.reference }}
        </span>
      </span>
    </div>
    <br />
    <div>
      <span :style="{ 'font-weight': '700' }">Autores:</span>
    </div>
    <div>
      <a-table
        :data-source="selectedDictionaryInfo.author"
        :columns="columns"
        :row-key="(record) => record.id"
        bordered
        :pagination="false"
      ></a-table>
    </div>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
    },
    selectedDictionaryInfo: {
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
        title: 'Nombre del Autor',
        dataIndex: 'name',
      },
      {
        title: 'Siglas del Autor',
        dataIndex: 'siglas',
      },
    ];
    return {
      closeModal,
      columns,
    };
  },
});
</script>
