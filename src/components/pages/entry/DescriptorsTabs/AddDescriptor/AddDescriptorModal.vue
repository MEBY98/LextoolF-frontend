<template>
  <a-modal :visible="visible" :footer="null" @cancel="closeModal">
    <span v-if="observation !== null" style="font-weigth: 700">
      Observación: {{ observation }}
    </span>
    <a-divider v-if="observation !== null" />
    <a-radio-group v-model:value="selectedDescriptorType">
      <div v-for="(d, index) in descriptorsTypes" :key="index" class="d-inline">
        <a-radio v-if="d.inputType !== 'text'" :value="d.id">
          {{ d.name }}
        </a-radio>
      </div>
    </a-radio-group>
    <a-divider />
    <a-form :model="newDescriptor" :rules="rules" @finish="handleFinish">
      <a-form-item name="description" :colon="false">
        <a-input
          v-if="selectedDescriptorType !== ''"
          v-model:value="newDescriptor.description"
          :placeholder="'Escriba la descripción'"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <form-footer
          :cancel-label="'Cancelar'"
          :submit-icon="'PlusOutlined'"
          :submit-label="'Agregar'"
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
import UseDescriptorRules from './UseDescriptorRules';
import UseUpdateStoreDescriptors from './UseUpdateStoreDescriptors';
import FormFooter from '@/components/shared/FormFooter.vue';

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
    descriptorsTypes: {
      type: Array,
    },
    tab: {
      type: Number,
    },
  },
  emits: ['add-descriptor', 'close-modal'],
  setup(props, context) {
    const selectedDescriptorType: Ref<string> = ref('');
    const newDescriptor: Ref<NewDescriptor> = ref({
      description: '',
    });
    const { rules } = UseDescriptorRules();
    const handleFinish = async () => {
      await DescriptorTypeModel.createDescriptorByDescriptorType(
        selectedDescriptorType.value,
        { description: newDescriptor.value.description }
      );
      const { updateStore } = UseUpdateStoreDescriptors(props.tab);
      await updateStore();
      context.emit('add-descriptor');
    };
    const closeModal = () => {
      context.emit('close-modal');
    };
    return {
      selectedDescriptorType,
      newDescriptor,
      rules,
      handleFinish,
      closeModal,
    };
  },
});
</script>
