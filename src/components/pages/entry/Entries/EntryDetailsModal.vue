<template>
  <a-modal :visible="visible" :footer="null" width="700px" @cancel="closeModal">
    <carousel-images
      :images="images"
      :show-delete-icon="false"
      :show-add-image="false"
    ></carousel-images>
    <a-divider></a-divider>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import CarouselImages from '../CarouselImages/CarouselImages.vue';

export default defineComponent({
  components: {
    'carousel-images': CarouselImages,
  },
  props: {
    entry: {
      type: Object,
      default: () => null,
    },
    visible: {
      type: Boolean,
    },
  },
  emits: ['close-modal'],
  setup(props, context) {
    const images = ref([]);
    watch(
      () => props.entry,
      (newValue) => {
        console.log('newValue', newValue);
        images.value = [];
        newValue.context.forEach((c) => {
          images.value.push({ file: '', base64: '', context: c });
        });
      }
    );
    const closeModal = () => {
      context.emit('close-modal');
    };
    return {
      closeModal,
      images,
    };
  },
});
</script>
