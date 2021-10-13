<template>
  <div>
    <h4>Crear estudio fraseológico</h4>
    <br />
    <a-form :model="newStudy" :rules="rules" @finish="handleFinish">
      <a-form-item has-feedback name="name" :colon="false">
        <template #label>
          <span style="font-weight: 500">Nombre</span>
        </template>
        <a-input
          v-model:value="newStudy.name"
          :placeholder="'Escriba el nombre del estudio'"
        ></a-input>
      </a-form-item>
      <div class="d-flex">
        <span class="mt-1 ml-3" style="font-weight: 500">Periodo</span>
        <a-form-item
          has-feedback
          name="initYear"
          class="d-flex ml-4"
          :colon="false"
        >
          <template #label>
            <span style="font-weight: 500">Inicio</span>
          </template>
          <a-input-number v-model:value="newStudy.initYear"></a-input-number>
        </a-form-item>
        <a-form-item
          has-feedback
          name="finalYear"
          class="d-flex ml-4"
          :colon="false"
        >
          <template #label>
            <span style="font-weight: 500">Final</span>
          </template>
          <a-input-number v-model:value="newStudy.finalYear"></a-input-number>
        </a-form-item>
      </div>

      <a-form-item name="dictionaries">
        <a-table
          :data-source="dictionariesInfo"
          :columns="columns"
          :row-key="(record) => record.id"
          bordered
        >
          <template #title>
            <tooltip-icon
              title="Agregar diccionario al estudio"
              icon="PlusSquareFilled"
              :text="'Diccionario'"
              @click="showNewDictionaryModalMethod"
            ></tooltip-icon>
          </template>
          <template #operation="{ index }">
            <tooltip-icon
              title="Detalles del diccionario"
              icon="EyeFilled"
              :style-icon="styleIcon"
              @click="showDictionaryDetailsModalMethod(index)"
            ></tooltip-icon>
            <tooltip-icon
              title="Editar diccionario"
              icon="EditFilled"
              :style-icon="styleIcon"
              @click="showEditDictionaryModalMethod(index)"
            ></tooltip-icon>
            <a-popconfirm
              title="Seguro de Eliminar?"
              @confirm="deleteDictionary(index)"
            >
              <tooltip-icon
                title="Editar diccionario"
                icon="DeleteFilled"
                :style-icon="styleDeleteIcon"
              ></tooltip-icon>
            </a-popconfirm>
          </template>
        </a-table>
      </a-form-item>
      <a-form-item>
        <form-footer
          :cancel-label="'Cancelar'"
          :submit-icon="'PlusOutlined'"
          :submit-label="'Crear'"
          @click-cancel="goToStudies"
        ></form-footer>
      </a-form-item>
    </a-form>
    <new-dictionary-modal
      :visible="showNewDictionaryModal"
      :init-year="newStudy.initYear"
      :final-year="newStudy.finalYear"
      @close-modal="closeNewDictionaryModalMethod"
      @add-dictionary="addDictionary"
    ></new-dictionary-modal>
    <dictionary-details-modal
      :visible="showDictionaryDetailsModal"
      :selected-dictionary="selectedDictionary"
      :selected-dictionary-info-index="selectedDictionaryInfoIndex"
      @close-modal="closeDictionaryDetailsModalMethod"
    ></dictionary-details-modal>
    <edit-dictionary-modal
      :visible="showEditDictionaryModal"
      :selected-dictionary="selectedDictionary"
      :selected-dictionary-info-index="selectedDictionaryInfoIndex"
      :init-year="newStudy.initYear"
      :final-year="newStudy.finalYear"
      @edit-dictionary="editDictionary"
      @close-modal="closeEditDictionaryModalMethod"
    ></edit-dictionary-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { Study as StudyModel } from '@/graphql/modules/study/model';
import NewDictionaryModal from './../Dictionary/NewDictionaryModal.vue';
import EditDictionaryModal from './../Dictionary/EditDictionaryModal.vue';
import DictionaryDetailsModal from './../Dictionary/DictionaryDetailsModal.vue';
import TooltipIcon from '@/components/shared/TooltipIcon.vue';
import FormItemInputText from '@/components/shared/FormItemInputText.vue';
import FormFooter from '@/components/shared/FormFooter.vue';
import UseNewDictionaryModal from '@/components/pages/study/Dictionary/UseNewDictionaryModal';
import UseEditDictionaryModal from '@/components/pages/study/Dictionary/UseEditDictionaryModal';
import UseDictionaryDetailsModal from '@/components/pages/study/Dictionary/UseDictionaryDetailsModal';
import UseSelectedDictionary from '@/components/pages/study/Dictionary/UseSelectedDictionary';
import UseStudyRules from './UseStudyRules';
import UseRoutes from '@/router/UseRoutes';
import { store } from '@/store/store';
import { NewFraseologicStudy } from '@/models/FraseologicStudy';
import { DictionaryInfo } from '@/models/DictionaryInfo';
import UseColumns from '../../dictionaryInfo/UseColumns';
import ShowMessage from '@/utils/Message/Message';
import { validateDictionaryYear } from '../Dictionary/UseDictionaryRules';

