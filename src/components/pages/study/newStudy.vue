<template>
  <h4>Crear Nuevo Estudio Fraseologico</h4>
  <br />
  <a-form ref="formRef" :model="study" :rules="rules">
    <a-form-item
      ref="name"
      label="Nombre del Estudio"
      name="name"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-input v-model:value="study.name"></a-input>
    </a-form-item>

    <a-form-item
      ref="period"
      label="Periodo de Estudio"
      name="period"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-input
        v-model:value="study.period"
        @input="autogeneratePeriod = !autogeneratePeriod"
      ></a-input>
    </a-form-item>
    <a-form-item>
      <a-table
        :data-source="study.dictionaries"
        :columns="columns"
        :row-key="(record) => record.name"
        bordered
      >
        <template #title>
          <a-tooltip title="Agregar Diccionario Nuevo" placement="right">
            <a @click="showModal">
              Nuevo
              <PlusSquareFilled
                :style="{ fontSize: '25px', color: '#08c', margin: '5px' }"
              />
            </a>
          </a-tooltip>
          <a-tooltip
            title="Agregar Diccionario de otro Estudio"
            placement="right"
          >
            <a @click="showModalImportDictionaryMethod">
              Importar
              <PlusSquareFilled
                :style="{ fontSize: '25px', color: '#08c', margin: '5px' }"
                @click="showModalImportDictionaryMethod"
              />
            </a>
          </a-tooltip>
        </template>
        <template #operation="{ record }">
          <a @click="dictionaryDetailsShowMethod(record)">
            <EyeFilled
              :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
            />
          </a>
          <a @click="editDictionaryModalShowMethod(record)">
            <EditFilled
              :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
            />
          </a>
          <a-popconfirm
            v-if="study.dictionaries.length"
            title="Seguro de Eliminar?"
            @confirm="deleteDictionary(record)"
          >
            <a>
              <DeleteFilled
                :style="{ fontSize: '20px', color: 'red', margin: '5px' }"
              />
            </a>
          </a-popconfirm>
        </template>
      </a-table>
    </a-form-item>
    <div style="text-align: right">
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        style="margin-right: 5px"
        @click="createStudy"
      >
        Crear
      </a-button>
      <a-button key="back" @click="goStudies">Cancelar</a-button>
    </div>
  </a-form>

  <new-dictionary-modal
    v-model:visible="newDictionaryModalShow"
    @close-modal="showModal"
    @add-dictionary="addDictionary"
  ></new-dictionary-modal>
  <dictionary-details-modal
    v-model:visible="dictionaryDetailsShow"
    :selected-dictionary="selectedDictionary"
  ></dictionary-details-modal>
  <edit-dictionary-modal
    v-model:visible="editDictionaryModalShow"
    @edit-dictionary="editDictionary"
  ></edit-dictionary-modal>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, UnwrapRef, h } from 'vue';
import {
  EyeFilled,
  EditFilled,
  DeleteFilled,
  PlusSquareFilled,
} from '@ant-design/icons-vue';
import NewDictionaryModal from './newDictionaryModal.vue';
import EditDictionaryModal from './editDictionaryModal.vue';
import DictionaryDetailsModal from './dictionaryDetailsModal.vue';
import { Study } from '@/graphql/modules/study/model';
// import { RuleObject, ValidateErrorEntity } from 'ant-design-vue/es/form/index';

