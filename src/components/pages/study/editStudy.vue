<template>
  <h4>Editar Estudio Fraseologico</h4>
  <br />
  <a-form ref="formRef" :model="studyToEdit">
    <a-form-item
      ref="name"
      name="name"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :colon="false"
      :rules="rules"
    >
      <template #label>
        <span :style="{ 'font-weight': '700' }">Nombre del Estudio</span>
      </template>
      <a-input
        v-model:value="studyToEdit.name"
        :style="{ 'font-weight': '500' }"
      ></a-input>
    </a-form-item>
    <a-form-item :colon="false">
      <template #label>
        <span :style="{ 'font-weight': '700' }">
          Diccionarios
          <a-tooltip title="Agregar Diccionario" placement="right">
            <PlusSquareFilled
              :style="{ fontSize: '25px', color: '#08c', margin: '5px' }"
              @click="showNewDictionaryModalMethod"
            />
          </a-tooltip>
        </span>
      </template>
      <a-table
        :data-source="studyToEdit.dictionaries"
        :columns="columns"
        :row-key="(record) => record.name"
        :pagination="false"
        bordered
      >
        <template #operation="{ record }">
          <a-tooltip title="Detalles del Diccionario" placement="bottom">
            <a @click="showDictionaryDetailsModalMethod(record)">
              <EyeFilled
                :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
              />
            </a>
          </a-tooltip>
          <a-tooltip title="Editar Diccionario" placement="bottom">
            <a @click="showDictionaryEditModalMethod(record)">
              <EditFilled
                :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
              />
            </a>
          </a-tooltip>
          <a-popconfirm
            v-if="studyToEdit.dictionaries.length"
            title="Seguro de Eliminar?"
            @confirm="deleteDictionary(record)"
          >
            <a-tooltip title="Eliminar Diccionario" placement="bottom">
              <a v-if="studyToEdit.dictionaries.length > 1">
                <DeleteFilled
                  :style="{ fontSize: '20px', color: 'red', margin: '5px' }"
                />
              </a>
            </a-tooltip>
          </a-popconfirm>
        </template>
      </a-table>
    </a-form-item>
    <div style="text-align: right">
      <a-button
        key="submit"
        type="primary"
        style="margin-right: 5px"
        :loading="loading"
        @click="editStudy"
      >
        Guardar
      </a-button>
    </div>
  </a-form>

  <dictionary-details-modal
    v-model:visible="showDictionaryDetailsModal"
    :selected-dictionary="selectedDictionary"
  ></dictionary-details-modal>
  <dictionary-edit-modal
    v-model:visible="showDictionaryEditModal"
    @edit-dictionary="editDictionary"
  ></dictionary-edit-modal>
  <new-dictionary-modal
    v-model:visible="showNewDictionaryModal"
    @add-dictionary="addDictionary"
  ></new-dictionary-modal>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, UnwrapRef, h } from 'vue';
import {
  EyeFilled,
  EditFilled,
  DeleteFilled,
  PlusSquareFilled,
} from '@ant-design/icons-vue';
import DictionaryDetailsModal from './dictionaryDetailsModal.vue';
import DictionaryEditModal from './editDictionaryModal.vue';
import NewDictionaryModal from './newDictionaryModal.vue';
import { Study } from '@/graphql/modules/study/model';
import { Dictionary } from '@/graphql/modules/dictionary/model';
// import { RuleObject, ValidateErrorEntity } from 'ant-design-vue/es/form/index';

export default defineComponent({
  components: {
    EyeFilled,
    EditFilled,
    DeleteFilled,
    PlusSquareFilled,
    DictionaryDetailsModal,
    DictionaryEditModal,
    NewDictionaryModal,
  },
  data() {
    const studyToEdit = { id: '', name: '', shortName: '', dictionaries: [] };
    const selectedDictionary = {};
    const columns = [
      {
        title: 'Siglas del Diccionario',
        dataIndex: 'shortName',
        width: 250,
        sorter: true,
        slots: { customRender: 'shortName' },
      },
      {
        title: 'Siglas del Autor',
        dataIndex: 'author',
        width: 250,
        sorter: true,
        customRender: ({ text }) => {
          let result = [];
          text.forEach((element) => {
            result.push(element.siglas);
            result.push(', ');
          });
          return h('span', { href: 'javascript:;' }, result);
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
          message: 'Por favor escriba el Nombre',
          trigger: 'blur',
        },
      ],
    };

    const formRef = ref();
    const showDictionaryDetailsModal = false;
    const showDictionaryEditModal = false;
    const showNewDictionaryModal = false;
    const loading = false;
    return {
      loading,
      rules,
      showNewDictionaryModal,
      showDictionaryDetailsModal,
      showDictionaryEditModal,
      columns,
      formRef,
      studyToEdit,
      selectedDictionary,
      labelCol: { span: 7 },
      wrapperCol: { span: 14 },
    };
  },
  async mounted() {
    const id = this.$route.params.id.toString();
    const { data } = await Study.getStudyByID(id);
    this.studyToEdit = data.getStudyByID;
    console.log(this.studyToEdit);
  },
  methods: {
    showNewDictionaryModalMethod() {
      this.showNewDictionaryModal = !this.showNewDictionaryModal;
    },
    async addDictionary(newDictionary) {
      console.log(newDictionary);
      const { data } = await Dictionary.createDictionaryByStudyID(
        this.studyToEdit.id,
        newDictionary
      );
      console.log('data:', data);
      const createdDictionary = data.createDictionaryByStudyID;
      this.studyToEdit.dictionaries.push(createdDictionary);
      console.log('createdDictionary:', createdDictionary);
      console.log('studyToEdit:', this.studyToEdit);
      this.showNewDictionaryModal = !this.showNewDictionaryModal;
    },
    deleteDictionary(record) {
      console.log(record);
      this.studyToEdit.dictionaries = this.studyToEdit.dictionaries.filter(
        (item) => record.id !== item.id
      );
    },
    async editStudy() {
      console.log(this.studyToEdit);
      this.loading = !this.loading;
      await Study.editStudy(this.studyToEdit);
      this.loading = !this.loading;
      this.$router.push({ name: 'studies' });
    },
    goStudies() {
      this.$router.push('studies');
    },
    showDictionaryDetailsModalMethod(record) {
      this.showDictionaryDetailsModal = !this.showDictionaryDetailsModal;
      this.selectedDictionary = record;
      console.log('selectedDictionary:', this.selectedDictionary);
    },
    showDictionaryEditModalMethod(record) {
      this.showDictionaryEditModal = !this.showDictionaryEditModal;
      this.$store.dictionary = record;
      console.log('dictionaryStore:', this.$store.dictionary);
    },
    editDictionary(dictionaryEdited) {
      console.log('dictionaryEdited:', dictionaryEdited);
      let found = false;
      let i = 0;
      for (; i < this.studyToEdit.dictionaries.length && !found; i++) {
        const d = this.studyToEdit.dictionaries[i];
        if (d.id == dictionaryEdited.id) {
          found = true;
        }
      }
      if (found) {
        this.studyToEdit.dictionaries[i - 1] = dictionaryEdited;
        console.log('dictionaries:', this.studyToEdit.dictionaries);
      }
      this.showDictionaryEditModal = false;
    },
  },
});
</script>
