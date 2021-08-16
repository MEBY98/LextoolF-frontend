<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <ul
          class="nav nav-primary nav-dotted nav-square-separated justify-content-center justify-content-md-start"
        >
          <li class="nav-item hvr-forward col-md-6">
            <a-card hoverable title="Proyecto de Diccionario Seleccionado">
              <p>Nombre: {{ $store.dictionariesA.name }}</p>
              <p>Descripcion: {{ $store.dictionariesA.description }}</p>
            </a-card>
          </li>
          <li class="nav-item hvr-forward col-md-6" style="padding-left: 10px">
            <a-card hoverable title="Lemario">
              <p>Nombre: {{ $store.lemario.name }}</p>
              <p>Tipo: {{ $store.lemario.dictionaryType }}</p>
            </a-card>
          </li>
        </ul>
      </div>
    </div>

    <a-tabs
      v-model:activeKey="activeKey"
      :style="{ 'margin-top': '5px' }"
      size="small"
      type="card"
      @change="handleTabChange"
    >
      <a-tab-pane v-for="l in this.letters" :key="l.title" :tab="l.title">
        <div>
          <a-tooltip title="Crear nueva entrada fraselogica" placement="right">
            <PlusSquareFilled
              :style="{
                fontSize: '24px',
                color: '#08c',
                'margin-bottom': '10px',
              }"
              @click="onAdd"
            />
          </a-tooltip>
        </div>
        <a-table
          :data-sorce="entriesOfSelectedLemario"
          :columns="columns"
          size="small"
          bordered
        ></a-table>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts">
import {
  EyeFilled,
  EditFilled,
  DeleteFilled,
  PlusSquareFilled,
  CarryOutFilled,
} from '@ant-design/icons-vue';
import { defineComponent, ref, h } from 'vue';
import { LemarioA } from '@/graphql/modules/LemarioA/model.ts';
import { DictionaryA } from '@/graphql/modules/dictionaryA/model';
export default defineComponent({
  components: {
    PlusSquareFilled,
  },
  data() {
    const entriesOfSelectedLemario = [];
    const selectedLemario = {};
    const activeKey = 'A';
    const letters = [
      { title: 'A', key: 'A' },
      { title: 'B', key: 'B' },
      { title: 'C', key: 'C' },
      { title: 'D', key: 'D' },
      { title: 'E', key: 'E' },
      { title: 'F', key: 'F' },
      { title: 'G', key: 'G' },
      { title: 'H', key: 'H' },
      { title: 'I', key: 'I' },
      { title: 'J', key: 'J' },
      { title: 'K', key: 'K' },
      { title: 'L', key: 'L' },
      { title: 'M', key: 'M' },
      { title: 'N', key: 'N' },
      { title: 'Ñ', key: 'Ñ' },
      { title: 'O', key: 'O' },
      { title: 'P', key: 'P' },
      { title: 'Q', key: 'Q' },
      { title: 'R', key: 'R' },
      { title: 'S', key: 'S' },
      { title: 'T', key: 'T' },
      { title: 'U', key: 'U' },
      { title: 'V', key: 'V' },
      { title: 'W', key: 'W' },
      { title: 'X', key: 'X' },
      { title: 'Y', key: 'Y' },
      { title: 'Z', key: 'Z' },
    ];
    const columns = [
      {
        title: 'Contexto',
        dataIndex: 'context',
        width: 200,
        slots: { customRender: 'context' },
      },
      {
        title: 'Lema',
        dataIndex: 'lemma',
        sorter: true,
        width: 200,
      },
      {
        title: 'UF',
        dataIndex: 'UF',
      },
      {
        title: 'Operación',
        key: 'operation',
        width: 150,
        slots: { customRender: 'operation' },
      },
    ];
    return {
      entriesOfSelectedLemario,
      selectedLemario,
      activeKey,
      letters,
      columns,
    };
  },
  methods: {
    selectFilterOption(input: string, option: any) {
      return (
        option.props.value.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    async selectHandleChange(value) {
      console.log('selected:', value);
      this.$store.dictionariesA = value;
      console.log('dictionaryStore:', this.$store.dictionariesA);
      const { data } = await DictionaryA.getLemarioByDictionaryID(
        this.$store.dictionariesA.id
      );
      this.activeKey = value.letters[0];
      this.entriesOfSelectedLemario = data.getLemarioByID.entries;
    },
    handleTabChange(activeKey) {
      this.activeKey = activeKey;
      console.log('activekey:', this.activeKey);
    },
    onAdd() {
      this.$router.push({
        name: 'newEntry',
        params: { letter: this.activeKey },
      });
    },
  },
});
</script>
