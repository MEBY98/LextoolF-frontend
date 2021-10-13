<template>
  <a-modal
    title="Editar diccionario"
    :visible="visible"
    width="550px"
    :footer="null"
    @cancel="closeModal"
  >
    <a-form
      :rules="rules"
      :model="selectedDictionaryCopy"
      @finish="editDictionary"
    >
      <a-form-item name="dictionaryInfo" :colon="false">
        <template #label>
          <span style="font-weight: 500">Seleccione el diccionario</span>
        </template>
        <general-select
          :key-value="'siglas'"
          :value="selectedDictionaryInfoIndexCopy"
          :display-attribute="'siglas'"
          :placeholder="'Seleccione'"
          :elements="$store.dictionariesInfo"
          :index-value="true"
          @change="handleSelectChange"
        ></general-select>
        <tooltip-icon
          title="Agregar diccionario al sistema"
          icon="PlusSquareFilled"
          @click="showNewDictionaryInfoModalMethod"
        ></tooltip-icon>
      </a-form-item>
      <a-form-item name="letters" :colon="false">
        <template #label>
          <span style="font-weight: 500">Letras</span>
        </template>
        <transfer-letters
          :target-key="selectedDictionaryCopy.letters"
          @change="handleChangeLettersTransfer"
        ></transfer-letters>
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
  <new-dictionary-info-modal
    :visible="showNewDictionaryInfoModal"
    @close-modal="closeNewDictionaryInfoModalMethod"
  ></new-dictionary-info-modal>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import _ from 'lodash';
import NewDictionaryInfoModal from './../../dictionaryInfo/NewDictionaryInfoModal.vue';
import TooltipIcon from '@/components/shared/TooltipIcon.vue';
import Select from '@/components/shared/Select.vue';
import FormFooter from '@/components/shared/FormFooter.vue';
import TransferLetters from './TransferLetters.vue';
import UseDictionaryRules from './UseDictionaryRules';
import UseNewDictionaryInfoModal from '@/components/pages/dictionaryInfo/UseNewDictionaryInfoModal';
import { store } from '@/store/store';

export default defineComponent({
  components: {
    'tooltip-icon': TooltipIcon,
    'general-select': Select,
    'new-dictionary-info-modal': NewDictionaryInfoModal,
    'form-footer': FormFooter,
    'transfer-letters': TransferLetters,
  },
  props: {
    visible: {
      type: Boolean,
    },
    selectedDictionary: {
      type: Object,
    },
    selectedDictionaryInfoIndex: {
      type: Number,
    },
    initYear: {
      type: Number,
    },
    finalYear: {
      type: Number,
    },
  },
  emits: ['close-modal', 'edit-dictionary'],
  setup(props, context) {
    const initYear = ref();
    const finalYear = ref();
    const selectedDictionaryCopy = ref();
    const selectedDictionaryInfoIndexCopy = ref();
    const rules = ref();
    watch(
      () => [props.initYear, props.finalYear],
      (newValue) => {
        initYear.value = newValue[0];
        finalYear.value = newValue[1];
        rules.value = UseDictionaryRules(
          initYear.value as number,
          finalYear.value as number
        ).rules.value;
      }
    );
    watch(
      () => [props.selectedDictionary, props.selectedDictionaryInfoIndex],
      (newValue) => {
        selectedDictionaryCopy.value = newValue[0];
        selectedDictionaryInfoIndexCopy.value = newValue[1];
      }
    );
    const handleChangeLettersTransfer = (targetKeys) => {
      selectedDictionaryCopy.value.letters = targetKeys;
    };
    const handleSelectChange = (index) => {
      selectedDictionaryInfoIndexCopy.value = index;
      selectedDictionaryCopy.value.dictionaryInfo =
        store.dictionariesInfo[index].id;
    };
    const editDictionary = () => {
      const result = {
        dictionary: _.cloneDeep(selectedDictionaryCopy.value),
        index: _.cloneDeep(selectedDictionaryInfoIndexCopy.value),
      };
      context.emit('edit-dictionary', result);
    };

    const closeModal = () => context.emit('close-modal');

    const {
      showNewDictionaryInfoModal,
      showNewDictionaryInfoModalMethod,
      closeNewDictionaryInfoModalMethod,
    } = UseNewDictionaryInfoModal();

    const addDictionaryInfo = () => {
      closeNewDictionaryInfoModalMethod();
    };

    return {
      selectedDictionaryCopy,
      selectedDictionaryInfoIndexCopy,
      rules,
      handleChangeLettersTransfer,
      handleSelectChange,
      editDictionary,
      closeModal,
      showNewDictionaryInfoModal,
      showNewDictionaryInfoModalMethod,
      closeNewDictionaryInfoModalMethod,
      addDictionaryInfo,
    };
  },
});
</script>
