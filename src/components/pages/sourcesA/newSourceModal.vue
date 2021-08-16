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
          placeholde="Nombre de la Fuente"
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
        ref="type"
        label="Tipo"
        name="type"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-select v-model:value="source.type" @change="handleTypeChange">
          <a-select-option v-for="type in typeData" :key="type">
            {{ type }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        ref="subType"
        label="Sub-Tipo"
        name="subType"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-select v-model:value="source.subType">
          <a-select-option v-for="subType in subTypes" :key="subType">
            {{ subType }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        ref="file"
        label="Archivo"
        name="file"
        type="file"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <div class="section-file">
          <label class="fileContainer">
            Select files
            <input
              type="file"
              class="file-upload"
              id="file"
              name="file"
              @change="onFileSelected"
            />
          </label>
          <br />
          <span v-if="!this.selectedFile" class="file-info">
            No files selected
          </span>
          <span v-else>{{ this.selectedFile.name }}</span>
        </div>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button key="back" @click="closeModal">Cerrar</a-button>
      <a-button key="submit" type="primary" @click="submit">Agregar</a-button>
    </template>
  </a-modal>
</template>
<script lang="ts">
import 'ant-design-vue/lib/upload/style';
import { MinusCircleFilled, PlusOutlined } from '@ant-design/icons-vue';
import { Sources } from '@/graphql/modules/sourcesA/model';
import VueDocPreview from 'vue-doc-preview';
import { InboxOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';
import { axiosClientPostImage } from '@/plugins/axios';

export default defineComponent({
  componens: {
    InboxOutlined,
    MinusCircleFilled,
    PlusOutlined,
    VueDocPreview,
  },
  emits: ['close-modal', 'add-source'],
  data() {
    const typeData = ['Linguística', 'Metalinguística'];
    const subTypeData = {
      Linguística: ['Oral', 'Escrito'],
      Metalinguística: ['Diccionario', 'Estudio'],
    };
    const source = {
      name: '',
      ref: '',
      file: '',
      type: '',
      subType: '',
    };
    const formItemLayoutWithOutLabelModal = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    const modalShow = false;
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
      typeData,
      subTypeData,
      subTypes: subTypeData[typeData[0]],
      secondSubType: subTypeData[typeData[0]][0],
      selectedFile: null,
      formItemLayoutWithOutLabelModal,
      source,
      modalShow,
      labelColModal: { span: 8 },
      wrapperColModal: { span: 14 },
      file: null,
    };
  },
  methods: {
    submit() {
      console.log(this.source);

      if (!(this.selectedFile === null)) {
        const element = this.selectedFile;
        const extensionFile = '.' + element.name.split('.')[1];
        const date = Date.now();
        this.source.file = 'source_' + date + extensionFile;
        console.log('file name', this.source.file);

        const formData = new FormData();
        console.log(this.selectedFile);
        formData.append('file', this.selectedFile);
        axiosClientPostImage
          .post(`/${this.source.file}`, formData)
          .then(function () {
            console.log('SUCCESS!!');
          })
          .catch(function () {
            console.log('FAILURE!!');
          });
      }

      Sources.createSource(this.source);
      this.$emit('add-source', this.source);
      this.resetForm();
      this.$router.push('sources');
    },
    closeModal(event) {
      this.$emit('close-modal');
      this.resetForm();
    },
    resetForm() {
      this.file = null;
      this.selectedFile = null;
      this.source = {
        name: '',
        ref: '',
        file: '',
        type: '',
        subType: '',
      };
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    handleTypeChange(value) {
      this.subTypes = this.subTypeData[value];
      this.secondSubType = this.subTypeData[value][0];
    },
  },
});
</script>
<style lang="scss">
.fileContainer {
  overflow: hidden;
  position: relative;
  background: #1890ff;
  font-weight: 400;
  border-color: #1890ff;
  color: #fff;
  padding: 6px 18px;
  border-radius: 2px;
  line-height: 21px;
}

form input {
  color: #fff;
  background: #1890ff;
  border-color: #1890ff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
  padding: 10px;
  font-weight: 400;
  border: 1px solid #d9dadc;
  border-radius: 2px;
  font-size: 16px;
  color: #393645;
  resize: none;
}

.fileContainer [type='file'] {
  cursor: pointer;
  display: block;
  font-size: 14px;
  font-weight: 400;
  filter: alpha(opacity=0);
  min-height: 100%;
  min-width: 100%;
  opacity: 0;
  position: absolute;
  left: 0;
  text-align: right;
  top: -8px;
}

.file-info {
  font-size: 13px;
  color: #a9a7a9;
  line-height: 53px;
  padding-left: 10px;
}
</style>
