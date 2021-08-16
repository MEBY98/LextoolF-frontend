<template>
  <div class="row">
    <div class="col-md-6">
      <ul
        class="nav nav-primary nav-dotted nav-square-separated justify-content-center justify-content-md-start"
      >
        <li class="nav-item hvr-forward col-md-6">
          <a-card hoverable title="Fuente Seleccionada">
            <p>Nombre: {{ $store.sources.name }}</p>
            <p>Referencia: {{ $store.sources.ref }}</p>
            <p>Tipo: {{ $store.sources.type }}</p>
            <p>Sub-Tipo: {{ $store.sources.subType }}</p>
          </a-card>
        </li>
      </ul>
    </div>
  </div>
  <br />
  <a-table
    :data-source="entriesOfTheSource"
    :columns="columns"
    size="small"
    :row-key="(record) => record.id"
    bordered
  >
    <template #title>
      Unidades Fraseológicas Candidatas
      <a-tooltip title="Agregar UF" placement="right">
        <PlusSquareFilled
          :style="{ fontSize: '25px', color: '#08c', margin: '5px' }"
          @click="onAdd"
        />
      </a-tooltip>
    </template>
    <template #operation="{ record }">
      <a-popconfirm
        v-if="entriesOfTheSource.length"
        title="Seguro de Eliminar?"
        @confirm="deleteEntryByID(record.id)"
      >
        <a>
          <DeleteFilled
            :style="{ fontSize: '20px', color: 'red', margin: '5px' }"
          />
        </a>
      </a-popconfirm>
      <a-tooltip title="Detalles de la Entrada" placement="bottom">
        <a @click="entryDetailsModalShowMethod(record)">
          <EyeFilled
            :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
          />
        </a>
      </a-tooltip>
    </template>
  </a-table>
  <br />
  <div style="text-align: right">
    <a-button key="back" @click="goSources" type="primary">Finalizar</a-button>
  </div>
  <entry-details-modal
    v-model:visible="entryDetailsModalShow"
    :selected-entry="selectedEntry"
    @close-modal="closeEntryDetailsModal"
  ></entry-details-modal>
</template>
<script lang="ts">
import {
  EyeFilled,
  DeleteFilled,
  PlusSquareFilled,
} from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
import { EntryA } from '@/graphql/modules/entryA/model.ts';
import EntryDetailsModal from './entryDetailsModal.vue';

export default defineComponent({
  components: {
    PlusSquareFilled,
    DeleteFilled,
    EyeFilled,
    EntryDetailsModal,
  },
  data() {
    const selectedEntry = {};
    const selectedSourceID = '';
    const entryDetailsModalShow = false;
    const columns = [
      {
        title: 'UF',
        dataIndex: 'UF',
        key: 'UF',
        sorter: true,
        slots: { customRender: 'UF' },
      },
      {
        title: 'Operación',
        key: 'operation',
        width: 150,
        slots: { customRender: 'operation' },
      },
    ];
    return {
      selectedEntry,
      entryDetailsModalShow,
      columns,
      selectedSourceID,
      entriesOfTheSource: [],
    };
  },
  async mounted() {
    const id = this.$store.sources.id;
    const { data } = await EntryA.getAllEntriesBySourceID(id);
    this.entriesOfTheSource = data.getAllEntriesBySourceID;
    this.selectedSourceID = id.toString();
  },
  methods: {
    selectFilterOption(input: string, option: any) {
      return (
        option.props.value.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    onAdd() {
      this.$router.push({
        name: 'newEntryA',
        params: {
          source: this.selectedSourceID,
        },
      });
    },
    entryDetailsModalShowMethod(entry) {
      this.selectedEntry = entry;
      this.entryDetailsModalShow = true;
      console.log('selectedEntry esta:', this.selectedEntry);
    },
    closeEntryDetailsModal() {
      this.entryDetailsModalShow = false;
    },
    goSources() {
      this.$router.push({ name: 'sources' });
    },
  },
});
</script>
