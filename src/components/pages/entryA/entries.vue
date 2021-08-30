<template>
  <h2>Unidades Fraseológicas Candidatas</h2>
  <br />
  <a-tooltip title="Agregar Unidad Fraselógica" placement="right">
    <PlusSquareFilled
      :style="{ fontSize: '25px', color: '#08c', margin: '5px' }"
      @click="onAdd"
    />
  </a-tooltip>
  <a-table
    :data-source="entries"
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
        title="Seleccionar de la UF candidata"
        placement="bottom"
      ></a-tooltip>

      <a-tooltip title="Detalles de la UF candidata " placement="bottom">
        <a @click="ufDetailsModalShowMethod(record)">
          <EyeFilled
            :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
          />
        </a>
      </a-tooltip>
      <a-tooltip title="Documentar UF candidata" placement="bottom">
        <a @click="createUFDocumentation(record.id)">
          <BookFilled
            :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
          />
        </a>
      </a-tooltip>
      <a-tooltip title="Seleccionar UF candidata" placement="bottom">
        <a @click="selectForLemario(record.id)">
          <CarryOutFilled
            :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
          />
        </a>
      </a-tooltip>
      <a-popconfirm
        v-if="entries.length"
        title="Seguro de Eliminar?"
        @confirm="deleteUFByID(record.id)"
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
  <entry-details-modal
    v-model:visible="entryDetailsModalShow"
    :selected-entry="selectedEntry"
    @close-modal="closeEntryDetailsModal"
  ></entry-details-modal>
</template>
<script lang="ts">
import {
  EyeFilled,
  EditFilled,
  DeleteFilled,
  PlusSquareFilled,
  CarryOutFilled,
  SearchOutlined,
  BookFilled,
} from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import { EntryA } from '@/graphql/modules/entryA/model.ts';
import { Sources } from '@/graphql/modules/sourcesA/model.ts';
import Table from 'ant-design-vue/lib/table';
import EntryDetailsModal from './entryDetailsModal.vue';

export default defineComponent({
  components: {
    'a-table': Table,
    EyeFilled,
    BookFilled,
    EditFilled,
    DeleteFilled,
    CarryOutFilled,
    PlusSquareFilled,
    SearchOutlined,
    EntryDetailsModal,
  },
  data() {
    const entryDetailsModalShow = false;
    const selectedEntry = {};
    const searchInput = ref();
    return {
      searchInput,
      selectedEntry,
      entryDetailsModalShow,
      columns: [
        {
          title: 'UF',
          dataIndex: 'UF',
          key: 'UF',
          sorter: (a, b) => a.name.localeCompare(b.name),
          slots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
          },
          onFilter: (value, record) => {
            return record.UF.toString()
              .toLowerCase()
              .includes(value.toLowerCase());
          },
        },
        {
          title: 'Fuente',
          dataIndex: 'source',
          key: 'source',
          sorter: (a, b) => a.name.localeCompare(b.name),
          slots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
          },
          onFilter: (value, record) => {
            return record.source
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase());
          },
        },
        {
          title: 'Operación',
          key: 'operation',
          width: 200,
          slots: { customRender: 'operation' },
        },
      ],
      entries: [],
    };
  },
  async mounted() {
    const { data } = await EntryA.findAllEntriesWhithSourceRef();
    this.entries = data.findAllEntriesWhithSourceRef;
  },
  methods: {
    onAdd() {
      this.$router.push({
        name: 'newEntryA',
      });
    },
    async deleteUFByID(id) {
      const deletedUF = await EntryA.deleteEntryByID(id);
      let index = -1;
      let found = false;
      for (index; index < this.entries.length && !found; index++) {
        const element = this.entries[index];
        if (element.id === id) {
          found = true;
        }
      }
      this.entries = this.entries.filter((item) => item.id !== id);
    },
    handleSearch: (confirm) => {
      confirm();
    },
    handleReset: (clearFilters) => {
      clearFilters();
    },
    async ufDetailsModalShowMethod(entry) {
      this.selectedEntry = entry;
      console.log('aaaaaaaaaaaaaaa', this.selectedEntrySource);
      this.entryDetailsModalShow = true;
    },
    closeEntryDetailsModal() {
      this.entryDetailsModalShow = false;
    },
    async selectForLemario(entryID) {
      console.log('aaaaaaaaaaaaaaa');
    },
  },
});
</script>
