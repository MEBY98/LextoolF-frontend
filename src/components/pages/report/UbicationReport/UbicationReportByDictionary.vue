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
          @click="showUbicationReportByUFMethod(record.dictionary)"
        ></tooltip-icon>
      </template>
    </a-table>
  </a-modal>
  <ubication-report-by-uf
    :visible="showUbicationReportByUF"
    :dictionary="selectedDictionary"
    :ubication-i-d="ubicationID"
    @close-modal="closeUbicationReportByUFMethod"
  ></ubication-report-by-uf>
</template>
<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';
import { DictionaryEntriesDescriptorsAsString } from '@/models/Dictionary';
import TooltipIcon from '@/components/shared/TooltipIcon.vue';
import UbicationReportByUF from './UbicationReportByUF.vue';
import UseUbicationReportByDictionaryCols from './UseUbicationReportByDictionaryCols';
import UseUbicationReportByUFModal from './UseUbicationReportByUFModal';
export default defineComponent({
  components: {
    'tooltip-icon': TooltipIcon,
    'ubication-report-by-uf': UbicationReportByUF,
  },
  props: {
    visible: {
      type: Boolean,
    },
    dictionaries: {
      type: Array,
    },
    ubicationID: {
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
              if (element.ubication.id === props.ubicationID) {
                result[indexD].quanty++;
              }
            }
          }
        }
      }
      return result;
    });
    const { columns } = UseUbicationReportByDictionaryCols();
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
      showUbicationReportByUF,
      showUbicationReportByUFMethod,
      closeUbicationReportByUFMethod,
    } = UseUbicationReportByUFModal(selectedDictionary);
    const closeModal = () => {
      context.emit('close-modal');
    };
    return {
      dataTable,
      columns,
      selectedDictionary,
      showUbicationReportByUF,
      showUbicationReportByUFMethod,
      closeUbicationReportByUFMethod,
      closeModal,
    };
  },
});
</script>
