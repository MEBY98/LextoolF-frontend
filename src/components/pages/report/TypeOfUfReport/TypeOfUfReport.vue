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
        @click="showTypeOfUfByDictionaryMethod(record.descriptor)"
      ></tooltip-icon>
    </template>
  </a-table>
  <type-of-uf-report-by-dictionary
    :visible="showTypeOfUfByDictionary"
    :dictionaries="dictionaries"
    :descriptor-i-d="descriptorID"
    @close-modal="closeTypeOfUfByDictionaryMethod"
  ></type-of-uf-report-by-dictionary>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { Descriptor } from '@/models/Descriptor';
import { Element } from '@/models/Element';
import TooltipIcon from '@/components/shared/TooltipIcon.vue';
import TypeOfUfReportByDictionary from './TypeOfUfReportByDictionary.vue';
import UseAllDescriptorsInitData from '../../entry/DescriptorsInitOnMounted/UseAllDescriptorsInitData';
import UseTypeOfUfReportCols from './UseTypeOfUfReportCols';
import UseTypeOfUfReportByDictionaryModal from './UseTypeOfUfReportByDictionaryModal';
import { store } from '@/store/store';
export default defineComponent({
  components: {
    'tooltip-icon': TooltipIcon,
    'type-of-uf-report-by-dictionary': TypeOfUfReportByDictionary,
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
    const { GeneralDescriptionInitData } = UseAllDescriptorsInitData();
    onMounted(GeneralDescriptionInitData);
    const typeOfUfdescriptors = computed(() => {
      const result: Descriptor[] = [];
      let found = false;
      for (
        let i = 0;
        i < store.GeneralDescriptionDescriptorsTypes.length && !found;
        i++
      ) {
        const dt = store.GeneralDescriptionDescriptorsTypes[i];
        if (dt.name === 'Tipo de UF') {
          result.push(...dt.descriptors);
        }
      }
      return result;
    });
    const dataTable = computed(() => {
      const result: {
        descriptor: Descriptor;
        quanty: number;
      }[] = [];
      for (
        let descriptorIndex = 0;
        descriptorIndex < typeOfUfdescriptors.value.length;
        descriptorIndex++
      ) {
        const d = typeOfUfdescriptors.value[descriptorIndex];
        result.push({ descriptor: d, quanty: 0 });
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
          if (e.generalDescription.tipo === result[indexResult].descriptor.id) {
            result[indexResult].quanty++;
            found = true;
          }
        }
      }
      return result;
    });
    const { columns } = UseTypeOfUfReportCols();
    const descriptorID = ref('');
    const {
      showTypeOfUfByDictionary,
      showTypeOfUfByDictionaryMethod,
      closeTypeOfUfByDictionaryMethod,
    } = UseTypeOfUfReportByDictionaryModal(descriptorID);
    return {
      columns,
      dataTable,
      showTypeOfUfByDictionary,
      showTypeOfUfByDictionaryMethod,
      closeTypeOfUfByDictionaryMethod,
      descriptorID,
    };
  },
});
</script>
