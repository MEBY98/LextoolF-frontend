<template>
  <a-modal
    title="Agregar diccionario al estudio"
    :visible="visible"
    width="550px"
    :footer="null"
    @cancel="closeModal"
  >
    <a-form :rules="rules" :model="newDictionary" @finish="addDictionary">
      <a-form-item name="dictionaryInfo" :colon="false">
        <template #label>
          <span style="font-weight: 500">Seleccione el diccionario</span>
        </template>
        <general-select
          :key-value="'siglas'"
          :value="dictionaryInfoIndex"
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
          :target-key="newDictionary.letters"
          @change="handleChangeLettersTransfer"
        ></transfer-letters>
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
  <new-dictionary-info-modal
    :visible="showNewDictionaryInfoModal"
    @close-modal="closeNewDictionaryInfoModalMethod"
  ></new-dictionary-info-modal>
</template>
<script lang="ts">
import { defineComponent, Ref, ref, watch } from 'vue';
import _ from 'lodash';
import { NewDictionary } from '@/models/Dictionary';
import NewDictionaryInfoModal from './../../dictionaryInfo/NewDictionaryInfoModal.vue';
import TooltipIcon from '@/components/shared/TooltipIcon.vue';
import Select from '@/components/shared/Select.vue';
import FormFooter from '@/components/shared/FormFooter.vue';
import TransferLetters from './TransferLetters.vue';
import UseNewDictionaryInfoModal from '@/components/pages/dictionaryInfo/UseNewDictionaryInfoModal';
import UseDictionaryRules from './UseDictionaryRules';
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
    initYear: {
      type: Number,
    },
    finalYear: {
      type: Number,
    },
  },
  emits: ['close-modal', 'add-dictionary'],
  setup(props, context) {
    const initYear = ref();
    const finalYear = ref();
    const rules = ref();
    const dictionaryInfoIndex: Ref<number> = ref();
    const newDictionary: Ref<NewDictionary> = ref({
      letters: [],
      dictionaryInfo: '',
      entries: [],
    });
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
    const handleChangeLettersTransfer = (targetKeys) => {
      newDictionary.value.letters = targetKeys;
    };
    const handleSelectChange = (index) => {
      dictionaryInfoIndex.value = index;
      newDictionary.value.dictionaryInfo = store.dictionariesInfo[index].id;
    };
    const addDictionary = () => {
      const result = {
        dictionary: _.cloneDeep(newDictionary.value),
        index: _.cloneDeep(dictionaryInfoIndex.value),
      };
      context.emit('add-dictionary', result);
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
      newDictionary,
      // dictionaryInfo,
      rules,
      handleChangeLettersTransfer,
      handleSelectChange,
      addDictionary,
      closeModal,
      showNewDictionaryInfoModal,
      showNewDictionaryInfoModalMethod,
      closeNewDictionaryInfoModalMethod,
      addDictionaryInfo,
      dictionaryInfoIndex,
    };
  },
});
</script>
