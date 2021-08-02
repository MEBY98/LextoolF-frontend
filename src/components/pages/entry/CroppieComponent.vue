<template>
  <a-modal v-model:visible="visible" :footer="null" @ok="emit('close')">
    <vue-croppie
      v-show="showCroppie"
      ref="croppieRef"
      :enable-exif="true"
      :enable-orientation="true"
      :boundary="boundary"
      :viewport="viewport"
    ></vue-croppie>
    <label
      v-show="!showCroppie"
      class="profile-uploader-box"
      for="upload-profile-picture"
    >
      <a-upload name="file" :show-upload-list="false" @change="changeImageFile">
        <a-button>
          <upload-outlined></upload-outlined>
          Seleccionar Foto
        </a-button>
      </a-upload>
    </label>
    <div v-show="showCroppie" class="upload-demo-wrap">
      <div id="upload-profile"></div>
      <div class="upload-help d-flex">
        <a-button @click="reset">Elegir otra foto</a-button>
        <a-button class="ml-auto mr-2" @click="$emit('close')">
          Cancelar
        </a-button>
        <a-button type="primary" @click="crop">Usar foto</a-button>
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import VueCroppie from './VueCroppie/VueCroppieComponent';
import { UploadOutlined } from '@ant-design/icons-vue';
import 'croppie/croppie.css';
// import './cropModal.css';
import {
  base64ImageToFile,
  readImageAsUrl,
} from '../../../../src/utils/images';

export default defineComponent({
  components: { 'vue-croppie': VueCroppie, UploadOutlined },
  props: {
    boundary: {
      type: Object,
      default: () => {
        // return { width: '100%', height: 400 };
        return { width: '100%', height: 400 };
      },
    },
    viewport: {
      type: Object,
      default: function () {
        return {
          width: 200,
          height: 200,
          type: 'square',
        };
      },
    },
  },
  emits: ['cropped', 'close'],
  setup() {
    const croppieRef = ref();
    return {
      croppieRef,
    };
  },
  data: () => ({
    visible: true,
    showCroppie: false,
    options: {
      format: 'jpeg',
      circle: false,
    },
  }),
  watch: {},
  methods: {
    changeImageFile(e) {
      const imgFile = e.file.originFileObj;
      if (imgFile) {
        this.readImageUrl(imgFile);
      }
    },
    reset() {
      this.showCroppie = false;
      this.croppieRef.refresh();
    },
    readImageUrl(imgFile) {
      readImageAsUrl(imgFile, (reader) => {
        this.showCroppie = true;
        this.croppieRef.bind({
          url: reader.result,
        });
      });
    },
    crop() {
      this.croppieRef.result(this.options, (base64) => {
        const file = base64ImageToFile(base64);
        const image = {
          file,
          base64,
        };
        this.$emit('cropped', image);
      });
    },
  },
});
</script>
