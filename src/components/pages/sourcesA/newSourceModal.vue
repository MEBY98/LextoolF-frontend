<template>
  <a-modal title="Crear Nueva Fuente" @ok="submit">
    <a-form :model="source">
      <a-form-item
        ref="name"
        label="Nombre de la Fuente"
        name="name"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-input
          v-model:value="source.name"
          placeholde="Nombre del Diccionario"
        ></a-input>
      </a-form-item>
      <a-form-item
        ref="ref"
        label="Referencia"
        name="ref"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-textarea
          v-model:value="source.ref"
          placeholder="Referencia de la Fuente"
          allow-clear
        />
      </a-form-item>
      <a-form-item
        ref="file"
        label="Archivo"
        name="file"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-upload-dragger
          v-model:fileList="fileList"
          name="file"
          :multiple="false"
          action="C:/Users/Arelis/Pictures/uploads"
          @change="handleChange"
        >
          <p class="ant-upload-drag-icon">
            <inbox-outlined></inbox-outlined>
          </p>
          <p class="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </a-upload-dragger>
      </a-form-item>
      <a-form-item
        label="Letras de la Fuente"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-transfer
          :titles="['Sin agregar', 'Agregadas']"
          :data-source="letters"
          :render="(letter) => letter.title"
          :filter-option="filterOptionLettersTransfer"
          show-search
          :target-keys="source.letters"
          :locale="transferLocale"
          @change="handleChangeLettersTransfer"
        ></a-transfer>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button key="back" @click="closeModal">Cerrar</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="submit">
        Agregar
      </a-button>
    </template>
  </a-modal>
</template>
<script lang="ts">
import { MinusCircleFilled, PlusOutlined } from '@ant-design/icons-vue';
import { Sources } from '@/graphql/modules/sourcesA/model';
import VueDocPreview from 'vue-doc-preview';
import { InboxOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';

interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
}
interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}
export default defineComponent({
  components: {
    InboxOutlined,
    MinusCircleFilled,
    PlusOutlined,
    VueDocPreview,
  },
  emits: ['close-modal', 'add-source'],
  data() {
    const transferLocale = {
      itemUnit: '',
      itemsUnit: '',
      notFoundContent: 'No hay letras',
      searchPlaceholder: 'Buscar Letra',
    };

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
    const selectedLetters = [];
    const source = {
      name: '',
      ref: '',
      file: '',
      letters: [],
    };
    const formItemLayoutWithOutLabelModal = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    const modalShow = false;
    const loading = false;
    const formItemLayoutModal = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    return {
      transferLocale,
      formItemLayoutWithOutLabelModal,
      source,
      letters,
      selectedLetters,
      loading,
      modalShow,
      labelColModal: { span: 8 },
      wrapperColModal: { span: 14 },
    };
  },
  setup() {
    const handleChange = (info: FileInfo) => {
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    };
    return {
      handleChange,
      fileList: ref([]),
    };
  },
  methods: {
    submit() {
      console.log(this.source);
      this.loading = true;
      Sources.createSource(this.source);
      this.$router.push('sources');
    },
    handleChangeLettersTransfer(targetKeys, direction, moveKeys) {
      this.source.letters = targetKeys;
    },
    filterOptionLettersTransfer(inputValue, option) {
      return option.title.indexOf(inputValue) > -1;
    },
    closeModal(event) {
      this.$emit('close-modal');
    },
    resetForm() {
      this.source = {
        name: '',
        ref: '',
        file: '',
        letters: [],
      };
    },
  },
});
</script>
