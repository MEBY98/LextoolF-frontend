<template>
  <a-table
    :data-source="dataTable"
    :columns="columns"
    :row-key="(record, index) => index"
    bordered
    size="small"
  >
    <template #operation="{ record }">
      <tooltip-icon
        title="Ver por diccionarios"
        icon="EyeFilled"
        @click="showUbicationReportByDictionaryMethod(record.ubication)"
      ></tooltip-icon>
    </template>
  </a-table>
  <ubication-report-by-dictionary
    :visible="showUbicationReportByDictionary"
    :dictionaries="dictionaries"
    :ubication-i-d="ubicationID"
    @close-modal="closeUbicationReportByDictionaryMethod"
  ></ubication-report-by-dictionary>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { Ubication } from '@/models/Ubication';
import { Element } from '@/models/Element';
import TooltipIcon from '@/components/shared/TooltipIcon.vue';
import UbicationReportByDictionary from './UbicationReportByDictionary.vue';
import UseUbicationInitData from '../../entry/DescriptorsInitOnMounted/UseUbicationInitData';
import UseUbicationReportCols from './UseUbicationReportCols';
import UseUbicationReportByDictionaryModal from './UseUbicationReportByDictionaryModal';
import { store } from '@/store/store';
export default defineComponent({
  components: {
    'tooltip-icon': TooltipIcon,
    'ubication-report-by-dictionary': UbicationReportByDictionary,
  },
  props: {
    elements: {
      type: Array,
    },
    dictionaries: {
      type: Array,
    },
  },
  setup(props) {
    const { UbicationInitData } = UseUbicationInitData();
    onMounted(UbicationInitData);
    const dataTable = computed(() => {
      const result: {
        ubication: Ubication;
        quanty: number;
      }[] = [];
      for (
        let ubicationIndex = 0;
        ubicationIndex < store.ubications.length;
        ubicationIndex++
      ) {
        const u = store.ubications[ubicationIndex];
        result.push({ ubication: u, quanty: 0 });
      }
      for (
        let indexElement = 0;
        indexElement < (props.elements as Array<Element>).length;
        indexElement++
      ) {
        const e = (props.elements as Array<Element>)[indexElement];
        let found = false;
        for (
          let indexResult = 0;
          indexResult < result.length && !found;
          indexResult++
        ) {
          if (e.ubication.id === result[indexResult].ubication.id) {
            result[indexResult].quanty++;
            found = true;
          }
        }
      }
      return result;
    });
    const { columns } = UseUbicationReportCols();
    const ubicationID = ref('');
    const {
      showUbicationReportByDictionary,
      showUbicationReportByDictionaryMethod,
      closeUbicationReportByDictionaryMethod,
    } = UseUbicationReportByDictionaryModal(ubicationID);
    return {
      columns,
      dataTable,
      showUbicationReportByDictionary,
      showUbicationReportByDictionaryMethod,
      closeUbicationReportByDictionaryMethod,
      ubicationID,
    };
  },
});
</script>
