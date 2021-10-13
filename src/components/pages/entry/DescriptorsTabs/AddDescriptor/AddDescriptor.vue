<template>
  <tooltip-icon
    :icon="'PlusSquareFilled'"
    :text="'Descriptor'"
    :title="'Crear descriptor'"
    @click="showAddDescriptorModalMethod"
  ></tooltip-icon>
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
import { defineComponent } from 'vue';
import AddDescriptorModal from './AddDescriptorModal.vue';
import TooltipIcon from '@/components/shared/TooltipIcon.vue';
import UseAddDescriptorModal from './UseAddDescriptorModal';

export default defineComponent({
  components: {
    'add-descriptor-modal': AddDescriptorModal,
    'tooltip-icon': TooltipIcon,
  },
  props: {
    observation: {
      type: String,
      default: () => {
        return null;
      },
    },
    descriptorsTypes: {
      type: Array,
    },
    tab: {
      type: Number,
    },
  },
  setup() {
    const {
      showAddDescriptorModal,
      showAddDescriptorModalMethod,
      closeAddDescriptorModalMethod,
    } = UseAddDescriptorModal();
    return {
      showAddDescriptorModal,
      showAddDescriptorModalMethod,
      closeAddDescriptorModalMethod,
    };
  },
});
</script>
