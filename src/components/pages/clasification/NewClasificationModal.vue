<template>
  <a-modal :visible="visible" :footer="null">
    <a-form :model="newClasification" :rules="rules" @finish="handleFinish">
      <a-form-item class="mt-4" name="clasification" :colon="false">
        <template #label>
          <span style="font-weight: 500">Clasificación</span>
        </template>
        <a-input
          v-model:value="newClasification.clasification"
          :placeholder="'Escriba la clasificación'"
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
import { defineComponent, ref, Ref } from 'vue';
import { Clasification as ClasificationModel } from '@/graphql/modules/clasification/model';
import { NewClasification } from '@/models/Clasification';
import FormFooter from '@/components/shared/FormFooter.vue';
import UseClasificationRules from './UseClasificationRules';
import { store } from '@/store/store';
import ShowMessage from '@/utils/Message/Message';
export default defineComponent({
  components: {
    'form-footer': FormFooter,
  },
  props: {
    visible: {
      type: Boolean,
    },
  },
  emits: ['close-modal'],
  setup(props, context) {
    const newClasification: Ref<NewClasification> = ref(new NewClasification());
    const { rules } = UseClasificationRules();
    const handleFinish = async () => {
      const { data } = await ClasificationModel.createClasification(
        newClasification.value
      );
      store.clasifications.push(data.createClasification);
      ShowMessage('success', 'created', 'Clasificación');
      closeModal();
    };
    const closeModal = () => {
      context.emit('close-modal');
    };
    return {
      newClasification,
      rules,
      handleFinish,
      closeModal,
    };
  },
});
</script>
