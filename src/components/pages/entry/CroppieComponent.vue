<template>
  <a-upload name="file" :show-upload-list="false" @change="changeImageFile">
    <loading-outlined v-if="loading"></loading-outlined>
    <a-button type="primary" class="d-flex align-items-center justify-center">
      <FolderOpenOutlined v-if="icon === 'upload'" />
      <SyncOutlined v-if="icon === 'change'" />
      {{ buttonText }}
    </a-button>
  </a-upload>
  <a-modal v-model:visible="visible" :footer="null">
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
        <a-button class="ml-auto mr-2" @click="cancelCroppieModal">
          Cancelar
        </a-button>
        <a-button type="primary" @click="crop">Usar foto</a-button>
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts">
import {
  LoadingOutlined,
  FolderOpenOutlined,
  SyncOutlined,
} from '@ant-design/icons-vue';

import Vue, { defineComponent, reactive, ref } from 'vue';
import 'croppie/croppie.css';
import VueCroppie from './VueCroppie/VueCroppieComponent';
import { base64ImageToFile, readImageAsUrl } from '../../../utils/images';

export default defineComponent({
  components: {
    LoadingOutlined,
    SyncOutlined,
    FolderOpenOutlined,
    VueCroppie,
  },
  props: {
    buttonText: {
      type: String,
    },
    icon: {
      type: String,
    },
  },
  emits: ['crop'],
  setup() {
    const croppieRef = ref();
    return {
      croppieRef,
    };
  },
  data() {
    const showCroppie = false;
    const visible = false;
    const imageUrl = null;
    const imageFile = null;
    const loading = false;
    const options = {
      format: 'jpeg',
      circle: false,
    };
    const boundary = { width: '100%', height: 400 };
    const viewport = {
      width: 270,
      height: 190,
      type: 'square',
    };
    return {
      showCroppie,
      visible,
      boundary,
      viewport,
      imageUrl,
      imageFile,
      loading,
      options,
    };
  },
  methods: {
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
      this.visible = true;
    },
    crop() {
      this.croppieRef.result(this.options, (base64) => {
        const file = base64ImageToFile(base64);
        const image = {
          file,
          base64,
          context: '',
        };
        this.showCroppie = false;
        this.closeCroppieModal(image);
        // console.log('image:', image);
        // this.imageUrl = image.base64;
        // this.imageFile = image.file;
      });
    },
    closeCroppieModal(image) {
      this.visible = false;
      this.$emit('crop', image);
    },
    cancelCroppieModal() {
      this.visible = false;
      console.log('viewport', this.viewport);
      console.log('bounds', this.boundary);
    },
  },
});
</script>