export default defineComponent({
  components: {
    'tooltip-icon': TooltipIcon,
    'new-dictionary-modal': NewDictionaryModal,
    'edit-dictionary-modal': EditDictionaryModal,
    'dictionary-details-modal': DictionaryDetailsModal,
    'form-item-input-text': FormItemInputText,
    'form-footer': FormFooter,
  },
  setup() {
    const styleIcon = ref({ fontSize: '25px', color: '#08c', margin: '5px' });
    const styleDeleteIcon = ref({
      fontSize: '25px',
      color: 'red',
      margin: '5px',
    });
    const newStudy: Ref<NewFraseologicStudy> = ref({
      name: '',
      initYear: 1,
      finalYear: 2021,
      state: 'Ejecución',
      dictionaries: [],
    });
    const dictionariesInfo: Ref<DictionaryInfo[]> = ref([]);
    const dictionariesInfosIndexs: Ref<number[]> = ref([]);
    const handleFinish = async () => {
      let outOfPeriod = false;
      for (
        let index = 0;
        index < dictionariesInfo.value.length && !outOfPeriod;
        index++
      ) {
        const dInfo = dictionariesInfo.value[index];
        outOfPeriod = validateDictionaryYear(
          dInfo.annoOfPublication,
          newStudy.value.initYear,
          newStudy.value.finalYear
        );
      }
      if (!outOfPeriod) {
        store.layout.isLoading = true;
        store.layout.loadingTip = 'Creando estudio';
        await StudyModel.createStudy(newStudy.value);
        store.layout.isLoading = false;
        store.layout.loadingTip = '';
        ShowMessage('success', 'created', 'Estudio');
        goToStudies();
      } else {
        ShowMessage(
          'error',
          'created',
          'Estudio',
          'Diccionario(s) fuera del periodo establecido'
        );
      }
    };
    const { columns } = UseColumns();
    const { goToStudies } = UseRoutes();
    const { rules } = UseStudyRules(newStudy);
    const {
      selectedDictionary,
      selectedDictionaryInfoIndex,
      selectedRow,
    } = UseSelectedDictionary();
    const {
      showEditDictionaryModal,
      showEditDictionaryModalMethod,
      closeEditDictionaryModalMethod,
    } = UseEditDictionaryModal(
      newStudy,
      dictionariesInfosIndexs,
      selectedDictionary,
      selectedDictionaryInfoIndex,
      selectedRow
    );
    const {
      showDictionaryDetailsModal,
      showDictionaryDetailsModalMethod,
      closeDictionaryDetailsModalMethod,
    } = UseDictionaryDetailsModal(
      newStudy,
      dictionariesInfosIndexs,
      selectedDictionary,
      selectedDictionaryInfoIndex,
      selectedRow
    );
    const {
      showNewDictionaryModal,
      showNewDictionaryModalMethod,
      closeNewDictionaryModalMethod,
    } = UseNewDictionaryModal();
    const addDictionary = (dictionary) => {
      dictionariesInfosIndexs.value.push(dictionary.index);
      dictionariesInfo.value.push(store.dictionariesInfo[dictionary.index]);
      newStudy.value.dictionaries.push(dictionary.dictionary);
      ShowMessage('success', 'created', 'Diccionario');
      closeNewDictionaryModalMethod();
    };
    const deleteDictionary = (index) => {
      newStudy.value.dictionaries.splice(index, 1);
      dictionariesInfosIndexs.value.splice(index, 1);
      dictionariesInfo.value.splice(index, 1);
      ShowMessage('error', 'deleted', 'Diccionario');
    };
    const editDictionary = (editedDictionary) => {
      dictionariesInfo.value[selectedRow.value] =
        store.dictionariesInfo[editedDictionary.index];
      newStudy.value.dictionaries[selectedRow.value] =
        editedDictionary.dictionary;
      dictionariesInfosIndexs.value[selectedRow.value] = editedDictionary.index;
      ShowMessage('success', 'edited', 'Diccionario');
      closeEditDictionaryModalMethod();
    };

    return {
      showNewDictionaryModal,
      showNewDictionaryModalMethod,
      closeNewDictionaryModalMethod,
      showDictionaryDetailsModal,
      showDictionaryDetailsModalMethod,
      closeDictionaryDetailsModalMethod,
      showEditDictionaryModal,
      showEditDictionaryModalMethod,
      closeEditDictionaryModalMethod,
      addDictionary,
      deleteDictionary,
      selectedDictionary,
      selectedDictionaryInfoIndex,
      selectedRow,
      dictionariesInfosIndexs,
      dictionariesInfo,
      newStudy,
      handleFinish,
      editDictionary,
      goToStudies,
      styleIcon,
      styleDeleteIcon,
      columns,
      rules,
    };
  },
});
</script>
