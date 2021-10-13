<template>
  <a-modal
    title="Editar diccionario"
    :visible="visible"
    :footer="null"
    @cancel="closeModal"
  >
    <a-form
      :rules="rules"
      :model="selectedDictionaryInfoCopy"
      @finish="handleFinish"
    >
      <a-form-item has-feedback name="name" :colon="false">
        <template #label>
          <span style="font-weight: 500">Nombre</span>
        </template>
        <a-input
          v-model:value="selectedDictionaryInfoCopy.name"
          :placeholder="'Escriba el nombre'"
        ></a-input>
      </a-form-item>
      <a-form-item has-feedback name="siglas" :colon="false">
        <template #label>
          <span style="font-weight: 500">Siglas</span>
        </template>
        <a-input
          v-model:value="selectedDictionaryInfoCopy.siglas"
          :placeholder="'Escriba las siglas'"
        ></a-input>
      </a-form-item>
      <a-form-item has-feedback name="annoOfPublication" :colon="false">
        <template #label>
          <span style="font-weight: 500">Año de publicación</span>
        </template>
        <a-input-number
          v-model:value="selectedDictionaryInfoCopy.annoOfPublication"
        ></a-input-number>
      </a-form-item>
      <a-form-item has-feedback name="reference" :colon="false">
        <template #label>
          <span style="font-weight: 500">Referencia</span>
        </template>
        <a-textarea
          v-model:value="selectedDictionaryInfoCopy.reference"
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
          :value="selectedDictionaryInfoCopy.author"
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
          :submit-label="'Guardar'"
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
import { defineComponent, ref, Ref, watch } from 'vue';
import { DictionaryInfo as DictionaryInfoModel } from '@/graphql/modules/dictionaryInfo/model';
import { DictionaryInfoToEdit } from '@/models/DictionaryInfo';
import NewAuthorModal from '../author/NewAuthorModal.vue';
import FormFooter from '@/components/shared/FormFooter.vue';
import TooltipIcon from '@/components/shared/TooltipIcon.vue';
import Select from '@/components/shared/Select.vue';
import UseNewAuthorModal from '@/components/pages/author/UseNewAuthorModal';
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
    selectedDictionaryInfo: {
      type: Object,
    },
  },
  emits: ['close-modal'],
  setup(props, context) {
    const closeModal = () => {
      context.emit('close-modal');
    };
    const selectedDictionaryInfoCopy: Ref<DictionaryInfoToEdit> = ref(
      new DictionaryInfoToEdit()
    );
    const handleFinish = async () => {
      const { data } = await DictionaryInfoModel.editDictionaryInfo(
        selectedDictionaryInfoCopy.value
      );
      const editedDictionaryInfo = data.editDictionaryInfo;
      let found = false;
      for (let i = 0; i < store.dictionariesInfo.length && !found; i++) {
        const di = store.dictionariesInfo[i];
        if (di.id.toString() === editedDictionaryInfo.id.toString()) {
          store.dictionariesInfo[i] = editedDictionaryInfo;
          found = true;
        }
      }
      ShowMessage('success', 'edited', 'Diccionario');
      closeModal();
    };
    const { rules } = UseDictionaryInfoRules();
    watch(
      () => props.selectedDictionaryInfo,
      (newValue) => {
        console.log('newValue', newValue);
        selectedDictionaryInfoCopy.value.id = newValue.id;
        selectedDictionaryInfoCopy.value.name = newValue.name;
        selectedDictionaryInfoCopy.value.siglas = newValue.siglas;
        selectedDictionaryInfoCopy.value.reference = newValue.reference;
        selectedDictionaryInfoCopy.value.annoOfPublication =
          newValue.annoOfPublication;
        selectedDictionaryInfoCopy.value.author = [];
        newValue.author.forEach((a) => {
          selectedDictionaryInfoCopy.value.author.push(a.id);
        });
        console.log('selectedDictionaryInfoCopy', selectedDictionaryInfoCopy);
      }
    );
    const handleSelectChange = (ids) => {
      selectedDictionaryInfoCopy.value.author = ids;
    };
    const {
      showNewAuthorModal,
      showNewAuthorModalMethod,
      closeNewAuthorModalMethod,
    } = UseNewAuthorModal();
    return {
      rules,
      handleFinish,
      selectedDictionaryInfoCopy,
      handleSelectChange,
      closeModal,
      showNewAuthorModal,
      showNewAuthorModalMethod,
      closeNewAuthorModalMethod,
    };
  },
});
</script>
