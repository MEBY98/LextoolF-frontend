<template>
  <div>
    <div>
      <div class="d-flex align-items-center justify-center">
        <tooltip-icon
          title="Volver a los estudios"
          icon="RollbackOutlined"
          :style-icon="{
            fontSize: '25px',
            color: '#08c',
            marginBottom: '11px',
            marginRight: '10px',
          }"
          @click="goToStudies"
        ></tooltip-icon>
        <h4>Estudio: {{ $store.study.name }}</h4>
      </div>

      <general-select
        :elements="$store.study.dictionaries"
        :display-attribute="'dictionaryInfo.name'"
        :key-value="'dictionaryInfo.name'"
        :multiple="false"
        :index-value="false"
        :value="$store.dictionary.id"
        :placeholder="'Seleccione el diccionario'"
        class="w-50"
        @change="handleDictionarySelect"
      ></general-select>
      <a-upload
        v-if="$store.dictionary.id"
        :action="uploadAction"
        :before-upload="handleBeforeUpload"
        :show-upload-list="false"
      >
        <tooltip-icon
          title="Subir excel de artículos lexicográficos con elementos extraidos"
          icon="UploadOutlined"
          text="Excel"
        ></tooltip-icon>
      </a-upload>
    </div>
    <a-divider />
    <div v-if="$store.dictionary.id">
      <a-tabs
        v-model:active-key="activeKey"
        type="card"
        @change="handleTabLetterChange"
      >
        <a-tab-pane v-for="l in $store.dictionary.letters" :key="l" :tab="l">
          <a-table
            :data-source="$store.entries"
            :row-key="(record) => record.id"
            :columns="columns"
            size="small"
            bordered
          >
            <template #title>
              <tooltip-icon
                title="Describir artículo lexicográfico"
                icon="PlusOutlined"
                text="Artículo lexicográfico"
                @click="goToNewEntry(activeKey)"
              ></tooltip-icon>
              <tooltip-icon
                title="Gestionar descriptores"
                icon="FormOutlined"
                text="Descriptores"
                @click="goDescriptors"
              ></tooltip-icon>
              <tooltip-icon
                title="Gestionar ubicaciones"
                icon="AimOutlined"
                text="Ubicaciones"
                @click="goUbications"
              ></tooltip-icon>
              <tooltip-icon
                title="Gestionar clasificaciones"
                icon="TagOutlined"
                text="Clasificaciones"
                @click="goClasifications"
              ></tooltip-icon>
            </template>
            <template #operation="{ record }">
              <tooltip-icon
                :icon="'EyeFilled'"
                :title="'Detalles del artículo'"
                @click="showEntryDetailsModalMethod(record)"
              ></tooltip-icon>
              <tooltip-icon
                :icon="'EditFilled'"
                :title="'Editar del artículo'"
                @click="goToEditEntry(record.id)"
              ></tooltip-icon>
              <a-popconfirm
                v-if="record.elements.length === 0"
                title="¿Seguro(a) que desea eliminar el estudio?"
                @confirm="deleteEntry(record.id)"
              >
                <tooltip-icon
                  :icon="'DeleteFilled'"
                  :title="'Eliminar artículo'"
                  :style-icon="{
                    fontSize: '25px',
                    color: 'red',
                    marginBottom: '5px',
                    marginLeft: '10px',
                  }"
                ></tooltip-icon>
              </a-popconfirm>
            </template>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </div>
    <entry-details-modal
      :visible="showEntryDetailsModal"
      :entry="selectedEntry"
      @close-modal="closeEntryDetailsModalMethod"
    ></entry-details-modal>
    <uploaded-excel-report-modal
      :visible="showUploadedExcelReport"
      :entries="excelUploadedInfo.entries"
      :errors="excelUploadedInfo.errors"
      @close-modal="closeUploadedExcelReportMethod"
      @close-modal-reload-entries="reloadEntries"
    ></uploaded-excel-report-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { Dictionary as DictionaryModel } from '@/graphql/modules/dictionary/model';
