<template>
  <div
    v-if="images.length > 0"
    class="container overflow-scroll"
    style="height: 400px; width: 600px; background-color: rgba(255, 0, 0, 0.1)"
  >
    <div v-for="(i, index) in images" :key="index">
      <img
        v-if="i.context !== ''"
        :src="MINIO_URL + '/' + i.context"
        alt="Articulo Lexicografico"
        :style="index === selectedImageIndex ? selectedImageStyle : {}"
        @click="changeSelectedImage(index)"
      />
      <img
        v-else
        :src="i.base64"
        alt="Articulo Lexicografico"
        :style="index === selectedImageIndex ? selectedImageStyle : {}"
        @click="changeSelectedImage(index)"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { MINIO_URL as minio_url } from '@/utils/minIO.ts';

export default defineComponent({
  props: {
    images: {
      type: [Object],
      default: () => {
        return {
          base64: null,
          file: null,
        };
      },
    },
    selectedImageIndex: {
      type: Number,
    },
    selectedImageStyle: {
      type: Object,
      default: () => {
        return {
          border: 'solid 5px #08c',
        };
      },
    },
  },
  emits: ['select-image'],
  setup(props, context) {
    const MINIO_URL = minio_url;
    function changeSelectedImage(index) {
      context.emit('select-image', index);
    }
    return {
      MINIO_URL,
      changeSelectedImage,
    };
  },
});
</script>
