<template>
  <a-modal
    title="Detalles"
    :visible="visible"
    :footer="null"
    @cancel="closeModal"
  >
    <div v-if="emptyDictionaries">
      <div>
        <span :style="{ 'font-weight': '700' }">
          Nombre del Diccionario:
          <span :style="{ 'font-weight': '500' }">
            {{ $store.dictionariesInfo[selectedDictionaryInfoIndex].name }}
          </span>
        </span>
      </div>
      <br />
      <div>
        <span :style="{ 'font-weight': '700' }">
          Siglas del Diccionario:
          <span :style="{ 'font-weight': '500' }">
            {{ $store.dictionariesInfo[selectedDictionaryInfoIndex].siglas }}
          </span>
        </span>
      </div>
      <br />
      <div>
        <span :style="{ 'font-weight': '700' }">
          Ano de Publicacion:
          <span :style="{ 'font-weight': '500' }">
            {{
              $store.dictionariesInfo[selectedDictionaryInfoIndex]
                .annoOfPublication
            }}
          </span>
        </span>
      </div>
      <br />
      <div>
        <span :style="{ 'font-weight': '700' }">
          Referencia:
          <span :style="{ 'font-weight': '500' }">
            {{ $store.dictionariesInfo[selectedDictionaryInfoIndex].reference }}
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
          :data-source="
            $store.dictionariesInfo[selectedDictionaryInfoIndex].author
          "
          :columns="columns"
          :row-key="(record) => record.id"
          bordered
          :pagination="false"
        ></a-table>
      </div>
    </div>
  </a-modal>
</template>
<script lang="ts">
import { store } from '@/store/store';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
    },
    selectedDictionary: {
      type: Object,
    },
    selectedDictionaryInfoIndex: {
      type: Number,
    },
  },
  emits: ['close-modal'],
  setup(props, context) {
    const closeModal = () => context.emit('close-modal');
    const emptyDictionaries = computed(() => store.dictionariesInfo.length > 0);
    const columns = [
      {
        title: 'Nombre del Autor',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'Siglas del Autor',
        dataIndex: 'siglas',
        sorter: (a, b) => a.siglas.localeCompare(b.siglas),
      },
    ];
    return {
      emptyDictionaries,
      closeModal,
      columns,
    };
  },
});
</script>
