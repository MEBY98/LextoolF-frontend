<template>
  <h2>Fuentes</h2>
  <br />
  <a-tooltip title="Agregar Fuente" placement="right">
    <PlusSquareFilled
      :style="{ fontSize: '25px', color: '#08c', margin: '5px' }"
      @click="onAdd"
    />
  </a-tooltip>
  <a-table
    :data-source="sources"
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
    <template #name="{ record }">
      <span>{{ record.name }}</span>
    </template>
    <template #operation="{ record }">
      <a-tooltip
        title="Seleccionar de la fuente"
        placement="bottom"
      ></a-tooltip>
      <a-tooltip title="Seleccionar la Fuente" placement="bottom">
        <a @click="selectSourceToWork(record.id)">
          <CarryOutFilled
            :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
          />
        </a>
      </a-tooltip>
      <a-tooltip title="Detalles de la fuente" placement="bottom">
        <a @click="sourceDetailsModalShowMethod(record)">
          <EyeFilled
            :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
          />
        </a>
      </a-tooltip>
      <a-popconfirm
        v-if="sources.length"
        title="Seguro de Eliminar?"
        @confirm="deleteSourceByID(record.id)"
      >
        <a-tooltip title="Eliminar de la fuente" placement="bottom">
          <a>
            <DeleteFilled
              :style="{ fontSize: '20px', color: 'red', margin: '5px' }"
            />
          </a>
        </a-tooltip>
      </a-popconfirm>
    </template>
  </a-table>
  <source-details-modal
    v-model:visible="sourceDetailsModalShow"
    :selected-source="selectedSource"
    @close-modal="closeSourceDetailsModal"
  ></source-details-modal>
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
import { defineComponent, ref } from 'vue';
import { Sources } from '@/graphql/modules/sourcesA/model.ts';
import Table from 'ant-design-vue/lib/table';
import SourceDetailsModal from './sourceDetailsModal.vue';

export default defineComponent({
  components: {
    'a-table': Table,
    EyeFilled,
    EditFilled,
    DeleteFilled,
    CarryOutFilled,
    PlusSquareFilled,
    SearchOutlined,
    SourceDetailsModal,
  },
  data() {
    const sourceDetailsModalShow = false;
    const selectedSource = {};
    const searchInput = ref();
    return {
      searchInput,
      selectedSource,
      sourceDetailsModalShow,
      columns: [
        {
          title: 'Nombre',
          key: 'name',
          dataIndex: 'name',
          width: 300,
          sorter: (a, b) => a.name.localeCompare(b.name),
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
        },
        {
          title: 'Referencia',
          dataIndex: 'ref',
          sorter: (a, b) => a.ref.localeCompare(b.ref),
          width: 200,
          slots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
          },
          onFilter: (value, record) => {
            return record.ref
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase());
          },
        },
        {
          title: 'Tipo',
          dataIndex: 'type',
          sorter: (a, b) => a.type.localeCompare(b.type),
          width: 200,
          slots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
          },
          onFilter: (value, record) => {
            return record.type
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase());
          },
        },
        {
          title: 'Sub-Tipo',
          dataIndex: 'subType',
          sorter: (a, b) => a.subType.localeCompare(b.subType),
          width: 200,
          slots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
          },
          onFilter: (value, record) => {
            return record.subType
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase());
          },
        },
        {
          title: 'Operación',
          key: 'operation',
          width: 150,
          slots: { customRender: 'operation' },
        },
      ],
      sources: [],
    };
  },
  async mounted() {
    const { data } = await Sources.findAllSources();
    this.sources = data.findAllSources;
  },
  methods: {
    onAdd() {
      this.$router.push({
        name: 'newSourceA',
      });
    },
    async deleteSourceByID(id) {
      const deletedSource = await Sources.deleteSourceByID(id);
      let index = -1;
      let found = false;
      for (index; index < this.sources.length && !found; index++) {
        const element = this.sources[index];
        if (element.id === id) {
          found = true;
        }
      }
      this.sources = this.sources.filter((item) => item.id !== id);
    },
    handleSearch: (confirm) => {
      confirm();
    },
    handleReset: (clearFilters) => {
      clearFilters();
    },
    sourceDetailsModalShowMethod(source) {
      this.selectedSource = source;
      this.sourceDetailsModalShow = true;
    },
    closeSourceDetailsModal() {
      this.sourceDetailsModalShow = false;
    },
    async selectSourceToWork(sourceID) {
      const { data } = await Sources.getSourceByID(sourceID);
      this.$store.sources = data.getSourceByID;
      this.$router.push({ name: 'extractionTask' });
    },
  },
});
</script>
