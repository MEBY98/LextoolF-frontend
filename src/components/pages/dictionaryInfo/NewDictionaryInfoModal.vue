<template>
  <a-modal
    title="Nuevo diccionario"
    :visible="visible"
    :footer="null"
    @cancel="closeModal"
  >
    <a-form :rules="rules" :model="newDictionaryInfo" @finish="handleFinish">
      <a-form-item has-feedback name="name" :colon="false">
        <template #label>
          <span style="font-weight: 500">Nombre</span>
        </template>
        <a-input
          v-model:value="newDictionaryInfo.name"
          :placeholder="'Escriba el nombre'"
        ></a-input>
      </a-form-item>
      <a-form-item has-feedback name="siglas" :colon="false">
        <template #label>
          <span style="font-weight: 500">Siglas</span>
        </template>
        <a-input
          v-model:value="newDictionaryInfo.siglas"
          :placeholder="'Escriba las siglas'"
        ></a-input>
      </a-form-item>
      <a-form-item has-feedback name="annoOfPublication" :colon="false">
        <template #label>
          <span style="font-weight: 500">Año de publicación</span>
        </template>
        <a-input-number
          v-model:value="newDictionaryInfo.annoOfPublication"
        ></a-input-number>
      </a-form-item>
      <a-form-item has-feedback name="reference" :colon="false">
        <template #label>
          <span style="font-weight: 500">Referencia</span>
        </template>
        <a-textarea
          v-model:value="newDictionaryInfo.reference"
          :auto-size="{ minRows: 3, maxRows: 10 }"
          :placeholder="'Escriba la referencia'"
        ></a-textarea>
      </a-form-item>
      <a-form-item has-feedback name="author" :colon="false">
        <template #label>
          <span style="font-weight: 500">Autores</span>
        </template>
        <general-select
          :key-value="'name'"
          :value="newDictionaryInfo.author"
          :display-attribute="'name'"
          :elements="$store.authors"
          :multiple="true"
          :index-value="false"
          :placeholder="'Seleccione el autor(es)'"
          @change="handleSelectChange"
        ></general-select>
        <tooltip-icon
          title="Agregar autor al sistema"
          icon="PlusSquareFilled"
          @click="showNewAuthorModalMethod"
        ></tooltip-icon>
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
  <new-author-modal
    :visible="showNewAuthorModal"
    @close-modal="closeNewAuthorModalMethod"
  ></new-author-modal>
</template>
<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { DictionaryInfo as DictionaryInfoModel } from '@/graphql/modules/dictionaryInfo/model';
import { NewDictionaryInfo } from '@/models/DictionaryInfo';
import NewAuthorModal from '../author/NewAuthorModal.vue';
import FormFooter from '@/components/shared/FormFooter.vue';
import TooltipIcon from '@/components/shared/TooltipIcon.vue';
import Select from '@/components/shared/Select.vue';
import UseAuthorModal from '@/components/pages/author/UseNewAuthorModal';
import UseDictionaryInfoRules from './UseDictionaryInfoRules';
import { store } from '@/store/store';
import ShowMessage from '@/utils/Message/Message';

export default defineComponent({
  components: {
    'general-select': Select,
    'new-author-modal': NewAuthorModal,
    'tooltip-icon': TooltipIcon,
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
    const newDictionaryInfo: Ref<NewDictionaryInfo> = ref({
      siglas: '',
      name: '',
      author: [],
      annoOfPublication: 0,
      reference: '',
    });
    const handleFinish = async () => {
      const { data } = await DictionaryInfoModel.createDictionaryInfo(
        newDictionaryInfo.value
      );
      store.dictionariesInfo.push(data.createDictionaryInfo);
      ShowMessage('success', 'created', 'Diccionario');
      closeModal();
    };
    const { rules } = UseDictionaryInfoRules();
    const handleSelectChange = (ids) => {
      newDictionaryInfo.value.author = ids;
    };
    const {
      showNewAuthorModal,
      showNewAuthorModalMethod,
      closeNewAuthorModalMethod,
    } = UseAuthorModal();

    return {
      rules,
      handleFinish,
      newDictionaryInfo,
      handleSelectChange,
      closeModal,
      showNewAuthorModal,
      showNewAuthorModalMethod,
      closeNewAuthorModalMethod,
    };
  },
});
</script>
