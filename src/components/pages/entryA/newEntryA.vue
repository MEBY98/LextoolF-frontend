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
    <div v-show="$store.sources.support === 'Video'">
      <a-form-item
        ref="context"
        label="Contexto"
        name="context"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <input
          type="file"
          ref="fileInput"
          name="file"
          style="display: none"
          accept="video/mp4,video/x-m4v,video/*"
          @change="onFileSelectedV"
        />
        <a-button type="primary" @click="$refs.fileInput.click()">
          Seleccione el Video
        </a-button>
        <a-button
          :disabled="!selectedFile"
          style="margin-left: 8px"
          key="upload"
          type="primary"
          :loading="loading"
          @click="uploadFileVideo"
        >
          Subir
        </a-button>
        <br />
        <span v-if="!selectedFile" class="file-info">No files selected</span>
        <span v-else class="file-info">{{ selectedFile.name }}</span>
        <br />
        <video
          v-bind:src="videoPreview"
          v-show="showPreview"
          width="320"
          height="240"
          controls
        ></video>
      </a-form-item>
    </div>
    <div v-show="$store.sources.support === 'Audio'">
      <a-form-item
        ref="context"
        label="Contexto"
        name="context"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <input
          type="file"
          ref="fileInputA"
          name="file"
          style="display: none"
          accept="audio/*"
          @change="onFileSelectedA"
        />
        <a-button type="primary" @click="$refs.fileInputA.click()">
          Seleccione el Audio
        </a-button>
        <a-button
          :disabled="!selectedFile"
          style="margin-left: 8px"
          key="uploadA"
          type="primary"
          :loading="loading"
          @click="uploadFileAudio"
        >
          Subir
        </a-button>
        <br />
        <span v-if="!selectedFile" class="file-info">No files selected</span>
        <span v-else class="file-info">{{ selectedFile.name }}</span>
        <br />
        <audio
          v-bind:src="audioPreview"
          v-show="showPreviewAudio"
          controls
        ></audio>
      </a-form-item>
    </div>
    <div style="text-align: right">
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        style="margin-left: 5px"
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
import { EntryA } from '@/graphql/modules/entryA/model';

import { base64ImageToFile, readImageAsUrl } from '../../../utils/images';
import VueCroppie from './VueCroppie.vue';
import { axiosClientPostImage } from '@/plugins/axios';

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
      selected: false,
    };
    return {
      loading,
      entryA,
      formRef,
      rules,
      selectedFile: null,
      labelCol: { span: 7 },
      wrapperCol: { span: 14 },
      showPreviewAudio: false,
      showPreview: false,
      audioPreview: '',
      videoPreview: '',
      uploadProgress: 0,
      uploadProgressAudio: 0,
    };
  },

  methods: {
    createEntryA() {
      console.log(this.entryA);
      this.loading = true;
      this.entryA.source = this.$route.params.source.toString();
      EntryA.createEntry(this.entryA);
      this.$router.push({ name: 'extractionTask' });
    },
    //file Video
    onFileSelectedV(event) {
      this.selectedFile = event.target.files[0];
      let reader = new FileReader();
      reader.addEventListener(
        'load',
        function () {
          this.showPreview = true;
          this.videoPreview = reader.result;
        }.bind(this),
        false
      );

      if (this.selectedFile) {
        if (/\.(mp4|avi|x-m4v)$/i.test(this.selectedFile.name)) {
          reader.readAsDataURL(this.selectedFile);
        }
      }
    },
    uploadFileVideo() {
      console.log('this.selectedFile', this.selectedFile);
      if (!(this.selectedFile === null)) {
        const element = this.selectedFile;
        const extensionFile = '.' + element.name.split('.')[1];
        const date = Date.now();
        this.entryA.context = 'Video_context_' + date + extensionFile;
        console.log('file name', this.entryA.context);

        const config = {
          onUploadProgress: function (progressEvent) {
            this.uploadProgress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(this.uploadProgress);
          },
        };

        const formData = new FormData();
        console.log(this.selectedFile);
        formData.append('file', this.selectedFile);
        axiosClientPostImage
          .post(`/${this.entryA.context}`, formData, config)
          .then(function () {
            console.log('SUCCESS!!');
          })
          .catch(function () {
            console.log('FAILURE!!');
          });
      }
    },
    //file Audio
    onFileSelectedA(event) {
      this.selectedFile = event.target.files[0];
      let reader = new FileReader();
      reader.addEventListener(
        'load',
        function () {
          this.showPreviewAudio = true;
          this.audioPreview = reader.result;
        }.bind(this),
        false
      );

      if (this.selectedFile) {
        if (
          /\.(mp3|m4a|wav|wma|flac|aac|opus)$/i.test(this.selectedFile.name)
        ) {
          reader.readAsDataURL(this.selectedFile);
        }
      }
    },
    uploadFileAudio() {
      console.log('this.selectedFile', this.selectedFile);
      if (!(this.selectedFile === null)) {
        const element = this.selectedFile;
        const extensionFile = '.' + element.name.split('.')[1];
        const date = Date.now();
        this.entryA.context = 'Audio_context_' + date + extensionFile;
        console.log('file name', this.entryA.context);

        const config = {
          onUploadProgress: function (progressEvent) {
            this.uploadProgressAudio = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(this.uploadProgressAudio);
          },
        };

        const formData = new FormData();
        console.log(this.selectedFile);
        formData.append('file', this.selectedFile);
        axiosClientPostImage
          .post(`/${this.entryA.context}`, formData, config)
          .then(function () {
            console.log('SUCCESS!!');
          })
          .catch(function () {
            console.log('FAILURE!!');
          });
      }
    },
    goBack() {
      this.$router.push({ name: 'extractionTask' });
    },
  },
});
</script>
<style>
.file-info {
  font-size: 13px;
  color: #000000;
  line-height: 53px;
  padding-left: 10px;
}
</style>
