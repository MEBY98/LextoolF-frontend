<template>
  <h2>Proyectos de Diccionarios</h2>
  <br />
  <a-tooltip title="Agregar Diccionario" placement="right">
    <PlusSquareFilled
      :style="{ fontSize: '25px', color: '#08c', margin: '5px' }"
      @click="onAdd"
    />
  </a-tooltip>
  <a-table
    :data-source="dictionariesA"
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
      <a-tooltip title="Seleccionar del Diccionario" placement="bottom">
        <a @click="selectDictionaryToWork(record.id)">
          <CarryOutFilled
            :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
          />
        </a>
      </a-tooltip>
      <a-tooltip title="Detalles del diccionario" placement="bottom">
        <a @click="view">
          <EyeFilled
            :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
          />
        </a>
      </a-tooltip>
      <a-popconfirm
        v-if="dictionariesA.length"
        title="Seguro de Eliminar?"
        @confirm="deleteDictionaryAByID(record.id)"
      >
        <a-tooltip title="Eliminar del diccionario" placement="bottom">
          <a>
            <DeleteFilled
              :style="{ fontSize: '20px', color: 'red', margin: '5px' }"
            />
          </a>
        </a-tooltip>
      </a-popconfirm>
    </template>
  </a-table>
  <new-lemario-modal
    v-model:visible="newLemarioModalShow"
    @close-modal="showModalL"
    @add-lemario="addLemario"
  ></new-lemario-modal>
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
import { DictionaryA } from '@/graphql/modules/dictionaryA/model.ts';
import { LemarioA } from '@/graphql/modules/lemarioA/model.ts';
import NewLemarioModal from './newLemarioModal.vue';
import Table from 'ant-design-vue/lib/table';
//import StudyDetailsModal from './studyDetailsModal.vue';

export default defineComponent({
  components: {
    'a-table': Table,
    EyeFilled,
    EditFilled,
    DeleteFilled,
    CarryOutFilled,
    PlusSquareFilled,
    SearchOutlined,
    NewLemarioModal,
  },
  data() {
    const showDetailsModal = false;
    const selectedDictionary = {
      id: '',
      name: '',
      description: '',
      reference: '',
      sources: [],
      lemario: '',
    };
    const lemario = {
      id: '',
      name: '',
      dectionaryType: '',
      entries: [],
    };
    const newLemarioModalShow = false;
    const searchInput = ref();
    return {
      searchInput,
      lemario,
      selectedDictionary,
      newLemarioModalShow,
      columns: [
        {
          title: 'Nombre',
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
          dataIndex: 'reference',
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
          title: 'Descripción',
          dataIndex: 'description',
          sorter: (a, b) => a.file.localeCompare(b.file),
          width: 300,
          slots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
          },
          onFilter: (value, record) => {
            return record.file
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase());
          },
        },
        {
          title: 'Estado',
          dataIndex: 'state',
          sorter: (a, b) => a.file.localeCompare(b.file),
          width: 300,
          slots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
          },
          onFilter: (value, record) => {
            return record.file
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
      dictionariesA: [],
    };
  },
  async mounted() {
    const { data } = await DictionaryA.findAllDictionariesA();
    console.log('Data mounted:', data.findAllDictionariesA);
    this.dictionariesA = data.findAllDictionariesA;
  },
  methods: {
    async deleteDictionaryAByID(id) {
      const deletedDictionary = await DictionaryA.deleteDictionaryAByID(id);
      let index = 0;
      let found = false;
      for (index; index < this.dictionariesA.length && !found; index++) {
        const element = this.dictionariesA[index];
        if (element.id === id) {
          found = true;
        }
      }
      this.dictionariesA = this.dictionariesA.filter((item) => item.id !== id);
    },
    async view() {
      this.$router.push('dictionariesA');
    },
    onAdd() {
      this.$router.push('newDictionaryA');
    },
    handleSearch: (confirm) => {
      confirm();
    },
    handleReset: (clearFilters) => {
      clearFilters();
    },
    async selectDictionaryToWork(recordID) {
      const { data } = await DictionaryA.getDictionaryByAID(recordID);
      const lemarioID = data.getDictionaryByID.lemario;
      this.$store.dictionariesA = data.getDictionaryByID;
      if (lemarioID === null) {
        this.showModalL();
      } else {
        const { data } = await LemarioA.getLemarioByID(lemarioID);
        this.$store.lemario = data.getLemarioByID;
        this.$router.push('lemario');
      }
    },
    showModalL() {
      this.newLemarioModalShow = !this.newLemarioModalShow;
    },
  },
});
</script>
