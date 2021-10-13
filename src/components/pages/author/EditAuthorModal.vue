<template>
  <a-modal
    title="Editar autor"
    :visible="visible"
    :footer="null"
    @cancel="closeModal"
  >
    <a-form :model="selectedAuthorCopy" :rules="rules" @finish="handleFinish">
      <a-form-item has-feedback name="name" :colon="false">
        <template #label>
          <span style="font-weight: 500">Nombre</span>
        </template>
        <a-input
          v-model:value="selectedAuthorCopy.name"
          :placeholder="'Escriba el nombre'"
        ></a-input>
      </a-form-item>
      <a-form-item has-feedback name="siglas" :colon="false">
        <template #label>
          <span style="font-weight: 500">Siglas</span>
        </template>
        <a-input
          v-model:value="selectedAuthorCopy.siglas"
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
import { defineComponent, ref, watch } from 'vue';
import { Author as AuthorModel } from '@/graphql/modules/author/model';
import ShowMessage from '@/utils/Message/Message';
import FormFooter from '@/components/shared/FormFooter.vue';
import UseAuthorRules from './UseAuthorRules';
import { store } from '@/store/store';
import { Author } from '@/models/Author';
export default defineComponent({
  components: {
    'form-footer': FormFooter,
  },
  props: {
    visible: {
      type: Boolean,
    },
    selectedAuthor: {
      type: Object,
    },
  },
  emits: ['close-modal'],
  setup(props, context) {
    const closeModal = () => {
      context.emit('close-modal');
    };
    const selectedAuthorCopy = ref(new Author());
    watch(
      () => props.selectedAuthor,
      (newValue) => {
        selectedAuthorCopy.value.id = newValue.id;
        selectedAuthorCopy.value.name = newValue.name;
        selectedAuthorCopy.value.siglas = newValue.siglas;
      }
    );
    const handleFinish = async () => {
      const { data } = await AuthorModel.editAuthor(selectedAuthorCopy.value);
      const editedAuthor = data.editAuthor;
      let found = false;
      for (let i = 0; i < store.authors.length && !found; i++) {
        const a = store.authors[i];
        if (a.id.toString() === editedAuthor.id.toString()) {
          store.authors[i] = editedAuthor;
          found = true;
        }
      }
      ShowMessage('success', 'edited', 'Autor');
      closeModal();
    };
    const { rules } = UseAuthorRules();

    return {
      closeModal,
      rules,
      selectedAuthorCopy,
      handleFinish,
    };
  },
});
</script>
