<template>
  <a-modal
    title="Nuevo autor"
    :visible="visible"
    :footer="null"
    @cancel="closeModal"
  >
    <a-form :model="newAuthor" :rules="rules" @finish="handleFinish">
      <a-form-item has-feedback name="name" :colon="false">
        <template #label>
          <span style="font-weight: 500">Nombre</span>
        </template>
        <a-input
          v-model:value="newAuthor.name"
          :placeholder="'Escriba el nombre'"
        ></a-input>
      </a-form-item>
      <a-form-item has-feedback name="siglas" :colon="false">
        <template #label>
          <span style="font-weight: 500">Siglas</span>
        </template>
        <a-input
          v-model:value="newAuthor.siglas"
          :placeholder="'Escriba las siglas'"
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
import { Author as AuthorModel } from '@/graphql/modules/author/model';
import { NewAuthor } from '@/models/Author';
import FormFooter from '@/components/shared/FormFooter.vue';
import UseAuthorRules from './UseAuthorRules';
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
    const closeModal = () => {
      context.emit('close-modal');
    };
    const newAuthor: Ref<NewAuthor> = ref({
      name: '',
      siglas: '',
    });
    const handleFinish = async () => {
      const { data } = await AuthorModel.createAuthor(newAuthor.value);
      store.authors.push(data.createAuthor);
      ShowMessage('success', 'created', 'Autor');
      closeModal();
    };
    const { rules } = UseAuthorRules();

    return {
      closeModal,
      rules,
      newAuthor,
      handleFinish,
    };
  },
});
</script>
