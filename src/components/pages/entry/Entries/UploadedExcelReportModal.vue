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
      v-if="errors.length > 0"
      :data-source="tooMuchErrors ? errors.slice(0, 50) : errors"
      :row-key="(record, index) => index"
      :columns="errorColumns"
      size="small"
      bordered
    >
      <template #title>
        <h6 v-if="tooMuchErrors">
          Demasiados errores en el excel cargado, la tabla solo muestra los 50
          primeros
          <br />
          Cantidad total de errores: {{ amountOfErrors }}
        </h6>
        <h6 v-else>Errores del excel</h6>
      </template>
      <template #footer>
        <h6>Valores válidos</h6>
        <span style="font-weight: 500">Clasificaciones:&#160;</span>
        <span v-for="c in $store.clasifications" :key="c.id">
          {{ c.clasification }},&#160;
        </span>
        <br />
        <span style="font-weight: 500">Ubicaciones:&#160;</span>
        <span v-for="u in $store.ubications" :key="u.id">
          {{ u.ubication }},&#160;
        </span>
      </template>
    </a-table>
    <div v-else>
      <a-tabs v-model:active-key="activeKey" type="card">
        <a-tab-pane v-for="l in $store.dictionary.letters" :key="l" :tab="l">
          <a-table
            :data-source="filteredEntries"
            :row-key="(record) => record.id"
            :columns="entryColumns"
            size="small"
            bordered
          >
            <template #title>
              <h6>
                Cantidad total de artículos cargados del excel:
                {{ amountOfEntries }}
              </h6>
            </template>
            <template #operation="{ record }">
              <tooltip-icon
                :icon="'EyeFilled'"
                :title="'Detalles del artículo'"
                @click="showEntryDetailsModalMethod(record)"
              ></tooltip-icon>
            </template>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-modal>
  <entry-details-modal
    :visible="showEntryDetailsModal"
    :entry="selectedEntry"
    @close-modal="closeEntryDetailsModalMethod"
  ></entry-details-modal>
</template>
<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from 'vue';
import { EntryToEdit } from '@/models/Entry';
import EntryDetailsModal from './EntryDetailsModal.vue';
import TooltipIcon from '@/components/shared/TooltipIcon.vue';
import UseEntryDetailsModal from './UseEntryDetailsModal';
import UseColumns from './UseColumnsExcelReportModal';
import UseErrorColumns from './UseErrorColumns';
import { store } from '@/store/store';
export default defineComponent({
  components: {
    'entry-details-modal': EntryDetailsModal,
    'tooltip-icon': TooltipIcon,
  },
  props: {
    visible: { type: Boolean },
    errors: {
      type: Array,
      default: () => [],
    },
    entries: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['close-modal', 'close-modal-reload-entries'],
  setup(props, context) {
    const entriesCopy = ref([]);
    const errorsCopy = ref([]);
    watch(
      () => props.entries,
      (newValue) => {
        entriesCopy.value = newValue as Array<any>;
        activeKey.value = store.dictionary.letters[0];
      }
    );
    watch(
      () => props.errors,
      (newValue) => {
        errorsCopy.value = newValue as Array<any>;
      }
    );
    const amountOfErrors = computed(() => {
      return errorsCopy.value.length;
    });
    const amountOfEntries = computed(() => {
      return entriesCopy.value.length;
    });
    const tooMuchErrors = computed(() => {
      return amountOfErrors.value > 50;
    });
    const activeKey = ref('A');
    const filteredEntries = computed(() => {
      return (entriesCopy.value as Array<any>).filter(
        (e) => e.letter === activeKey.value
      );
    });
    const { errorColumns } = UseErrorColumns();
    const entryColumns = UseColumns().columns;
    const selectedEntry: Ref<EntryToEdit> = ref();
    const {
      showEntryDetailsModal,
      showEntryDetailsModalMethod,
      closeEntryDetailsModalMethod,
    } = UseEntryDetailsModal(selectedEntry);
    const closeModal = () => {
      if (amountOfErrors.value > 0) {
        context.emit('close-modal');
      } else {
        context.emit('close-modal-reload-entries');
      }
    };
    return {
      errorColumns,
      entryColumns,
      amountOfErrors,
      amountOfEntries,
      activeKey,
      tooMuchErrors,
      filteredEntries,
      selectedEntry,
      showEntryDetailsModal,
      showEntryDetailsModalMethod,
      closeEntryDetailsModalMethod,
      closeModal,
    };
  },
});
</script>
