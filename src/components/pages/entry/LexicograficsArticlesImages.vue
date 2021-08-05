<template>
  <div
    v-if="images.length > 0"
    class="container overflow-scroll"
    style="height: 400px; width: 600px; background-color: rgba(255, 0, 0, 0.1)"
  >
    <img
      v-for="(i, index) in images"
      :key="index"
      :src="i.base64"
      alt="Articulo Lexicografico"
      :style="index === selectedImageIndex ? selectedImageStyle : {}"
      @click="changeSelectedImage(index)"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

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
    function changeSelectedImage(index) {
      context.emit('select-image', index);
    }
    return {
      changeSelectedImage,
    };
  },
});
</script>
