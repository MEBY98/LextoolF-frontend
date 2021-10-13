<template>
  <div>
    <a-table
      :data-source="$store.dictionariesInfo"
      :columns="columns"
      :row-key="(record) => record.id"
      bordered
    >
      <template #title>
        <tooltip-icon
          title="Crear nuevo diccionario"
          icon="PlusOutlined"
          text="Diccionario"
          @click="showNewDictionaryInfoModalMethod"
        ></tooltip-icon>
        <tooltip-icon
          title="Gestionar estudios"
          icon="ReadOutlined"
          text="Estudios"
          @click="goToStudies"
        ></tooltip-icon>
        <tooltip-icon
          title="Gestionar autores"
          icon="TeamOutlined"
          text="Autores"
          @click="goToAuthors"
        ></tooltip-icon>
      </template>
      <template #operation="{ record }">
        <tooltip-icon
          title="Detalles del diccionario"
          icon="EyeFilled"
          @click="showDicionaryInfoDetailsModalMethod(record)"
        ></tooltip-icon>
        <tooltip-icon
          title="Editar diccionario"
          icon="EditFilled"
          @click="showEditDictionaryInfoModalMethod(record)"
        ></tooltip-icon>
      </template>
    </a-table>
    <new-dictionary-info-modal
      :visible="showNewDictionaryInfoModal"
      @close-modal="closeNewDictionaryInfoModalMethod"
    ></new-dictionary-info-modal>
    <dictionary-info-details-modal
      :visible="showDicionaryInfoDetailsModal"
      :selected-dictionary-info="selectedDictionaryInfo"
      @close-modal="closeDicionaryInfoDetailsModalMethod"
    ></dictionary-info-details-modal>
    <edit-dictionary-info-modal
      :visible="showEditDictionaryInfoModal"
      :selected-dictionary-info="selectedDictionaryInfo"
      @close-modal="closeEditDictionaryInfoModalMethod"
    ></edit-dictionary-info-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { DictionaryInfo } from '@/models/DictionaryInfo';
import TooltipIcon from '@/components/shared/TooltipIcon.vue';
import NewDictionaryInfoModal from './NewDictionaryInfoModal.vue';
import DictionaryInfoDetailsModal from './DictionaryInfoDetailsModal.vue';
import EditDictionaryInfoModal from './EditDictionaryInfoModal.vue';
import UseNewDictionaryInfoModal from './UseNewDictionaryInfoModal';
import UseDictionaryInfoDetailsModal from './UseDictionaryInfoDetailsModal';
import UseDictionariesInfoInitData from './UseDictionariesInfoInitData';
import UseEditDictionaryInfoModal from './UseEditDictionaryInfoModal';
import UseColumns from './UseColumns';
import UseRoutes from '@/router/UseRoutes';

export default defineComponent({
  components: {
    'tooltip-icon': TooltipIcon,
    'dictionary-info-details-modal': DictionaryInfoDetailsModal,
    'new-dictionary-info-modal': NewDictionaryInfoModal,
    'edit-dictionary-info-modal': EditDictionaryInfoModal,
  },
  setup() {
    const selectedDictionaryInfo: Ref<DictionaryInfo> = ref(
      new DictionaryInfo()
    );
    const { dictionariesInfoInitData } = UseDictionariesInfoInitData();
    onMounted(dictionariesInfoInitData);
    const { columns } = UseColumns();
    const {
      showNewDictionaryInfoModal,
      showNewDictionaryInfoModalMethod,
      closeNewDictionaryInfoModalMethod,
    } = UseNewDictionaryInfoModal();
    const {
      showDicionaryInfoDetailsModal,
      showDicionaryInfoDetailsModalMethod,
      closeDicionaryInfoDetailsModalMethod,
    } = UseDictionaryInfoDetailsModal(selectedDictionaryInfo);
    const {
      showEditDictionaryInfoModal,
      showEditDictionaryInfoModalMethod,
      closeEditDictionaryInfoModalMethod,
    } = UseEditDictionaryInfoModal(selectedDictionaryInfo);

    const { goToStudies, goToAuthors } = UseRoutes();
    return {
      selectedDictionaryInfo,
      columns,
      showDicionaryInfoDetailsModal,
      showDicionaryInfoDetailsModalMethod,
      closeDicionaryInfoDetailsModalMethod,
      showEditDictionaryInfoModal,
      showEditDictionaryInfoModalMethod,
      closeEditDictionaryInfoModalMethod,
      showNewDictionaryInfoModal,
      showNewDictionaryInfoModalMethod,
      closeNewDictionaryInfoModalMethod,
      goToStudies,
      goToAuthors,
    };
  },
});
</script>
