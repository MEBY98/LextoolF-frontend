<template>
  <div>
    <div class="d-flex">
      <h5 class="mr-3">Seleccione el reporte:</h5>
      <a-select
        :value="selectedReport"
        :placeholder="'Seleccione el reporte a mostrar'"
        width="200px"
        @change="handleSelectChange"
      >
        <a-select-option v-for="r in reportOptions" :key="r" :value="r">
          {{ r }}
        </a-select-option>
      </a-select>
    </div>
    <show-report
      :elements="elements"
      :dictionaries="dictionaries"
      :report-name="selectedReport"
    ></show-report>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { DictionaryEntriesDescriptorsAsString } from '@/models/Dictionary';
import { Element } from '@/models/Element';
import UseInitElements from './UseInitElements';
import ShowReport from './ShowReport.vue';
export default defineComponent({
  components: {
    'show-report': ShowReport,
  },
  setup() {
    const elements = ref(new Array<Element>());
    const dictionaries = ref(new Array<DictionaryEntriesDescriptorsAsString>());
    const { initElement } = UseInitElements(dictionaries, elements);
    onMounted(initElement);
    const selectedReport = ref('Ubicación');
    const handleSelectChange = (report: string) => {
      selectedReport.value = report;
    };
    return {
      elements,
      dictionaries,
      reportOptions: ['Ubicación', 'Tipo de UF'],
      selectedReport,
      handleSelectChange,
    };
  },
});
</script>
