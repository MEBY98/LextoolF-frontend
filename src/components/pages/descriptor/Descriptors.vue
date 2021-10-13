<template>
  <div>
    <general-select
      :elements="tabs"
      :display-attribute="'name'"
      :placeholder="'Seleccione la pestaña'"
      :multiple="false"
      :index-value="false"
      :key-value="'name'"
      :value="selectedTab"
      @change="handleTabChange"
    ></general-select>
    <general-select
      v-if="observations"
      :elements="observations"
      :display-attribute="'name'"
      :placeholder="'Seleccione la observación'"
      :multiple="false"
      :index-value="true"
      :key-value="'name'"
      :value="selectedObservation"
      @change="handleObservationChange"
    ></general-select>
    <general-select
      :elements="descriptorTypes"
      :display-attribute="'name'"
      :placeholder="'Seleccione el tipo de descriptor'"
      :multiple="false"
      :index-value="true"
      :key-value="'name'"
      :value="selectedDescriptorType"
      @change="handleDescriptorTypeChange"
    ></general-select>
    <a-table
      :data-source="filteredDescriptors"
      :columns="columns"
      :row-key="(record) => record.id"
      size="small"
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
          title="Crear nuevo descriptor"
          icon="PlusOutlined"
          text="Descriptor"
          @click="showNewDescriptorModalMethod"
        ></tooltip-icon>
      </template>
      <template #operation="{ record }">
        <tooltip-icon
          v-if="
            record.description !== '<No aplica>' ||
            record.description !== '<No descrito>'
          "
          title="Editar descriptor"
          icon="EditFilled"
          @click="showEditDescriptorModalMethod(record)"
        ></tooltip-icon>
        <!-- <a-popconfirm
          v-if="
            record.description !== '<No aplica>' ||
            record.description !== '<No descrito>'
          "
          title="¿Desea eliminar el descriptor?"
          @confirm="deleteDescriptor(record.id)"
        >
          <tooltip-icon
            title="Eliminar descriptor"
            icon="DeleteFilled"
            :style-icon="{
              fontSize: '25px',
              color: 'red',
              marginBottom: '5px',
              marginLeft: '10px',
            }"
          ></tooltip-icon>
        </a-popconfirm> -->
      </template>
    </a-table>
    <div></div>
    <edit-descriptor-modal
      :visible="showEditDescriptorModal"
      :tab="spanishTabName"
      :observation="
        observations ? observations[selectedObservation].name : undefined
      "
      :descriptor-type="
        descriptorTypes.length !== 0
          ? descriptorTypes[selectedDescriptorType].name
          : undefined
      "
      :descriptor="selectedDescriptor"
      @close-modal="closeEditDescriptorModalMethod"
    ></edit-descriptor-modal>
    <new-descriptor-modal
      :visible="showNewDescriptorModal"
      :tab="spanishTabName"
      :observation="
        observations ? observations[selectedObservation].name : undefined
      "
      :descriptor-type="
        descriptorTypes.length !== 0
          ? descriptorTypes[selectedDescriptorType]
          : undefined
      "
      @close-modal="closeNewDescriptorModalMethod"
    ></new-descriptor-modal>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref } from 'vue';
import { DescriptorType as DescriptorTypeModel } from '@/graphql/modules/DescriptorsTypes/model';
import { Descriptor } from '@/models/Descriptor';
import TooltipIcon from '@/components/shared/TooltipIcon.vue';
import Select from '@/components/shared/Select.vue';
import NewDescriptorModal from './NewDescriptorModal.vue';
import EditDescriptorModal from './EditDescriptorModal.vue';
import UseNewDescriptorModal from './UseNewDescriptorModal';
import UseEditDescriptorModal from './UseEditDescriptorModal';
import UseAllDescriptorsInitData from '../entry/DescriptorsInitOnMounted/UseAllDescriptorsInitData';
import UseUpdateStoreDescriptors from '../entry/DescriptorsTabs/AddDescriptor/UseUpdateStoreDescriptors';
import UseTabs from './UseTabs';
import UseColumns from './UseColumns';
import { store } from '@/store/store';
import ShowMessage from '@/utils/Message/Message';
import UseRoutes from '@/router/UseRoutes';

