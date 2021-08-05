<template>
  <div>
    <h3>Estudio: {{ $store.study.name }}</h3>
    <select-dictionary
      @change-selected-dictionary="changeSelectedDictionary"
    ></select-dictionary>
    <h5 v-if="$store.dictionary.id" :style="{ 'margin-top': '20px' }">
      Diccionario: {{ $store.dictionary.name }}
    </h5>
    <a-tabs
      v-if="$store.dictionary.id"
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
              @click="goNewEntry"
            />
          </a-tooltip>
        </div>
        <a-table
          :data-source="$store.entries"
          :row-key="(record) => record.id"
          :columns="columns"
          size="small"
          bordered
        >
          <template #operation="{ record }">
            <a-tooltip title="Detalles" placement="bottom">
              <a @click="showEntryDetailsModalMethod(record)">
                <EyeFilled
                  :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
                />
              </a>
            </a-tooltip>

            <a-tooltip title="Editar" placement="bottom">
              <a @click="goToEditEntry">
                <EditFilled
                  :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
                />
              </a>
            </a-tooltip>

            <!-- <a-popconfirm
              v-if="studies.length"
              title="Seguro de Eliminar?"
              @confirm="deleteStudy(record.id)"
            >
              <a-tooltip
                title="Eliminar del estudio fraseologico"
                placement="bottom"
              >
                <a>
                  <DeleteFilled
                    :style="{ fontSize: '20px', color: 'red', margin: '5px' }"
                  />
                </a>
              </a-tooltip>
            </a-popconfirm> -->
          </template>
        </a-table>
      </a-tab-pane>
    </a-tabs>
  </div>
  <entry-details-modal
    v-model:visible="showEntryDetailsModal"
    :entry="selectedEntry"
    @close-modal="closeEntryDetailsModalMethod"
  ></entry-details-modal>
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
import { EntryStore } from '@/store/modules/entry';

import EntryDetailsModal from '@/components/pages/entry/EntryDetailsModal.vue';
import SelectDictionary from './SelectDictionary.vue';

export default defineComponent({
  components: {
    PlusSquareFilled,
    EyeFilled,
    EditFilled,
    'entry-details-modal': EntryDetailsModal,
    'select-dictionary': SelectDictionary,
  },
  data() {
    const selectedEntry: EntryStore = {
      id: '',
      context: [''],
      letter: 'A',
      lemma: {
        id: '',
        lemma: '',
        clasification: '',
      },
      sublemmas: [
        {
          id: '',
          sublemma: '',
          clasification: '',
        },
      ],
      UFs: [
        {
          id: '',
          UF: '',
          // descriptors: [['']],
        },
      ],
    };
    const activeKey = 'A';
    const columns = [
      {
        title: 'Lema',
        dataIndex: 'lemma',
        customRender: ({ text }) => {
          return h('span', { href: 'javascript:;' }, text.lemma);
        },
        sorter: true,
        width: 200,
      },
      {
        title: 'Sublemas',
        dataIndex: 'sublemmas',
        customRender: ({ text }) => {
          let result = [];
          text.forEach((element) => {
            result.push(element.sublemma);
            result.push(', ');
          });
          return h('span', { href: 'javascript:;' }, result);
        },
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
      activeKey,
      columns,
      showEntryDetailsModal: false,
      selectedEntry,
    };
  },
  methods: {
    getEntriesByLetter(allEntries, letter) {
      return allEntries.filter((entry) => entry.letter === letter);
    },
    changeSelectedDictionary(selectedDictionary) {
      console.log('changeSelectedDictionary:', selectedDictionary);
      this.$store.dictionary = selectedDictionary;
      this.activeKey = selectedDictionary.letters[0];
      this.$store.entries = this.getEntriesByLetter(
        selectedDictionary.entries,
        this.activeKey
      );
    },
    handleTabChange(activeKey) {
      this.activeKey = activeKey;
      this.$store.entries = this.getEntriesByLetter(
        this.$store.dictionary.entries,
        this.activeKey
      );
      console.log('activekey:', this.activeKey);
      console.log('entriesStore:', this.$store.entries);
    },
    // showNewEntryModalMethod() {
    //   this.showNewEntryModal = true;
    // },
    goNewEntry() {
      this.$router.push({
        name: 'newEntry',
        params: {
          letter: this.activeKey,
        },
      });
    },
    goToEditEntry(selectedEntry) {
      this.$router.push({
        name: 'editEntry',
        params: {
          id: selectedEntry.id,
        },
      });
    },
    showEntryDetailsModalMethod(record) {
      this.selectedEntry = record;
      this.showEntryDetailsModal = true;
    },
    closeEntryDetailsModalMethod() {
      this.showEntryDetailsModal = false;
    },
  },
});
</script>
