<template>
  <a-modal :visible="visible" :footer="null">
    <a-form
      :model="selectedUbicationCopy"
      :rules="rules"
      @finish="handleFinish"
    >
      <a-form-item class="mt-4" name="ubication" :colon="false">
        <template #label>
          <span style="font-weight: 500">Ubicación</span>
        </template>
        <a-input
          v-model:value="selectedUbicationCopy.ubication"
          :placeholder="'Escriba la ubicación'"
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
import { Ubication as UbicationModel } from '@/graphql/modules/ubication/model';
import { Ubication } from '@/models/Ubication';
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
    ubication: {
      type: Object,
    },
  },
  emits: ['close-modal'],
  setup(props, context) {
    const selectedUbicationCopy: Ref<Ubication> = ref(new Ubication());
    watch(
      () => props.ubication,
      (newValue) => {
        selectedUbicationCopy.value.id = newValue.id;
        selectedUbicationCopy.value.ubication = newValue.ubication;
      }
    );
    const { rules } = UseUbicationRules();
    const handleFinish = async () => {
      store.layout.isLoading = true;
      store.layout.loadingTip = 'Editando ubicación';
      await UbicationModel.editUbication(selectedUbicationCopy.value);
      const { data } = await UbicationModel.getAllUbications();
      store.ubications = data.getAllUbications;
      store.layout.isLoading = false;
      store.layout.loadingTip = '';
      ShowMessage('success', 'edited', 'Ubicación');
      closeModal();
    };
    const closeModal = () => {
      context.emit('close-modal');
    };
    return {
      selectedUbicationCopy,
      rules,
      handleFinish,
      closeModal,
    };
  },
});
</script>
