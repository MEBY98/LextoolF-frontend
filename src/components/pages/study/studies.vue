<template>
  <a-tooltip title="Crear nuevo estudio fraseologico">
    <PlusSquareFilled
      :style="{ fontSize: '25px', color: '#08c', margin: '5px' }"
      @click="onAdd"
    />
  </a-tooltip>
  <a-table
    :data-source="studies"
    :columns="columns"
    :row-key="(record) => record.id"
    bordered
  >
    <template #period="{ record }">
      <a :style="{ color: 'black' }">{{ record.period }}</a>
    </template>

    <template
      #filterDropdown="{
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        column,
      }"
    >
      <div style="padding: 8px">
        <a-input
          ref="searchInput"
          v-model:value="selectedKeys[0]"
          :placeholder="`Buscar ${column.title}`"
          style="width: 188px; margin-bottom: 8px; display: block"
          @change="
            (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
          "
          @pressEnter="handleSearch(confirm)"
        />
        <a-button
          type="primary"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="handleSearch(confirm)"
        >
          <template #icon><SearchOutlined /></template>
          Buscar
        </a-button>
        <a-button
          size="small"
          style="width: 90px"
          @click="handleReset(clearFilters)"
        >
          Reiniciar
        </a-button>
      </div>
    </template>
    <template #filterIcon="filtered">
      <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>
    <template #name="{ record }">
      <span>{{ record.name }}</span>
    </template>

    <template #operation="{ record }">
      <a-tooltip
        title="Seleccionar del estudio fraseologico"
        placement="bottom"
      >
        <a @click="selectStudyToWork(record)">
          <CarryOutFilled
            :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
          />
        </a>
      </a-tooltip>
      <a-tooltip title="Detalles del estudio fraseologico" placement="bottom">
        <a @click="showDetailsModalMethod(record)">
          <EyeFilled
            :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
          />
        </a>
      </a-tooltip>

      <a-tooltip title="Editar del estudio fraseologico" placement="bottom">
        <router-link :to="{ name: 'editStudy', params: { id: record.id } }">
          <a v-if="record.state !== 'Finalizado'">
            <EditFilled
              :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
            />
          </a>
        </router-link>
      </a-tooltip>

      <a-popconfirm
        v-if="studies.length"
        title="Seguro de Eliminar?"
        @confirm="deleteStudy(record.id)"
      >
        <a-tooltip title="Eliminar del estudio fraseologico" placement="bottom">
          <a v-if="record.dictionaries.length === 0">
            <DeleteFilled
              :style="{ fontSize: '20px', color: 'red', margin: '5px' }"
            />
          </a>
        </a-tooltip>
      </a-popconfirm>
    </template>
  </a-table>
  <study-details-modal
    v-model:visible="showDetailsModal"
    :selected-study="selectedStudy"
    @close-modal="closeStudyDetailsModal"
  ></study-details-modal>
</template>
<script lang="ts">
import {
  EyeFilled,
  EditFilled,
  DeleteFilled,
  PlusSquareFilled,
  CarryOutFilled,
  SearchOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, reactive, ref } from 'vue';
import { Study } from '@/graphql/modules/study/model.ts';
import StudyDetailsModal from './studyDetailsModal.vue';

import { Ubication as UbicationModel } from '@/graphql/modules/ubication/model';
import { Clasification as ClasificationModel } from '@/graphql/modules/clasification/model';
import { DescriptorType as DescriptorTypeModel } from '@/graphql/modules/DescriptorsTypes/model';
import { Observation as ObservationModel } from '@/graphql/modules/Observation/model';

export default defineComponent({
  components: {
    EyeFilled,
    EditFilled,
    DeleteFilled,
    CarryOutFilled,
    PlusSquareFilled,
    StudyDetailsModal,
    SearchOutlined,
  },
  data() {
    const filterStateOptions = [
      { label: 'Ejecución', value: 'Ejecucion' },
      { label: 'Finalizado', value: 'Finalizado' },
    ];
    const selectedOptionsFilterState = [];
    const showDetailsModal = false;
    const selectedStudy = {};
    const searchInput = ref();
    return {
      filterStateOptions,
      selectedOptionsFilterState,
      searchInput,
      selectedStudy,
      showDetailsModal,

      columns: [
        {
          title: 'Periodo',
          dataIndex: 'period',
          width: 200,
          sorter: (a, b) => {
            return a.period.localeCompare(b.period);
          },
        },
        {
          title: 'Nombre del Estudio',
          key: 'name',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
          width: 300,
          slots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
          },
          onFilter: (value, record) => {
            return record.name
              .toString()
              .toLowerCase()
              .includes(value[0].toLowerCase());
          },
          // onFilterDropdownVisibleChange: (visible) => {
          //   if (visible) {
          //     setTimeout(() => {
          //       console.log(searchInput.value);
          //       searchInput.value.focus();
          //     }, 0);
          //   }
          // },
        },
        {
          title: 'Estado',
          dataIndex: 'state',
          filters: [
            {
              text: 'Ejecución',
              value: 'Ejecucion',
            },
            {
              text: 'Finalizado',
              value: 'Finalizado',
            },
          ],
          onFilter: (value, record) => {
            console.log(value);
            console.log(record);
            return record.state
              .toString()
              .toLowerCase()
              .includes(value[0].toLowerCase());
          },
          // slots: {
          //   filterDropdown: 'filterDropdownState',
          // },
        },
        {
          title: 'Operación',
          key: 'operation',
          width: 150,
          slots: { customRender: 'operation' },
        },
      ],
      studies: [],
    };
  },
  async mounted() {
    const dataStudies = await Study.getAllStudies();
    this.studies = dataStudies.data.getAllStudies;

    const dataAllUbications = await UbicationModel.getAllUbications();
    this.$store.ubications = dataAllUbications.data.getAllUbications;

    const dataAllClasifications = await ClasificationModel.getAllClasifications();
    this.$store.clasifications =
      dataAllClasifications.data.getAllClasifications;
    const dataLemmaClasifications = await ClasificationModel.getLemmaClasifications();
    this.$store.lemmaClasifications =
      dataLemmaClasifications.data.getAllLemmaClasifications;
    const dataSublemmaClasifications = await ClasificationModel.getSublemmaClasifications();
    this.$store.sublemmaClasifications =
      dataSublemmaClasifications.data.getAllSublemmaClasifications;

    const dataGeneralDescriptorsDescriptorsTypes = await DescriptorTypeModel.getAllGeneralDescriptionDescriptorsTypes();
    this.$store.GeneralDescriptionDescriptorsTypes =
      dataGeneralDescriptorsDescriptorsTypes.data.getAllGeneralDescriptionDescriptorsTypes;

    const dataDefinitionDescriptorsTypes = await DescriptorTypeModel.getAllDefinitionDescriptorsTypes();
    this.$store.DefinitionDescriptorsTypes =
      dataDefinitionDescriptorsTypes.data.getAllDefinitionDescriptorsTypes;

    const dataContornoDescriptorsTypes = await DescriptorTypeModel.getAllContornoDescriptorsTypes();
    this.$store.ContornoDescriptorsTypes =
      dataContornoDescriptorsTypes.data.getAllContornoDescriptorsTypes;

    const dataExampleDescriptorsTypes = await DescriptorTypeModel.getAllExampleDescriptorsTypes();
    this.$store.ExampleDescriptorsTypes =
      dataExampleDescriptorsTypes.data.getAllExampleDescriptorsTypes;

    const dataParadigmaticInfoDescriptorsTypes = await DescriptorTypeModel.getAllParadigmaticInfoDescriptorsTypes();
    this.$store.ParadigmaticInfoDescriptorsTypes =
      dataParadigmaticInfoDescriptorsTypes.data.getAllParadigmaticInfoDescriptorsTypes;

    const dataUseInformationObservations = await ObservationModel.getAllUseInformationObservations();
    this.$store.UseInformationObservations =
      dataUseInformationObservations.data.getAllUseInformationObservations;

    const dataOrderLemmaObservations = await ObservationModel.getAllOrderLemmaObservations();
    this.$store.OrderLemmaObservations =
      dataOrderLemmaObservations.data.getAllOrderLemmaObservations;

    console.log('store:', this.$store);
  },
  methods: {
    async deleteStudy(id) {
      const deletedStudy = await Study.deleteStudyByID(id);
      let index = 0;
      let found = false;
      for (index; index < this.studies.length && !found; index++) {
        const element = this.studies[index];
        if (element.id === id) {
          found = true;
        }
      }
      this.studies = this.studies.filter((item) => item.id !== id);
    },
    onAdd() {
      this.$router.push('newStudy');
    },
    showDetailsModalMethod(study) {
      this.showDetailsModal = true;
      this.selectedStudy = study;
      console.log('selectedStudy:', this.selectedStudy);
    },
    closeStudyDetailsModal() {
      this.showDetailsModal = false;
    },
    editStudy(study) {
      console.log(this.$route.path);
      this.$router.push('studies/' + study.id);
    },
    selectStudyToWork(record) {
      this.$store.study = record;
      console.log('storeStudy:', this.$store.study);
      this.$router.push({ name: 'dictionaries' });
    },
    handleSearch: (confirm) => {
      confirm();
    },
    handleReset: (clearFilters) => {
      clearFilters();
    },
  },
});
</script>
