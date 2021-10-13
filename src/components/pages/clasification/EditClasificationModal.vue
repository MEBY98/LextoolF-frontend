<template>
  <a-modal :visible="visible" :footer="null">
    <a-form
      :model="selectedClasificationCopy"
      :rules="rules"
      @finish="handleFinish"
    >
      <a-form-item class="mt-4" name="clasification" :colon="false">
        <template #label>
          <span style="font-weight: 500">Clasificación</span>
        </template>
        <a-input
          v-model:value="selectedClasificationCopy.clasification"
          :placeholder="'Escriba la clasificación'"
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
import { defineComponent, ref, Ref, watch } from 'vue';
import { Clasification as ClasificationModel } from '@/graphql/modules/clasification/model';
import { Clasification } from '@/models/Clasification';
import FormFooter from '@/components/shared/FormFooter.vue';
import UseClasificationRules from './UseClasificationRules';
import ShowMessage from '@/utils/Message/Message';
import { store } from '@/store/store';
export default defineComponent({
  components: {
    'form-footer': FormFooter,
  },
  props: {
    visible: {
      type: Boolean,
    },
    clasification: {
      type: Object,
    },
  },
  emits: ['close-modal'],
  setup(props, context) {
    const selectedClasificationCopy: Ref<Clasification> = ref(
      new Clasification()
    );
    watch(
      () => props.clasification,
      (newValue) => {
        selectedClasificationCopy.value.id = newValue.id;
        selectedClasificationCopy.value.clasification = newValue.clasification;
      }
    );
    const { rules } = UseClasificationRules();
    const handleFinish = async () => {
      store.layout.isLoading = true;
      store.layout.loadingTip = 'Editando clasificación';
      await ClasificationModel.editClasification(
        selectedClasificationCopy.value
      );
      const { data } = await ClasificationModel.getAllClasifications();
      store.clasifications = data.getAllClasifications;
      store.layout.isLoading = false;
      store.layout.loadingTip = '';
      ShowMessage('success', 'edited', 'Clasificación');
      closeModal();
    };
    const closeModal = () => {
      context.emit('close-modal');
    };
    return {
      selectedClasificationCopy,
      rules,
      handleFinish,
      closeModal,
    };
  },
});
</script>
