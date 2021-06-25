<template>
  <a-modal title="Detalles">
    <div>
      <span :style="{ 'font-weight': '700' }">
        Nombre del Diccionario:
        <span :style="{ 'font-weight': '500' }">
          {{ selectedDictionary.name }}
        </span>
      </span>
    </div>
    <br />
    <div>
      <span :style="{ 'font-weight': '700' }">
        Siglas del Diccionario:
        <span :style="{ 'font-weight': '500' }">
          {{ selectedDictionary.shortName }}
        </span>
      </span>
    </div>
    <br />
    <div>
      <span :style="{ 'font-weight': '700' }">
        Ano de Publicacion:
        <span :style="{ 'font-weight': '500' }">
          {{ selectedDictionary.annoOfPublication }}
        </span>
      </span>
    </div>
    <br />
    <div>
      <span :style="{ 'font-weight': '700' }">
        Referencia:
        <span :style="{ 'font-weight': '500' }">
          {{ selectedDictionary.reference }}
        </span>
      </span>
    </div>
    <br />
    <div>
      <span :style="{ 'font-weight': '700' }">
        Letras:
        <span
          v-for="(letter, index) in selectedDictionary.letters"
          :key="index"
          :style="{ 'font-weight': '500' }"
        >
          {{ letter }},
        </span>
      </span>
    </div>
    <br />
    <div>
      <span :style="{ 'font-weight': '700' }">Autores:</span>
    </div>
    <div>
      <a-table
        :data-source="selectedDictionary.author"
        :columns="columns"
        :row-key="(record) => record.name"
        bordered
      ></a-table>
    </div>
  </a-modal>
</template>
<script lang="ts">
/* eslint-disable vue/no-mutating-props */
import { defineComponent, h } from 'vue';
import { FraseologicStudy } from '@/models/fraseologicStudy.model';

export default defineComponent({
  // eslint-disable-next-line vue/require-prop-types
  props: ['selectedDictionary'],
  data() {
    const columns = [
      {
        title: 'Nombre del Autor',
        dataIndex: 'name',
        sorter: true,
        // customRender: ({ text }) => {
        //   let result = [];
        //   text.forEach((element) => {
        //     result.push(element.name);
        //     result.push(', ');
        //   });
        //   return h('span', { href: 'javascript:;' }, result);
        // },
      },
      {
        title: 'Siglas del Autor',
        dataIndex: 'siglas',
        sorter: true,
        // customRender: ({ text }) => {
        //   let result = [];
        //   text.forEach((element) => {
        //     result.push(element.name);
        //     result.push(', ');
        //   });
        //   return h('span', { href: 'javascript:;' }, result);
        // },
      },
    ];
    return {
      columns,
    };
  },
});
</script>
