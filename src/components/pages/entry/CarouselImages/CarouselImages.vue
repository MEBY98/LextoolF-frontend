<template>
  <div>
    <div class="mt-4 mb-4">
      <div
        class="d-flex align-items-center justify-content-center"
        style="position: relative; height: 300px; overflow: auto"
      >
        <span
          class="opacity"
          style="position: absolute; margin-right: 80%; z-index: 1"
        >
          <show-icon
            :icon="'LeftCircleOutlined'"
            :style-icon="{
              width: '40px',
              height: '40px',
              fontSize: '40px',
              color: 'gray',
              opacity: 0.3,
            }"
            @click="goPreviewImage"
          ></show-icon>
        </span>
        <transition name="no-mode-fade">
          <div style="position: absolute">
            <!-- <div v-if="activeImage === images.length"><h1>Pegar</h1></div>
            <div v-else-if="activeImage === index">
              <a-image
                v-if="images[index].context !== ''"
                class="img"
                :src="MINIO_URL + '/' + images[index].context"
                alt="Artículo lexicográfico"
                :style="{
                  border: '2px solid #fff',
                  borderRadius: '10px',
                  boxShadow: '5px 5px 5px #ccc',
                }"
              ></a-image>
              <a-image
                v-else
                :src="images[index].base64"
                alt="Artículo lexicográfico"
                :style="{
                  border: '2px solid #fff',
                  borderRadius: '10px',
                  boxShadow: '5px 5px 5px #ccc',
                }"
              ></a-image>
            </div> -->
            <a-image
              :src="imageUrl"
              alt="Artículo lexicográfico"
              :style="{
                border: '2px solid #fff',
                borderRadius: '10px',
                boxShadow: '5px 5px 5px #ccc',
              }"
            ></a-image>
          </div>
        </transition>
        <span class="opacity" style="position: absolute; margin-left: 80%">
          <show-icon
            :icon="'RightCircleOutlined'"
            :style-icon="{
              width: '40px',
              height: '40px',
              fontSize: '40px',
              color: 'gray',
              opacity: 0.3,
            }"
            @click="goNextImage"
          ></show-icon>
        </span>
      </div>
      <div style="text-align: center; margin-top: 10px">
        <a-popconfirm
          v-if="validateDeteleIcon"
          title="¿Seguro(a) que desea eliminar la imagen?"
          @confirm="deleteImage"
        >
          <div class="opacity">
            <show-icon
              :icon="'DeleteOutlined'"
              :style-icon="{
                color: 'red',
                fontSize: '24px',
              }"
            ></show-icon>
          </div>
        </a-popconfirm>
      </div>
      <div style="text-align: center; margin-top: 5px">
        <show-icon
          v-for="index in dotsLength"
          :key="index"
          :icon="'LineOutlined'"
          :style-icon="{
            fontSize: activeImage + 1 === index ? '30px' : '20px',
            color: activeImage + 1 === index ? 'gray' : 'black',
          }"
        ></show-icon>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import ShowIcon from '@/components/shared/ShowIcon.vue';
import { MINIO_URL } from '@/utils/minIO';
export default defineComponent({
  components: {
    'show-icon': ShowIcon,
  },
  props: {
    images: {
      type: Array,
    },
    showDeleteIcon: {
      type: Boolean,
    },
    showAddImage: {
      type: Boolean,
    },
  },
  emits: ['delete-image', 'click-paste'],
  setup(props, context) {
    const activeImage = ref(0);
    const goPreviewImage = () => {
      if (props.showAddImage) {
        if (activeImage.value === 0) {
          activeImage.value = (props.images as Array<any>).length;
        } else {
          activeImage.value--;
        }
      } else {
        if (activeImage.value === 0) {
          activeImage.value = (props.images as Array<any>).length - 1;
        } else {
          activeImage.value--;
        }
      }
    };
    const goNextImage = () => {
      if (props.showAddImage) {
        if (activeImage.value === (props.images as Array<any>).length) {
          activeImage.value = 0;
        } else {
          activeImage.value++;
        }
      } else {
        if (activeImage.value === (props.images as Array<any>).length - 1) {
          activeImage.value = 0;
        } else {
          activeImage.value++;
        }
      }
    };
    watch(props, (newValue) => {
      if (activeImage.value >= (newValue.images as Array<any>).length) {
        activeImage.value = (newValue.images as Array<any>).length;
      }
      if (activeImage.value < 0) {
        activeImage.value = 0;
      }
    });
    const imageUrl = computed(() => {
      let result = undefined;
      if (props.showAddImage) {
        if (
          (props.images as Array<any>).length === 0 ||
          activeImage.value === (props.images as Array<any>).length
        ) {
          result = 'http://localhost:7000/img/Ctrl + V.jpg';
        } else {
          const context = props.images[activeImage.value].context;
          const base64 = props.images[activeImage.value].base64;
          if (context !== '') result = MINIO_URL + '/' + context;
          else result = base64;
        }
      } else {
        const context = props.images[activeImage.value].context;
        const base64 = props.images[activeImage.value].base64;
        if (context !== '') result = MINIO_URL + '/' + context;
        else result = base64;
      }
      return result;
    });
    const validateDeteleIcon = computed(() => {
      if (props.showDeleteIcon === true) {
        if (
          (props.images as Array<any>).length === 0 ||
          activeImage.value === (props.images as Array<any>).length
        ) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    });
    const dotsLength = computed(() => {
      if (props.showAddImage) return (props.images as Array<any>).length + 1;
      else return (props.images as Array<any>).length;
    });

    const deleteImage = () => {
      context.emit('delete-image', activeImage.value);
    };
    return {
      imageUrl,
      dotsLength,
      validateDeteleIcon,
      MINIO_URL,
      deleteImage,
      goNextImage,
      goPreviewImage,
      activeImage,
    };
  },
});
</script>
<style scoped>
.no-mode-fade-enter-active,
.no-mode-fade-leave-active {
  transition: opacity 0.5s ease;
}

.no-mode-fade-enter-from,
.no-mode-fade-leave-to {
  opacity: 0;
}

.opacity {
  opacity: 0.5;
}
.opacity:hover {
  opacity: 0.8;
}

/* ::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  border: 1px solid;
  padding: 2px 0;
  background-color: #404040;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-border-radius: 10px;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #737272;
  border: 1px solid #000;

  -webkit-border-radius: 10px;
  background: rgba(255, 0, 0, 0.8);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(255, 0, 0, 0.4);
} */
</style>
