<template>
  <div>
    <a-table
      :data-source="$store.ubications"
      :columns="columns"
      :row-key="(record) => record.id"
      bordered
    >
      <template #title>
        <tooltip-icon
          title="Volver a los artículos lexicográficos"
          icon="RollbackOutlined"
          text="Atrás"
          @click="goToEntries($store.study)"
        ></tooltip-icon>
        <tooltip-icon
          title="Crear nueva ubicación"
          icon="PlusOutlined"
          text="Ubicación"
          @click="showNewUbicationModalMethod"
        ></tooltip-icon>
      </template>
      <template #operation="{ record }">
        <tooltip-icon
          title="Editar ubicación"
          icon="EditFilled"
          @click="showEditUbicationModalMethod(record)"
        ></tooltip-icon>
      </template>
    </a-table>
    <div></div>
    <edit-ubication-modal
      :visible="showEditUbicationModal"
      :ubication="selectedUbication"
      @close-modal="closeEditUbicationModalMethod"
    ></edit-ubication-modal>
    <new-ubication-modal
      :visible="showNewUbicationModal"
      @close-modal="closeNewUbicationModalMethod"
    ></new-ubication-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue';
import { Ubication } from '@/models/Ubication';
import UseUbicationInitData from '../entry/DescriptorsInitOnMounted/UseUbicationInitData';
import TooltipIcon from '@/components/shared/TooltipIcon.vue';
import Select from '@/components/shared/Select.vue';
import EditUbicationModal from './EditUbicationModal.vue';
import NewUbicationModal from './NewUbicationModal.vue';
import UseNewUbicationModal from './UseNewUbicationModal';
import UseEditUbicationModal from './UseEditUbicationModal';
import UseColumns from './UseColumns';
import UseRoutes from '@/router/UseRoutes';

export default defineComponent({
  components: {
    'tooltip-icon': TooltipIcon,
    'general-select': Select,
    'new-ubication-modal': NewUbicationModal,
    'edit-ubication-modal': EditUbicationModal,
  },
  setup() {
    const { UbicationInitData } = UseUbicationInitData();
    onMounted(UbicationInitData);
    const selectedUbication: Ref<Ubication> = ref(new Ubication());
    const { goToEntries } = UseRoutes();
    const { columns } = UseColumns();
    const {
      showNewUbicationModal,
      showNewUbicationModalMethod,
      closeNewUbicationModalMethod,
    } = UseNewUbicationModal();
    const {
      showEditUbicationModal,
      showEditUbicationModalMethod,
      closeEditUbicationModalMethod,
    } = UseEditUbicationModal(selectedUbication);
    return {
      columns,
      selectedUbication,
      showNewUbicationModal,
      showNewUbicationModalMethod,
      closeNewUbicationModalMethod,
      showEditUbicationModal,
      showEditUbicationModalMethod,
      closeEditUbicationModalMethod,
      goToEntries,
    };
  },
});
</script>
