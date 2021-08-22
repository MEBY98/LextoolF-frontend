<template>
  <h4>Nueva Unidad Fraseológica Candidata</h4>
  <br />
  <a-form ref="formRef" :model="entryA" :rules="rules">
    <a-form-item
      ref="UF"
      label="Unidad Fraseológica"
      name="UF"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-input v-model:value="entryA.UF"></a-input>
    </a-form-item>
    <a-form-item
      ref="context"
      label="Contexto"
      name="context"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <div class="w-100 h-100 d-flex justify-content-start">
        <div class="d-flex flex-row align-items-center justify-center">
          <vue-croppie
            button-text="Seleccionar Imagen"
            icon="upload"
            @crop="onFileSelected($event)"
            ref="upload"
          ></vue-croppie>
          <br />
          <span v-if="selectedFile === null" class="file-info">
            No files selected
          </span>
          <span v-else class="file-info">
            {{ selectedFile }}
          </span>
        </div>
      </div>
    </a-form-item>
    <div style="text-align: right">
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        style="margin-right: 5px"
        @click="createEntryA"
      >
        Crear
      </a-button>
      <a-button key="back" @click="goBack">Cancelar</a-button>
    </div>
  </a-form>
</template>
<script lang="ts">
import Vue, { defineComponent, reactive, ref, UnwrapRef, h } from 'vue';
import {
  PlusOutlined,
  MinusCircleFilled,
  PlusSquareFilled,
  DoubleRightOutlined,
  FolderOpenOutlined,
  DeleteOutlined,
  EyeFilled,
  EditFilled,
  DeleteFilled,
} from '@ant-design/icons-vue';
import { base64ImageToFile, readImageAsUrl } from '../../../utils/images';
import { axiosClientPostImage } from '@/plugins/axios';
import VueCroppie from './VueCroppie.vue';
import { EntryA } from '@/graphql/modules/entryA/model';

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}
export default defineComponent({
  components: {
    PlusOutlined,
    MinusCircleFilled,
    PlusSquareFilled,
    DoubleRightOutlined,
    FolderOpenOutlined,
    DeleteOutlined,
    EyeFilled,
    EditFilled,
    DeleteFilled,
    'vue-croppie': VueCroppie,
  },
  data() {
    const rules = {
      UF: [
        {
          required: true,
          message: 'Por favor escriba la UF',
          trigger: 'blur',
        },
      ],
    };
    const formRef = ref();
    const loading = false;
    const entryA = {
      UF: '',
      lemma: '',
      source: '',
      letter: '',
      context: '',
    };
    const selectedImageIndex = -1;
    return {
      loading,
      entryA,
      formRef,
      rules,
      selectedFile: null,
      labelCol: { span: 7 },
      wrapperCol: { span: 14 },
      selectedImageIndex,
    };
  },

  methods: {
    createEntryA() {
      console.log(this.entryA);
      this.loading = true;
      this.entryA.source = this.$route.params.source.toString();

      if (!(this.selectedFile === null)) {
        const element = this.selectedFile;
        const extensionFile = '.' + element.name.split('.')[1];
        const date = Date.now();
        this.entryA.context = 'context_' + date + extensionFile;
        console.log('file name', this.entryA.context);

        const formData = new FormData();
        console.log(this.selectedFile);
        formData.append('file', this.selectedFile);
        axiosClientPostImage
          .post(`/${this.entryA.context}`, formData)
          .then(function () {
            console.log('SUCCESS!!');
          })
          .catch(function () {
            console.log('FAILURE!!');
          });
      }

      EntryA.createEntry(this.entryA);
      this.$router.push({ name: 'extractionTask' });
    },
    onFileSelected(image) {
      this.selectedFile = image;
      console.log('image', image);
      console.log('this.selectedFile', this.selectedFile);
    },
    goBack() {
      this.$router.push({ name: 'extractionTask' });
    },
  },
});
</script>
<style>
.box01 {
  width: 100%;
  /* border: 5px solid red; */
  display: flex;
  align-items: flex-start;
}

.box02 {
  width: 35%;
  /* background: yellow; */
}

.box03 {
  width: 100%;
  height: 100%;
  /* background: green; */
}

.imageBox {
  width: 100%;
}
</style>
