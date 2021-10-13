<template>
  <a-modal
    :visible="visible"
    title="Seleccione la ubicación del elemento"
    @cancel="closeModal"
  >
    <a-radio-group
      v-model:value="selectedUbication"
      @change="handleRadioChange"
    >
      <a-radio
        v-for="(u, index) in $store.ubications"
        :key="index"
        :style="radioStyle"
        :value="u"
        :disabled="hasLemma && u.ubication === 'Lema'"
      >
        {{ u.ubication }}
      </a-radio>
    </a-radio-group>
    <template #footer>
      <modal-footer
        :cancel-label="'Cancelar'"
        :submit-icon="'PlusOutlined'"
        :submit-label="'Agregar'"
        @click-submit="addElement"
        @click-cancel="closeModal"
      ></modal-footer>
    </template>
  </a-modal>
</template>
<script lang="ts">
import ModalFooter from '@/components/shared/ModalFooter.vue';
import { Ubication } from '@/models/Ubication';
import { defineComponent, ref, Ref } from 'vue';
export default defineComponent({
  components: {
    'modal-footer': ModalFooter,
  },
  props: {
    visible: {
      type: Boolean,
    },
    hasLemma: {
      type: Boolean,
    },
  },
  emits: ['add-element', 'close-modal'],
  setup(props, context) {
    const handleRadioChange = (event) => {
      console.log('event', event);
      selectedUbication.value = event.target.value;
    };
    const addElement = () => {
      context.emit('add-element', selectedUbication.value);
      selectedUbication.value = new Ubication();
    };
    const closeModal = () => {
      context.emit('close-modal');
      selectedUbication.value = new Ubication();
    };
    const selectedUbication: Ref<Ubication> = ref(new Ubication());
    return {
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
        fontWeight: '500',
      },
      selectedUbication,
      handleRadioChange,
      addElement,
      closeModal,
    };
  },
});
</script>
