<template>
  <a-modal :visible="visible" :footer="null" @cancel="closeModal">
    <span style="font-weigth: 700">Pestaña: {{ tab }}</span>
    <a-divider />
    <span v-if="observation !== null" style="font-weigth: 700">
      Observación: {{ observation }}
    </span>
    <a-divider v-if="observation !== null" />
    <span v-if="descriptorType !== undefined" style="font-weigth: 700">
      Tipo de descriptor: {{ descriptorType.name }}
    </span>
    <a-divider v-if="descriptorType !== undefined" />
    <a-form :model="newDescriptor" :rules="rules" @finish="handleFinish">
      <a-form-item name="description" :colon="false">
        <a-input
          v-model:value="newDescriptor.description"
          :placeholder="'Escriba la descripción'"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <form-footer
          :cancel-label="'Cancelar'"
          :submit-icon="'PlusOutlined'"
          :submit-label="'Crear'"
          @click-cancel="closeModal"
        ></form-footer>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { DescriptorType as DescriptorTypeModel } from '@/graphql/modules/DescriptorsTypes/model';
import { NewDescriptor } from '@/models/Descriptor';
import UseDescriptorRules from '../entry/DescriptorsTabs/AddDescriptor/UseDescriptorRules';
import UseUpdateStoreDescriptors from '../entry/DescriptorsTabs/AddDescriptor/UseUpdateStoreDescriptors';
import FormFooter from '@/components/shared/FormFooter.vue';
import ShowMessage from '@/utils/Message/Message';
import { store } from '@/store/store';

export default defineComponent({
  components: {
    'form-footer': FormFooter,
  },
  props: {
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
      type: Object,
    },
    tab: {
      type: String,
    },
  },
  emits: ['close-modal'],
  setup(props, context) {
    const newDescriptor: Ref<NewDescriptor> = ref({
      description: '',
    });
    const { rules } = UseDescriptorRules();
    const handleFinish = async () => {
      console.log('newDescriptor', newDescriptor);
      store.layout.isLoading = true;
      store.layout.loadingTip = 'Actualizando descriptores';
      await DescriptorTypeModel.createDescriptorByDescriptorType(
        props.descriptorType.id,
        newDescriptor.value
      );
      const { updateStore } = UseUpdateStoreDescriptors(props.tab);
      updateStore();
      store.layout.isLoading = false;
      store.layout.loadingTip = '';
      ShowMessage('success', 'created', 'Descriptor');
      closeModal();
    };
    const closeModal = () => {
      context.emit('close-modal');
    };
    return {
      newDescriptor,
      rules,
      handleFinish,
      closeModal,
    };
  },
});
</script>
