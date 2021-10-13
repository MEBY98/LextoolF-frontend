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
    >
      <template #operation="{ record }">
        <tooltip-icon
          title="Ver unidades fraseológicas"
          icon="EyeFilled"
          @click="showTypeOfUfReportByUFMethod(record.dictionary)"
        ></tooltip-icon>
      </template>
    </a-table>
  </a-modal>
  <type-of-uf-report-by-uf
    :visible="showTypeOfUfReportByUF"
    :dictionary="selectedDictionary"
    :descriptor-i-d="descriptorID"
    @close-modal="closeTypeOfUfReportByUFMethod"
  ></type-of-uf-report-by-uf>
</template>
<script lang="ts">
import { computed, defineComponent, ref, Ref } from 'vue';
import { DictionaryEntriesDescriptorsAsString } from '@/models/Dictionary';
import TooltipIcon from '@/components/shared/TooltipIcon.vue';
import TypeOfUfReportByUF from './TypeOfUfReportByUF.vue';
import UseTypeOfUfReportByUFModal from './UseTypeOfUfReportByUFModal';
import UseTypeOfUfReportByDictionaryCols from './UseTypeOfUfReportByDictionaryCols';
export default defineComponent({
  components: {
    'tooltip-icon': TooltipIcon,
    'type-of-uf-report-by-uf': TypeOfUfReportByUF,
  },
  props: {
    visible: {
      type: Boolean,
    },
    dictionaries: {
      type: Array,
    },
    descriptorID: {
      type: String,
    },
  },
  emits: ['close-modal'],
  setup(props, context) {
    const dataTable = computed(() => {
      const result: {
        dictionary: DictionaryEntriesDescriptorsAsString;
        quanty: number;
      }[] = [];
      for (
        let indexD = 0;
        indexD <
        (props.dictionaries as Array<DictionaryEntriesDescriptorsAsString>)
          .length;
        indexD++
      ) {
        const d = (props.dictionaries as Array<
          DictionaryEntriesDescriptorsAsString
        >)[indexD];
        result.push({ dictionary: d, quanty: 0 });
      }
      for (
        let indexD = 0;
        indexD <
        (props.dictionaries as Array<DictionaryEntriesDescriptorsAsString>)
          .length;
        indexD++
      ) {
        const d = (props.dictionaries as Array<
          DictionaryEntriesDescriptorsAsString
        >)[indexD];
        for (let indexE = 0; indexE < d.entries.length; indexE++) {
          const e = d.entries[indexE];
          for (
            let indexElement = 0;
            indexElement < e.elements.length;
            indexElement++
          ) {
            const element = e.elements[indexElement];
            if (element.clasification.clasification === 'UF') {
              if (element.generalDescription.tipo === props.descriptorID) {
                result[indexD].quanty++;
              }
            }
          }
        }
      }
      return result;
    });
    const { columns } = UseTypeOfUfReportByDictionaryCols();
    const closeModal = () => {
      context.emit('close-modal');
    };
    const selectedDictionary: Ref<DictionaryEntriesDescriptorsAsString> = ref({
      id: '',
      dictionaryInfo: {
        id: '',
        siglas: '',
        name: '',
        author: [],
        annoOfPublication: 1,
        reference: '',
      },
      letters: [],
      entries: [],
    });
    const {
      showTypeOfUfReportByUF,
      showTypeOfUfReportByUFMethod,
      closeTypeOfUfReportByUFMethod,
    } = UseTypeOfUfReportByUFModal(selectedDictionary);
    return {
      columns,
      dataTable,
      closeModal,
      selectedDictionary,
      showTypeOfUfReportByUF,
      showTypeOfUfReportByUFMethod,
      closeTypeOfUfReportByUFMethod,
    };
  },
});
</script>
