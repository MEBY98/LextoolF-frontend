<template>
  <div>
    <a-table
      :data-source="$store.clasifications"
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
          title="Crear nueva clasificación"
          icon="PlusOutlined"
          text="Clasificación"
          @click="showNewClasificationModalMethod"
        ></tooltip-icon>
      </template>
      <template #operation="{ record }">
        <tooltip-icon
          title="Editar clasificación"
          icon="EditFilled"
          @click="showEditClasificationModalMethod(record)"
        ></tooltip-icon>
      </template>
    </a-table>
    <div></div>
    <edit-clasification-modal
      :visible="showEditClasificationModal"
      :clasification="selectedClasification"
      @close-modal="closeEditClasificationModalMethod"
    ></edit-clasification-modal>
    <new-clasification-modal
      :visible="showNewClasificationModal"
      @close-modal="closeNewClasificationModalMethod"
    ></new-clasification-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue';
import { Clasification } from '@/models/Clasification';
import TooltipIcon from '@/components/shared/TooltipIcon.vue';
import Select from '@/components/shared/Select.vue';
import NewClasificationModal from './NewClasificationModal.vue';
import EditClasificationModal from './EditClasificationModal.vue';
import UseNewClasificationModal from './UseNewClasificationModal';
import UseEditClasificationModal from './UseEditClasificationModal';
import UseClasificationInitData from '../entry/DescriptorsInitOnMounted/UseClasificationInitData';
import UseColumns from './UseColumns';
import UseRoutes from '@/router/UseRoutes';

export default defineComponent({
  components: {
    'tooltip-icon': TooltipIcon,
    'general-select': Select,
    'new-clasification-modal': NewClasificationModal,
    'edit-clasification-modal': EditClasificationModal,
  },
  setup() {
    const { ClasificationInitData } = UseClasificationInitData();
    onMounted(ClasificationInitData);
    const selectedClasification: Ref<Clasification> = ref(new Clasification());
    const { goToEntries } = UseRoutes();
    const { columns } = UseColumns();
    const {
      showNewClasificationModal,
      showNewClasificationModalMethod,
      closeNewClasificationModalMethod,
    } = UseNewClasificationModal();
    const {
      showEditClasificationModal,
      showEditClasificationModalMethod,
      closeEditClasificationModalMethod,
    } = UseEditClasificationModal(selectedClasification);
    return {
      columns,
      selectedClasification,
      showNewClasificationModal,
      showNewClasificationModalMethod,
      closeNewClasificationModalMethod,
      showEditClasificationModal,
      showEditClasificationModalMethod,
      closeEditClasificationModalMethod,
      goToEntries,
    };
  },
});
</script>