export default defineComponent({
  components: {
    EyeFilled,
    EditFilled,
    DeleteFilled,
    PlusSquareFilled,
    NewDictionaryModal,
    EditDictionaryModal,
    DictionaryDetailsModal,
  },
  data() {
    const columns = [
      {
        title: 'Siglas del Diccionario',
        dataIndex: 'shortName',
        width: 200,
        sorter: true,
        slots: { customRender: 'shortName' },
      },
      {
        title: 'Siglas del Autor',
        dataIndex: 'author',
        width: 350,
        sorter: true,
        customRender: ({ text }) => {
          let result = [];
          text.forEach((element) => {
            result.push(element.siglas);
            result.push(', ');
          });
          return h('a', { href: 'javascript:;' }, result);
        },
        // slots: { customRender: 'author[index].siglas' },
      },
      {
        title: 'Año',
        dataIndex: 'annoOfPublication',
        width: 200,
        sorter: true,
        slots: { customRender: 'annoOfPublication' },
      },
      {
        title: 'Operacion',
        dataIndex: 'operation',
        width: 150,
        sorter: true,
        slots: { customRender: 'operation' },
      },
    ];
    const rules = {
      name: [
        {
          required: true,
          message: 'Por favor escriba el nombre',
          trigger: 'blur',
        },
      ],
    };
    const formRef = ref();
    const study: UnwrapRef<any> = reactive({
      name: '',
      period: '',
      dictionaries: [],
    });
    const newDictionaryModalShow = false;
    const showModalImportDictionary = false;
    const dictionaryDetailsShow = false;
    const editDictionaryModalShow = false;
    const loading = false;
    const selectedDictionary = {};
    const autogeneratePeriod = true;
    return {
      autogeneratePeriod,
      loading,
      newDictionaryModalShow,
      showModalImportDictionary,
      dictionaryDetailsShow,
      editDictionaryModalShow,
      selectedDictionary,
      columns,
      formRef,
      study,
      rules,
      labelCol: { span: 7 },
      wrapperCol: { span: 14 },
    };
  },
  methods: {
    showModal() {
      this.newDictionaryModalShow = !this.newDictionaryModalShow;
    },
    showModalImportDictionaryMethod() {
      this.showModalImportDictionary = !this.showModalImportDictionary;
    },
    addDictionary(newDictionary) {
      console.log(newDictionary);
      this.study.dictionaries.push(newDictionary);
      if (this.autogeneratePeriod) {
        this.updatePeriod(this.study.dictionaries);
      }
      this.showModal();
    },
    updatePeriod(dictionaries) {
      let maxYear = 0;
      let minYear = 1000000;
      console.log(dictionaries);
      if (dictionaries.length === 1) {
        this.study.period = dictionaries[0].annoOfPublication.toString();
      } else {
        dictionaries.forEach((element) => {
          if (element.annoOfPublication > maxYear) {
            maxYear = element.annoOfPublication;
          }
          if (element.annoOfPublication < minYear) {
            minYear = element.annoOfPublication;
          }
        });
        console.log(minYear.toString() + '-' + maxYear.toString());
        this.study.period = minYear.toString() + '-' + maxYear.toString();
      }
    },
    deleteDictionary(record) {
      console.log(record);
      this.study.dictionaries = this.study.dictionaries.filter(
        (item) =>
          record.name !== item.name ||
          record.shortName !== item.shortName ||
          record.reference !== item.reference
      );
    },
    createStudy() {
      console.log(this.study);
      this.loading = true;
      Study.createStudy(this.study);
      this.$router.push({ name: 'studies' });
    },
    goStudies() {
      this.$router.push({ name: 'studies' });
    },
    dictionaryDetailsShowMethod(record) {
      this.selectedDictionary = record;
      this.dictionaryDetailsShow = !this.dictionaryDetailsShow;
    },
    editDictionaryModalShowMethod(record) {
      this.$store.dictionary = record;
      this.editDictionaryModalShow = !this.editDictionaryModalShow;
    },
    editDictionary(editedDictionary) {
      let found = false;
      let i = 0;
      for (; i < this.study.dictionaries.length && !found; i++) {
        const d = this.study.dictionaries[i];
        if (d.id == editedDictionary.id) {
          found = true;
        }
      }
      if (found) {
        this.study.dictionaries[i - 1] = editedDictionary;
      }
      this.editDictionaryModalShow = !this.editDictionaryModalShow;
    },
  },
});
</script>