export default defineComponent({
  components: {
    'tooltip-icon': TooltipIcon,
    'general-select': Select,
    'edit-descriptor-modal': EditDescriptorModal,
    'new-descriptor-modal': NewDescriptorModal,
  },
  setup() {
    const { AllDescriptorsInitData } = UseAllDescriptorsInitData();
    onMounted(AllDescriptorsInitData);
    const { goToEntries } = UseRoutes();
    const { columns } = UseColumns();
    const { tabs } = UseTabs();
    const selectedTab = ref('GeneralDescriptionDescriptorsTypes');
    const handleTabChange = (tab) => {
      selectedTab.value = tab;
    };
    const spanishTabName = computed(() => {
      if (selectedTab.value === 'GeneralDescriptionDescriptorsTypes') {
        return 'Descripción general';
      } else if (selectedTab.value === 'OrderLemmaObservations') {
        return 'Ordernación y lematización';
      } else if (selectedTab.value === 'UseInformationObservations') {
        return 'Información de uso';
      } else if (selectedTab.value === 'DefinitionDescriptorsTypes') {
        return 'Definición de la UF';
      } else if (selectedTab.value === 'ContornoDescriptorsTypes') {
        return 'Contorno de la UF';
      } else if (selectedTab.value === 'ExampleDescriptorsTypes') {
        return 'Ejemplificación';
      } else {
        return 'Información paradigmática';
      }
    });
    const observations = computed(() => {
      let result = undefined;
      if (
        selectedTab.value === 'OrderLemmaObservations' ||
        selectedTab.value === 'UseInformationObservations'
      ) {
        result = store[selectedTab.value];
      }
      return result;
    });
    const selectedObservation = ref(0);
    const handleObservationChange = (index) => {
      selectedObservation.value = index;
    };
    const descriptorTypes = computed(() => {
      let result: any = undefined;
      if (observations.value) {
        result = observations.value[selectedObservation.value].descriptorsTypes;
      } else {
        result = store[selectedTab.value];
      }
      return result;
    });
    const selectedDescriptorType = ref(0);
    const handleDescriptorTypeChange = (index) => {
      selectedDescriptorType.value = index;
    };
    const filteredDescriptors = computed(() => {
      if (!descriptorTypes.value[selectedDescriptorType.value]) {
        return [];
      } else {
        return descriptorTypes.value[selectedDescriptorType.value].descriptors;
      }
    });
    const selectedDescriptor: Ref<Descriptor> = ref({
      id: '',
      description: '',
    });
    const {
      showEditDescriptorModal,
      showEditDescriptorModalMethod,
      closeEditDescriptorModalMethod,
    } = UseEditDescriptorModal(selectedDescriptor);
    const {
      showNewDescriptorModal,
      showNewDescriptorModalMethod,
      closeNewDescriptorModalMethod,
    } = UseNewDescriptorModal();
    const deleteDescriptor = async (id) => {
      store.layout.isLoading = true;
      store.layout.loadingTip = 'Actualizando descriptores';
      await DescriptorTypeModel.deleteDescriptorByDescriptorType(
        id,
        descriptorTypes.value[selectedDescriptorType.value].id
      );
      const { updateStore } = UseUpdateStoreDescriptors(spanishTabName.value);
      await updateStore();
      store.layout.isLoading = false;
      store.layout.loadingTip = '';
      ShowMessage('success', 'deleted', 'Descriptor');
    };
    return {
      columns,
      tabs,
      selectedTab,
      handleTabChange,
      spanishTabName,
      observations,
      selectedObservation,
      handleObservationChange,
      descriptorTypes,
      selectedDescriptorType,
      handleDescriptorTypeChange,
      filteredDescriptors,
      selectedDescriptor,
      showEditDescriptorModal,
      showEditDescriptorModalMethod,
      closeEditDescriptorModalMethod,
      showNewDescriptorModal,
      showNewDescriptorModalMethod,
      closeNewDescriptorModalMethod,
      deleteDescriptor,
      goToEntries,
    };
  },
});
</script>
