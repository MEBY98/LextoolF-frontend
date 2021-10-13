<template>
  <a-modal
    :visible="visible"
    style="top: 20px"
    width="600px"
    :closable="false"
    @cancel="closeModal"
    @ok="closeModal"
  >
    <a-table
      :data-source="dataTable"
      :columns="columns"
      :row-key="(record, index) => index"
      bordered
      size="small"
    ></a-table>
  </a-modal>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import UseUbicationReportByUFCols from './UseUbicationReportByUFCols';
import { DictionaryEntriesDescriptorsAsString } from '@/models/Dictionary';
export default defineComponent({
  props: {
    visible: {
      type: Boolean,
    },
    dictionary: {
      type: Object,
    },
    ubicationID: {
      type: String,
    },
  },
  emits: ['close-modal'],
  setup(props, context) {
    const dataTable = computed(() => {
      const result: {
        letter: string;
        UF: string;
      }[] = [];
      console.log('dictionary', props.dictionary);
      for (
        let indexE = 0;
        indexE <
        (props.dictionary as DictionaryEntriesDescriptorsAsString).entries
          .length;
        indexE++
      ) {
        const e = (props.dictionary as DictionaryEntriesDescriptorsAsString)
          .entries[indexE];
        for (
          let indexElement = 0;
          indexElement < e.elements.length;
          indexElement++
        ) {
          const element = e.elements[indexElement];
          if (element.clasification.clasification === 'UF') {
            if (element.ubication.id === props.ubicationID) {
              result.push({ letter: e.letter, UF: element.element });
            }
          }
        }
      }
      return result;
    });
    const { columns } = UseUbicationReportByUFCols();
    const closeModal = () => {
      context.emit('close-modal');
    };
    return { dataTable, columns, closeModal };
  },
});
</script>
