<template>
  <h2>Estudios Fraseologicos</h2>
  <br />
  <a-tooltip title="Crear nuevo estudio fraseologico" placement="right">
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
          :placeholder="`Buscar ${column.title}`"
          :value="selectedKeys[0]"
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
          Search
        </a-button>
        <a-button
          size="small"
          style="width: 90px"
          @click="handleReset(clearFilters)"
        >
          Reset
        </a-button>
      </div>
    </template>
    <template #filterIcon="filtered">
      <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>
    <template #period="{ record }">
      <a :style="{ color: 'black' }">{{ record.period }}</a>
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
          <a>
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
          <a>
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
import Table from 'ant-design-vue/lib/table';
import StudyDetailsModal from './studyDetailsModal.vue';

export default defineComponent({
  components: {
    'a-table': Table,
    EyeFilled,
    EditFilled,
    DeleteFilled,
    CarryOutFilled,
    PlusSquareFilled,
    StudyDetailsModal,
    SearchOutlined,
  },
  data() {
    const showDetailsModal = false;
    const selectedStudy = {};
    const searchInput = ref();
    return {
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
              .includes(value.toLowerCase());
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
    const { data } = await Study.getAllStudies();
    this.studies = data.getAllStudies;
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
      this.showDetailsModal = !this.showDetailsModal;
      this.selectedStudy = study;
      console.log('selectedStudy:', this.selectedStudy);
    },
    editStudy(study) {
      console.log(this.$route.path);
      this.$router.push('studies/' + study.id);
    },
    selectStudyToWork(record) {
      this.$store.study = record;
      console.log('storeStudy:', this.$store.study);
      this.$router.push('dictionaries');
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
