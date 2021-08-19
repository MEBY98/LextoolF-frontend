<template>
  <h4>Crear Nuevo Proyecto de Diccionario</h4>
  <br />
  <a-form ref="formRef" :model="dictionaryA" :rules="rules">
    <a-form-item
      ref="name"
      label="Nombre del Diccionario"
      name="name"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-input v-model:value="dictionaryA.name"></a-input>
    </a-form-item>
    <a-form-item
      ref="description"
      label="Descripción"
      name="description"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-textarea
        v-model:value="dictionaryA.description"
        placeholder="Descripción del Diccionario"
        allow-clear
      />
    </a-form-item>
    <a-form-item
      ref="reference"
      label="Referencia"
      name="reference"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-textarea
        v-model:value="dictionaryA.reference"
        placeholder="Referencia del Diccionario"
        allow-clear
      />
    </a-form-item>
    <a-form-item>
      <a-table
        :data-source="dictionaryA.sources"
        :columns="columns"
        :row-key="(record) => record.id"
        bordered
      >
        <template #title>
          Fuentes
          <a-tooltip title="Agregar Fuente" placement="right">
            <PlusSquareFilled
              :style="{ fontSize: '25px', color: '#08c', margin: '5px' }"
              @click="showModalS"
            />
          </a-tooltip>
        </template>
        <template #operation="{ record }">
          <a-popconfirm
            v-if="dictionaryA.sources.length"
            title="Seguro de Eliminar?"
            @confirm="deleteSourceByID(record.id)"
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
        @click="createDictionaryA"
      >
        Crear
      </a-button>
      <a-button key="back" @click="goDictionariesA">Cancelar</a-button>
    </div>
  </a-form>
  <new-source-modal
    v-model:visible="newSourceModalShow"
    :selectList="selectList"
    @close-modal="showModalS"
    @add-source="addSource"
  ></new-source-modal>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, UnwrapRef } from 'vue';
import {
  EyeFilled,
  EditFilled,
  DeleteFilled,
  PlusSquareFilled,
} from '@ant-design/icons-vue';
import NewSourceModal from './addSourceModal.vue';
import { DictionaryA } from '@/graphql/modules/dictionaryA/model';
// import { RuleObject, ValidateErrorEntity } from 'ant-design-vue/es/form/index';
import { Sources } from '@/graphql/modules/sourcesA/model';

export default defineComponent({
  components: {
    EyeFilled,
    EditFilled,
    DeleteFilled,
    PlusSquareFilled,
    NewSourceModal,
  },
  data() {
    const columns = [
      {
        title: 'Nombre',
        key: 'name',
        dataIndex: 'name',
        width: 300,
        sorter: true,
        slots: { customRender: 'name' },
      },
      {
        title: 'Referencia',
        dataIndex: 'ref',
        sorter: true,
        width: 200,
        slots: { customRender: 'ref' },
      },
      {
        title: 'Archivo',
        dataIndex: 'file',
        sorter: true,
        width: 200,
        slots: { customRender: 'file' },
      },
      {
        title: 'Operación',
        key: 'operation',
        width: 150,
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
    const newSourceModalShow = false;
    const loading = false;
    const selectedSource = {};
    const transferLocale = {
      itemUnit: '',
      itemsUnit: '',
      notFoundContent: 'No hay letras',
      searchPlaceholder: 'Buscar Letra',
    };
    const source = {
      name: '',
      ref: '',
      file: '',
      letters: [],
    };
    const dictionaryA: UnwrapRef<any> = reactive({
      name: '',
      description: '',
      reference: '',
      sources: [],
    });
    return {
      loading,
      newSourceModalShow,
      transferLocale,
      selectedSource,
      source,
      columns,
      formRef,
      dictionaryA,
      rules,
      labelCol: { span: 7 },
      wrapperCol: { span: 14 },
      selectList: [],
    };
  },
  async mounted() {
    const { data } = await Sources.findAllSources(); ///Este es para cargar la lista de sources en el modal
    this.selectList = data.findAllSources;
  },
  methods: {
    showModalS() {
      this.newSourceModalShow = !this.newSourceModalShow;
    },
    async addSource(newSource) {
      for (let i = 0; i < this.selectList.length; i++) {
        const item = this.selectList[i];
        if (item.id === newSource.id) {
          this.selectList.splice(i, 1);
        }
      }
      await this.dictionaryA.sources.push({
        id: newSource.id,
        name: newSource.name,
        ref: newSource.ref,
        file: newSource.file,
        letters: newSource.letters,
      });
      console.log(this.dictionaryA.sources);
      console.log(this.dictionaryA.sources);
      this.showModalS();
    },
    async deleteSourceByID(id) {
      for (let i = 0; i < this.dictionaryA.sources.length; i++) {
        const item = this.dictionaryA.sources[i];
        if (item.id === id) {
          this.dictionaryA.sources.splice(i, 1);
          this.selectList.push(item);
        }
      }
    },
    createDictionaryA() {
      console.log(this.dictionaryA);
      this.loading = true;
      DictionaryA.createDictionaryA(this.dictionaryA);
      this.$router.push('dictionariesA');
    },
    goDictionariesA() {
      this.$router.push('dictionariesA');
    },
  },
});
</script>
