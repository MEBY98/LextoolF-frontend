<template>
  <PlusSquareFilled
    :style="{
      fontSize: '24px',
      color: '#08c',
      'margin-bottom': '10px',
    }"
    @click="showAddDescriptorModal = true"
  />
  <span style="font-weight: 500; margin-left: 8px; margin-right: 8px">
    Descriptor
  </span>
  <add-descriptor-modal
    :visible="showAddDescriptorModal"
    :observation="observation"
    :descriptors-types="descriptorsTypes"
    :tab="tab"
    @add-descriptor="closeAddDescriptorModalMethod"
    @close-modal="closeAddDescriptorModalMethod"
  ></add-descriptor-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { PlusSquareFilled } from '@ant-design/icons-vue';
import AddDescriptorModal from './AddDescriptorModal.vue';

export default defineComponent({
  components: {
    PlusSquareFilled,
    'add-descriptor-modal': AddDescriptorModal,
  },
  props: {
    observation: {
      type: String,
      default: () => {
        return null;
      },
    },
    descriptorsTypes: {
      type: [Object],
    },
    tab: {
      type: Number,
    },
  },
  setup() {
    const showAddDescriptorModal = ref(false);
    const showAddDescriptorModalMethod = () => {
      showAddDescriptorModal.value = true;
    };
    const closeAddDescriptorModalMethod = () => {
      showAddDescriptorModal.value = false;
    };
    const addDescriptor = (descriptor) => {
      console.log(descriptor);
    };
    return {
      showAddDescriptorModal,
      showAddDescriptorModalMethod,
      closeAddDescriptorModalMethod,
      addDescriptor,
    };
  },
});
</script>