import { Entry as EntryModel } from '@/graphql/modules/entry/model';
import { EntryToEdit } from '@/models/Entry';
import Select from '@/components/shared/Select.vue';
import TooltipIcon from '@/components/shared/TooltipIcon.vue';
import EntryDetailsModal from './EntryDetailsModal.vue';
import UploadedExcelReportModal from './UploadedExcelReportModal.vue';
import ShowIcon from '@/components/shared/ShowIcon.vue';
import UseColumns from './UseColumnsEntries';
import UseEntryDetailsModal from './UseEntryDetailsModal';
import UseUploadedExcelReport from './UseUploadedExcelReport';
import UseGetEntriesByLetter from './UseGetEntriesByLetter';
import UseAllDescriptorsInitData from '../DescriptorsInitOnMounted/UseAllDescriptorsInitData';
import UseRoutes from '@/router/UseRoutes';
import ShowMessage from '@/utils/Message/Message';
import { store } from '@/store/store';
import UseClasificationInitData from '../DescriptorsInitOnMounted/UseClasificationInitData';
import UseUbicationInitData from '../DescriptorsInitOnMounted/UseUbicationInitData';
import { axiosClientPostImage } from '@/plugins/axios';
export default defineComponent({
  components: {
    'general-select': Select,
    'tooltip-icon': TooltipIcon,
    'entry-details-modal': EntryDetailsModal,
    'uploaded-excel-report-modal': UploadedExcelReportModal,
    'show-icon': ShowIcon,
  },
  setup() {
    const {
      goToStudies,
      goToNewEntry,
      goToEditEntry,
      goDescriptors,
      goUbications,
      goClasifications,
    } = UseRoutes();
    const {
      NoApplyDescriptor,
      NoDescribeDescriptor,
    } = UseAllDescriptorsInitData();
    const { ClasificationInitData } = UseClasificationInitData();
    const { UbicationInitData } = UseUbicationInitData();
    const validateInit = async () => {
      if (!store.study.id) {
        goToStudies();
      }
      if (store.dictionary.id) {
        const dataDictionary = await DictionaryModel.getDictionaryByID(
          store.dictionary.id
        );
        store.dictionary = dataDictionary.data.getDictionaryByID;
        activeKey.value = store.dictionary.letters[0];
        store.entries = getEntriesByLetter(
          store.dictionary.entries,
          activeKey.value
        );
      }
      await NoApplyDescriptor();
      await NoDescribeDescriptor();
      await ClasificationInitData();
      await UbicationInitData();
    };
    onMounted(validateInit);
    const activeKey: Ref<string> = ref('');
    const selectedEntry: Ref<EntryToEdit> = ref();
    const { columns } = UseColumns();
    const { getEntriesByLetter } = UseGetEntriesByLetter();
    const handleDictionarySelect = async (id: string) => {
      store.layout.isLoading = true;
      store.layout.loadingTip = 'Cargando artículos del diccionario';
      const dataDictionary = await DictionaryModel.getDictionaryByID(id);
      store.dictionary = dataDictionary.data.getDictionaryByID;
      activeKey.value = store.dictionary.letters[0];
      store.entries = getEntriesByLetter(
        store.dictionary.entries,
        activeKey.value
      );
      store.layout.isLoading = false;
      store.layout.loadingTip = '';
    };
    const handleTabLetterChange = (activeKey) => {
      console.log('activeKey', activeKey);
      store.entries = getEntriesByLetter(store.dictionary.entries, activeKey);
    };
    const {
      showEntryDetailsModal,
      showEntryDetailsModalMethod,
      closeEntryDetailsModalMethod,
    } = UseEntryDetailsModal(selectedEntry);
    const {
      showUploadedExcelReport,
      showUploadedExcelReportMethod,
      closeUploadedExcelReportMethod,
    } = UseUploadedExcelReport();
    const excelUploadedInfo = ref({
      entries: [],
      errors: [],
    });
    const handleBeforeUpload = (file) => {
      const fileExtension = file.name.split('.')[1];
      if (fileExtension !== 'xlsx') {
        ShowMessage('error', 'created', 'Excel', 'Solo subir archivos excel');
        return Promise.reject('Solo subir excel');
      }
    };
    // const handleChangeUpload = async (upload) => {
    //   if (upload.event) {
    //     store.layout.isLoading = true;
    //     store.layout.loadingTip = `Subiendo excel ${Number.parseInt(
    //       upload.event.percent
    //     )}%`;
    //   } else {
    //     console.log('upload', upload);
    //     store.layout.loadingTip = `Leyendo excel`;
    //     // console.log('response', response);
    //     // excelUploadedInfo.value.entries = response.data.entries;
    //     // excelUploadedInfo.value.errors = response.data.errors;
    //     console.log('entries', excelUploadedInfo.value.entries);
    //     console.log('errors', excelUploadedInfo.value.errors);
    //     store.layout.isLoading = false;
    //     store.layout.loadingTip = '';
    //     showUploadedExcelReportMethod();
    //   }
    // };
    const uploadAction = async (file) => {
      console.log('file', file);
      const fd = new FormData();
      fd.append('file', file);
      store.layout.isLoading = true;
      store.layout.loadingTip = `Leyendo excel`;
      const response = await axiosClientPostImage.post(
        `/excel/${store.dictionary.id}`,
        fd
      );
      excelUploadedInfo.value.entries = response.data.entries;
      excelUploadedInfo.value.errors = response.data.errors;
      showUploadedExcelReportMethod();
      store.layout.isLoading = false;
      store.layout.loadingTip = '';
      return response;
    };
    const reloadEntries = async () => {
      closeUploadedExcelReportMethod();
      store.layout.isLoading = true;
      store.layout.loadingTip = 'Actualizando tabla con los artículos nuevos';
      const dataDictionary = await DictionaryModel.getDictionaryByID(
        store.dictionary.id
      );
      store.dictionary = dataDictionary.data.getDictionaryByID;
      activeKey.value = store.dictionary.letters[0];
      store.entries = getEntriesByLetter(
        store.dictionary.entries,
        activeKey.value
      );
      store.layout.isLoading = false;
      store.layout.loadingTip = '';
    };
    const deleteEntry = async (entryID) => {
      store.layout.isLoading = true;
      store.layout.loadingTip = 'Eliminando artículo';
      const dataDeleteEntry = await EntryModel.deleteEntry(
        entryID,
        store.dictionary.id
      );
      if (dataDeleteEntry.data.deleteEntryByDictionaryID) {
        const dataDictionary = await DictionaryModel.getDictionaryByID(
          store.dictionary.id
        );
        store.dictionary = dataDictionary.data.getDictionaryByID;
        activeKey.value = store.dictionary.letters[0];
        store.entries = getEntriesByLetter(
          store.dictionary.entries,
          activeKey.value
        );
        ShowMessage('success', 'deleted', 'Artículo lexicográfico');
      } else {
        ShowMessage('error', 'deleted', 'Artículo lexicográfico');
      }
      store.layout.isLoading = false;
      store.layout.loadingTip = '';
    };
    return {
      goToStudies,
      goToNewEntry,
      goToEditEntry,
      goDescriptors,
      goUbications,
      goClasifications,
      activeKey,
      selectedEntry,
      columns,
      handleDictionarySelect,
      handleTabLetterChange,
      showEntryDetailsModal,
      showEntryDetailsModalMethod,
      closeEntryDetailsModalMethod,
      showUploadedExcelReport,
      showUploadedExcelReportMethod,
      closeUploadedExcelReportMethod,
      excelUploadedInfo,
      handleBeforeUpload,
      // handleChangeUpload,
      uploadAction,
      reloadEntries,
      deleteEntry,
    };
  },
});
</script>
