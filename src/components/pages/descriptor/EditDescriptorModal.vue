<template>
  <a-modal :visible="visible" :footer="null" @cancel="closeModal">
    <span style="font-weigth: 700">Pestaña: {{ tab }}</span>
    <a-divider />
    <span v-if="observation !== null" style="font-weigth: 700">
      Observación: {{ observation }}
    </span>
    <a-divider v-if="observation !== null" />
    <span v-if="descriptorType !== undefined" style="font-weigth: 700">
      Tipo de descriptor: {{ descriptorType }}
    </span>
    <a-divider v-if="descriptorType !== undefined" />
    <a-form
      :model="selectedDescriptorCopy"
      :rules="rules"
      @finish="handleFinish"
    >
      <a-form-item name="description" :colon="false">
        <a-input
          v-model:value="selectedDescriptorCopy.description"
          :placeholder="'Escriba la descripción'"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <form-footer
          :cancel-label="'Cancelar'"
          :submit-icon="'SaveOutlined'"
          :submit-label="'Guardar'"
          @click-cancel="closeModal"
        ></form-footer>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, Ref, ref, watch } from 'vue';
import { Descriptor as DescriptorModel } from '@/graphql/modules/descriptor/model';
import { Descriptor } from '@/models/Descriptor';
import UseDescriptorRules from '../entry/DescriptorsTabs/AddDescriptor/UseDescriptorRules';
import UseUpdateStoreDescriptors from '../entry/DescriptorsTabs/AddDescriptor/UseUpdateStoreDescriptors';
import FormFooter from '@/components/shared/FormFooter.vue';
import { store } from '@/store/store';
import ShowMessage from '@/utils/Message/Message';

export default defineComponent({
  components: {
    'form-footer': FormFooter,
  },
  props: {
    descriptor: {
      type: Object,
    },
    observation: {
      type: String,
      default: () => {
        return null;
      },
    },
    visible: {
      type: Boolean,
    },
    descriptorType: {
      type: String,
    },
    tab: {
      type: String,
    },
  },
  emits: ['close-modal'],
  setup(props, context) {
    const selectedDescriptorCopy: Ref<Descriptor> = ref({
      id: '',
      description: '',
    });
    watch(
      () => props.descriptor,
      (newValue) => {
        selectedDescriptorCopy.value.id = newValue.id;
        selectedDescriptorCopy.value.description = newValue.description;
      }
    );
    const { rules } = UseDescriptorRules();
    const handleFinish = async () => {
      console.log('selectedDescriptorCopy', selectedDescriptorCopy);
      store.layout.isLoading = true;
      store.layout.loadingTip = 'Actualizando descriptores';
      await DescriptorModel.editDescriptor(selectedDescriptorCopy.value);
      const { updateStore } = UseUpdateStoreDescriptors(props.tab);
      updateStore();
      store.layout.isLoading = false;
      store.layout.loadingTip = '';
      ShowMessage('success', 'edited', 'Descriptor');
      closeModal();
    };
    const closeModal = () => {
      context.emit('close-modal');
    };
    return {
      selectedDescriptorCopy,
      rules,
      handleFinish,
      closeModal,
    };
  },
});
</script>
