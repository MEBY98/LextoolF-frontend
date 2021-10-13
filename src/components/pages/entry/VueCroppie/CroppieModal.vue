<template>
  <a-modal v-model:visible="visible" :footer="null" width="600px">
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
  <capture-screen-shot @paste="onPaste"></capture-screen-shot>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import CaptureScreenShot from './CaptureScreenShot.vue';
import 'croppie/croppie.css';
import VueCroppie from './VueCroppieComponent';
import UseCroppieOptions from './UseCroppieOptions';
import { base64ImageToFile, readImageAsUrl } from '@/utils/images';
export default defineComponent({
  components: {
    'vue-croppie': VueCroppie,
    'capture-screen-shot': CaptureScreenShot,
  },
  emits: ['crop'],
  setup(props, context) {
    const { boundary, viewport, options } = UseCroppieOptions();
    const croppieRef = ref();
    const visible: Ref<boolean> = ref(false);
    const showCroppie: Ref<boolean> = ref(false);
    const cancelCroppieModal = () => {
      visible.value = false;
    };
    const onPaste = (e) => {
      const imgFile = e;
      if (imgFile) {
        readImageUrl(imgFile);
      }
    };
    const readImageUrl = (imgFile) => {
      readImageAsUrl(imgFile, (reader) => {
        showCroppie.value = true;
        croppieRef.value.bind({
          url: reader.result,
        });
      });
      visible.value = true;
    };
    const crop = () => {
      croppieRef.value.result(options.value, (base64) => {
        const file = base64ImageToFile(base64);
        const image = {
          file,
          base64,
          context: '',
        };
        visible.value = false;
        showCroppie.value = false;
        context.emit('crop', image);
      });
    };
    return {
      onPaste,
      cancelCroppieModal,
      crop,
      visible,
      showCroppie,
      croppieRef,
      boundary,
      viewport,
    };
  },
});
</script>
