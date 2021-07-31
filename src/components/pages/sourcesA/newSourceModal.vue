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
  emits: ['close-modal', 'add-source'],
  data() {
    const transferLocale = {
      itemUnit: '',
      itemsUnit: '',
    };
    const source = {
      name: '',
      ref: '',
      file: '',
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
      loading,
      modalShow,
      labelColModal: { span: 8 },
      wrapperColModal: { span: 14 },
    };
  },
  methods: {
    submit() {
      console.log(this.source);
      this.loading = true;
      Sources.createSource(this.source);
      this.$router.push('sources');
    },
    closeModal(event) {
      this.$emit('close-modal');
    },
    resetForm() {
      this.source = {
        name: '',
        ref: '',
        file: '',
      };
    },
  },
});
</script>
