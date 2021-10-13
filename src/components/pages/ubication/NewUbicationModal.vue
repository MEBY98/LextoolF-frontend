<template>
  <a-modal :visible="visible" :footer="null">
    <a-form :model="newUbication" :rules="rules" @finish="handleFinish">
      <a-form-item class="mt-4" name="ubication" :colon="false">
        <template #label>
          <span style="font-weight: 500">Ubicación</span>
        </template>
        <a-input
          v-model:value="newUbication.ubication"
          :placeholder="'Escriba la ubicación'"
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
import { Ubication as UbicationModel } from '@/graphql/modules/ubication/model';
import { NewUbication } from '@/models/Ubication';
import FormFooter from '@/components/shared/FormFooter.vue';
import UseUbicationRules from './UseUbicationsRules';
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
  },
  emits: ['close-modal'],
  setup(props, context) {
    const newUbication: Ref<NewUbication> = ref(new NewUbication());
    const { rules } = UseUbicationRules();
    const handleFinish = async () => {
      const { data } = await UbicationModel.createUbication(newUbication.value);
      store.ubications.push(data.createUbication);
      ShowMessage('success', 'created', 'Ubicacion');
      closeModal();
    };
    const closeModal = () => {
      context.emit('close-modal');
    };
    return {
      newUbication,
      rules,
      handleFinish,
      closeModal,
    };
  },
});
</script>
