<template>
  <h4>Crear Nueva Unidad Fraseologica</h4>
  <br />
  <a-form ref="formRef" :model="newEntry">
    <a-form-item
      label="Contexto"
      name="context"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <!-- Implement of Cropper -->

      <a-upload name="file" :show-upload-list="false" @change="changeImageFile">
        <br v-if="imageUrl" />
        <a-button v-if="imageUrl">
          <upload-outlined></upload-outlined>
          Cambiar Foto
        </a-button>
        <a-button v-else>
          <upload-outlined></upload-outlined>
          Subir Foto
        </a-button>
      </a-upload>

      <a-modal v-model:visible="showCropperModal" :footer="null">
        <vue-croppie
          v-show="showCroppie"
          ref="croppieRef"
          :enable-exif="true"
          :enable-orientation="true"
          :boundary="boundary"
          :viewport="viewport"
        ></vue-croppie>
        <div v-show="showCroppie" class="upload-demo-wrap">
          <div id="upload-profile"></div>
          <div class="upload-help d-flex">
            <a-button @click="reset">Elegir otra foto</a-button>
            <a-button class="ml-auto mr-2">Cancelar</a-button>
            <a-button type="primary" @click="crop">Usar foto</a-button>
          </div>
        </div>
      </a-modal>
      <br />
      <img v-if="imageUrl" :src="imageUrl" alt="Articulo Lexicografico" />
      <div v-else>
        <loading-outlined v-if="loading"></loading-outlined>
      </div>
      <!-- End Implement of Cropper -->
    </a-form-item>
    <a-form-item
      label="Lema"
      name="lemma"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-input v-model:value="newEntry.lemma"></a-input>
    </a-form-item>

    <a-form-item
      v-for="(UF, index) in newEntry.UFs"
      :key="index"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :label="'UF ' + (index + 1)"
    >
      <a-input
        v-model:value="newEntry.UFs[index].UF"
        placeholder="Unidad Fraseologica"
        style="width: 90%; margin-right: 5px"
      ></a-input>
      <PlusOutlined
        v-if="newEntry.UFs.length - 1 === index"
        class="dynamic-add-button"
        :disabled="newEntry.UFs.length === 1"
        :style="{ color: '#1890ff' }"
        @click="addUF"
      />
      <MinusCircleFilled
        v-if="newEntry.UFs.length > 1"
        class="dynamic-delete-button"
        :disabled="newEntry.UFs.length === 1"
        :style="{ color: 'red', marginLeft: '4px' }"
        @click="removeUF(UF)"
      />
    </a-form-item>

    <div style="text-align: right">
      <a-button
        key="submit"
        type="primary"
        style="margin-right: 5px"
        @click="createUF"
      >
        Crear
      </a-button>
      <a-button key="back" @click="goStudies">Cancelar</a-button>
    </div>
  </a-form>
</template>
<script lang="ts">
import Vue, { defineComponent, reactive, ref, UnwrapRef, h } from 'vue';
import {
  PlusOutlined,
  MinusCircleFilled,
  LoadingOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue';
import { base64ImageToFile, readImageAsUrl } from '../../../utils/images';
import VueCroppie from './VueCroppie/VueCroppieComponent';
import 'croppie/croppie.css';
import { message } from 'ant-design-vue';

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

export default defineComponent({
  components: {
    PlusOutlined,
    MinusCircleFilled,
    LoadingOutlined,
    UploadOutlined,
    'vue-croppie': VueCroppie,
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['letter'],
  setup() {
    const croppieRef = ref();
    return {
      croppieRef,
    };
  },
  data() {
    const boundary = { width: '100%', height: 400 };
    const viewport = {
      width: 200,
      height: 200,
      type: 'square',
    };
    const showCropperModal = false;
    const imageUrl = null;
    const loading = false;
    const showCroppie = false;
    const options = {
      format: 'jpeg',
      circle: false,
    };
    const newEntry: UnwrapRef<any> = reactive({
      context: '',
      lemma: '',
      letter: '',
      UFs: [
        {
          UF: '',
          clasification: [],
        },
      ],
    });
    return {
      showCroppie,
      options,
      boundary,
      viewport,
      imageUrl,
      showCropperModal,
      newEntry,
      loading,
      labelCol: { span: 7 },
      wrapperCol: { span: 14 },
    };
  },
  methods: {
    createUF() {
      this.newEntry.letter = this.$route.params.letter.toString();
      this.newEntry.context = this.imageUrl;
      console.log(this.newEntry);
      //   this.$router.push('dictionaries');
    },
    goStudies() {
      this.$router.push('studies');
    },
    changeImageFile(e) {
      const imgFile = e.file.originFileObj;
      if (imgFile) {
        this.readImageUrl(imgFile);
      }
    },
    readImageUrl(imgFile) {
      readImageAsUrl(imgFile, (reader) => {
        this.showCroppie = true;
        this.croppieRef.bind({
          url: reader.result,
        });
      });
      this.showCropperModal = true;
    },
    reset() {
      this.showCroppie = false;
      this.croppieRef.refresh();
    },
    crop() {
      this.croppieRef.result(this.options, (base64) => {
        const file = base64ImageToFile(base64);
        const image = {
          file,
          base64,
        };
        this.imageUrl = image.base64;
      });
      this.closeCroppieModal();
    },
    closeCroppieModal() {
      this.showCropperModal = false;
    },
    removeUF(UF) {
      let index = this.newEntry.UFs.indexOf(UF);
      if (index !== -1) {
        this.newEntry.UFs.splice(index, 1);
      }
    },
    addUF() {
      this.newEntry.UFs.push({
        UF: '',
        clasification: [],
      });
    },
  },
});
</script>
