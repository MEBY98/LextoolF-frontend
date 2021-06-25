<template>
  <div>
    <h3>Estudio Seleccionado: {{ $store.study.name }}</h3>
    <a-select
      v-model:value="selectedDictionary"
      show-search
      placeholder="Seleccione el Diccionario"
      style="width: 500px; margin-top: 5px"
      :filter-option="selectFilterOption"
      @change="selectHandleChange"
    >
      <a-select-option
        v-for="d in $store.study.dictionaries"
        :key="d.name"
        :value="d"
      >
        {{ d.name }}
      </a-select-option>
    </a-select>
    <h5 v-show="selectedDictionary" :style="{ 'margin-top': '20px' }">
      Diccionario Seleccionado: {{ selectedDictionary.name }}
    </h5>
    <a-tabs
      v-show="selectedDictionary"
      v-model:activeKey="activeKey"
      :style="{ 'margin-top': '5px' }"
      size="small"
      type="card"
      @change="handleTabChange"
    >
      <a-tab-pane v-for="l in $store.dictionary.letters" :key="l" :tab="l">
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
          :data-sorce="entriesOfSelectedDictionary"
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
import { Dictionary } from '@/graphql/modules/dictionary/model.ts';
export default defineComponent({
  components: {
    PlusSquareFilled,
  },
  data() {
    const entriesOfSelectedDictionary = [];
    const selectedDictionary = {};
    const activeKey = 'A';
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
        dataIndex: 'UFs',
        customRender: ({ text }) => {
          let result = [];
          text.forEach((element) => {
            result.push(element.UF);
            result.push(', ');
          });
          return h('span', { href: 'javascript:;' }, result);
        },
      },
      {
        title: 'Operación',
        key: 'operation',
        width: 150,
        slots: { customRender: 'operation' },
      },
    ];
    return {
      entriesOfSelectedDictionary,
      selectedDictionary,
      activeKey,
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
      this.$store.dictionary = value;
      console.log('dictionaryStore:', this.$store.dictionary);
      const { data } = await Dictionary.getDictionaryByID(
        this.$store.dictionary.id
      );
      this.activeKey = value.letters[0];
      this.entriesOfSelectedDictionary = data.getDictionaryByID.entries;
      this.$store.entries = this.entriesOfSelectedDictionary;
      console.log('entriesStore:', this.$store.entries);
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
