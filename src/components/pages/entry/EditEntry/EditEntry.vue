<template>
  <div>
    <div class="d-flex container w-100">
      <div class="d-flex align-items-center justify-center w-100">
        <h6>
          {{ $store.study.name }}
        </h6>
        <show-icon
          :icon="'RightOutlined'"
          :style-icon="{
            fontSize: '16px',
            color: '#08c',
            marginLeft: '15px',
            marginRight: '15px',
          }"
        ></show-icon>
        <h6>
          {{ $store.dictionary.dictionaryInfo.name }}
        </h6>
        <show-icon
          :icon="'RightOutlined'"
          :style-icon="{
            fontSize: '16px',
            color: '#08c',
            marginLeft: '15px',
            marginRight: '15px',
          }"
        ></show-icon>
        <h6>
          {{ selectedEntryCopy.letter.toString() }}
        </h6>
      </div>
    </div>
    <div class="w-100">
      <carousel-images
        :images="images"
        :show-delete-icon="true"
        :show-add-image="true"
        @delete-image="deleteImage"
      ></carousel-images>
    </div>
    <div>
      <a-tabs v-model:activeKey="activeKey" size="small">
        <a-tab-pane :key="1" tab="Extracción">
          <extraction-tab
            :elements="selectedEntryCopy.elements"
            :elements-ubications="elementsUbicationsCopy"
            :elements-clasifications-indexs="elementsClasificationsIndexsCopy"
            :has-lemma="hasLemma"
            :disable-next-button="!hasUF"
            @change-element="changeElement"
            @add-element="addElement"
            @clasificate-element="clasificateElement"
            @remove-element="removeElement"
            @go-next-tab="goNextTab"
            @go-preview-tab="goPreviewTab"
            @go-entries="goEntries"
            @save="createEntry"
          ></extraction-tab>
        </a-tab-pane>
        <a-tab-pane :key="2" tab="Descripción General" :disabled="!hasUF">
          <general-description-tab
            :elements="selectedEntryCopy.elements"
            :elements-ubications="elementsUbicationsCopy"
            :elements-clasifications-indexs="elementsClasificationsIndexsCopy"
            :disable-preview-button="false"
            :disable-next-button="!hasLemmaSublemmaUF"
            @update-element-descriptor="updateGeneralDescription"
            @go-next-tab="goNextTab"
            @go-preview-tab="goPreviewTab"
            @go-entries="goEntries"
            @save="createEntry"
          ></general-description-tab>
        </a-tab-pane>
        <a-tab-pane
          :key="3"
          tab="Ordernación y lematización"
          :disabled="!hasLemmaSublemmaUF"
        >
          <order-lemma-tab
            :elements="selectedEntryCopy.elements"
            :elements-ubications="elementsUbicationsCopy"
            :elements-clasifications-indexs="elementsClasificationsIndexsCopy"
            :disable-next-button="!hasLemmaSublemmaUF"
            :disable-preview-button="!hasUF"
            @update-element-descriptor="updateOrderLemma"
            @go-next-tab="goNextTab"
            @go-preview-tab="goPreviewTab"
            @go-entries="goEntries"
            @save="createEntry"
          ></order-lemma-tab>
        </a-tab-pane>
        <a-tab-pane
          :key="4"
          tab="Información de uso"
          :disabled="!hasLemmaSublemmaUF"
        >
          <use-information-tab
            :elements="selectedEntryCopy.elements"
            :elements-ubications="elementsUbicationsCopy"
            :elements-clasifications-indexs="elementsClasificationsIndexsCopy"
            :disable-next-button="!hasLemmaSublemmaUF"
            :disable-preview-button="!hasLemmaSublemmaUF"
            @update-element-descriptor="updateUseInformation"
            @go-next-tab="goNextTab"
            @go-preview-tab="goPreviewTab"
            @go-entries="goEntries"
            @save="createEntry"
          ></use-information-tab>
        </a-tab-pane>
        <a-tab-pane
          :key="5"
          tab="Definición de la UF"
          :disabled="!hasLemmaSublemmaUF"
        >
          <contorno-definition-tab
            :elements="selectedEntryCopy.elements"
            :elements-ubications="elementsUbicationsCopy"
            :elements-clasifications-indexs="elementsClasificationsIndexsCopy"
            :disable-next-button="!hasLemmaSublemmaUF"
            :disable-preview-button="!hasLemmaSublemmaUF"
            @update-element-definition="updateElementDefinition"
            @update-element-contorno="updateElementContorno"
            @remove-contorno-definition="removeContornoDefinition"
            @add-contorno-definition="addContornoDefinition"
            @update-element-descriptor="updateContornoDefinition"
            @go-next-tab="goNextTab"
            @go-preview-tab="goPreviewTab"
            @go-entries="goEntries"
            @save="createEntry"
          ></contorno-definition-tab>
        </a-tab-pane>
        <a-tab-pane
          :key="6"
          tab="Ejemplificación de la UF"
          :disabled="!hasLemmaSublemmaUF"
        >
          <example-tab
            :elements="selectedEntryCopy.elements"
            :elements-ubications="elementsUbicationsCopy"
            :elements-clasifications-indexs="elementsClasificationsIndexsCopy"
            :disable-next-button="!hasAntSinUF"
            :disable-preview-button="!hasLemmaSublemmaUF"
            @update-element-descriptor="updateExample"
            @go-next-tab="goNextTab"
            @go-preview-tab="goPreviewTab"
            @go-entries="goEntries"
            @save="createEntry"
          ></example-tab>
        </a-tab-pane>
        <a-tab-pane
          :key="7"
          tab="Información paradigmática"
          :disabled="!hasAntSinUF"
        >
          <paradigmatic-info-tab
            :elements="selectedEntryCopy.elements"
            :elements-ubications="elementsUbicationsCopy"
            :elements-clasifications-indexs="elementsClasificationsIndexsCopy"
            :disable-preview-button="!hasLemmaSublemmaUF"
            @update-element-descriptor="updateParadigmaticInfo"
            @go-next-tab="goNextTab"
            @go-preview-tab="goPreviewTab"
            @go-entries="goEntries"
            @save="createEntry"
          ></paradigmatic-info-tab>
        </a-tab-pane>
      </a-tabs>
    </div>
    <croppie-modal @crop="crop"></croppie-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, onMounted } from 'vue';
import { Entry as EntryModel } from '@/graphql/modules/entry/model';
import { axiosClientPostImage } from '@/plugins/axios';
import { EntryToEdit } from '@/models/Entry';
import { Image } from '../NewEntry/Image.interface';
import ShowIcon from '@/components/shared/ShowIcon.vue';
import CarouselImages from '../CarouselImages/CarouselImages.vue';
import CroppieModal from '../VueCroppie/CroppieModal.vue';
import Extraction from '../DescriptorsTabs/Extraction.vue';
import GeneralDescription from '../DescriptorsTabs/GeneralDescription.vue';
import OrderLemmatization from '../DescriptorsTabs/OrderLemmatization.vue';
import UseInformation from '../DescriptorsTabs/UseInformation.vue';
import Definition from '../DescriptorsTabs/Definition.vue';
import Example from '../DescriptorsTabs/Example.vue';
import ParadigmaticInfo from '../DescriptorsTabs/ParadigmaticInfo.vue';
import UseExtractionTab from '../NewEntry/UseExtractionTab';
import UseGeneralDescriptionTab from '../NewEntry/UseGeneralDescriptionTab';
import UseOrderLemmaTab from '../NewEntry/UseOrderLemmaTab';
import UseUseInformationTab from '../NewEntry/UseUseInformationTab';
import UseContornoDefinitionTab from '../NewEntry/UseContornoDefinitionTab';
import UseExampleTab from '../NewEntry/UseExampleTab';
import UseParadigmaticInfo from '../NewEntry/UseParadigmaticInfo';
import UseTabsFooter from '../NewEntry/UseTabsFooter';
import UseAllDescriptorsInitData from '../DescriptorsInitOnMounted/UseAllDescriptorsInitData';
import UseUbicationInitData from '../DescriptorsInitOnMounted/UseUbicationInitData';
import UseClasificationInitData from '../DescriptorsInitOnMounted/UseClasificationInitData';
import UseEditEntryInitData from './UseEditEntryInitData';
import UseValidateTabs from '../NewEntry/UseValidateTabs';
import UseRoutes from '@/router/UseRoutes';
import ShowMessage from '@/utils/Message/Message';
import { store } from '@/store/store';

export default defineComponent({
  components: {
    'croppie-modal': CroppieModal,
    'carousel-images': CarouselImages,
    'show-icon': ShowIcon,
    'extraction-tab': Extraction,
    'general-description-tab': GeneralDescription,
    'order-lemma-tab': OrderLemmatization,
    'use-information-tab': UseInformation,
    'contorno-definition-tab': Definition,
    'example-tab': Example,
    'paradigmatic-info-tab': ParadigmaticInfo,
  },
  setup() {
    const { route } = UseRoutes();
    const selectedEntryCopy: Ref<EntryToEdit> = ref({
      id: '',
      letter: '',
      context: [],
      elements: [],
    });
    const elementsUbicationsCopy: Ref<string[]> = ref(new Array<string>());
    const elementsClasificationsIndexsCopy: Ref<number[]> = ref(
      new Array<number>()
    );
    const images: Ref<Image[]> = ref(new Array<Image>());
    const { UbicationInitData } = UseUbicationInitData();
    const { ClasificationInitData } = UseClasificationInitData();
    const { AllDescriptorsInitData } = UseAllDescriptorsInitData();
    const { editEntryInitData } = UseEditEntryInitData(
      route.params.id.toString(),
      selectedEntryCopy,
      elementsUbicationsCopy,
      elementsClasificationsIndexsCopy,
      images
    );
    onMounted(UbicationInitData);
    onMounted(ClasificationInitData);
    onMounted(AllDescriptorsInitData);
    onMounted(editEntryInitData);
    const activeKey: Ref<number> = ref(1);
    const {
      hasLemma,
      hasAntSinUF,
      hasLemmaSublemmaUF,
      hasUF,
    } = UseValidateTabs(
      elementsClasificationsIndexsCopy,
      elementsUbicationsCopy,
      selectedEntryCopy
    );
    const {
      changeElement,
      addElement,
      clasificateElement,
      removeElement,
    } = UseExtractionTab(
      selectedEntryCopy,
      elementsUbicationsCopy,
      elementsClasificationsIndexsCopy
    );
    const { updateGeneralDescription } = UseGeneralDescriptionTab(
      selectedEntryCopy
    );
    const { updateOrderLemma } = UseOrderLemmaTab(selectedEntryCopy);
    const { updateUseInformation } = UseUseInformationTab(selectedEntryCopy);
    const {
      updateContornoDefinition,
      updateElementContorno,
      updateElementDefinition,
      removeContornoDefinition,
      addContornoDefinition,
    } = UseContornoDefinitionTab(selectedEntryCopy);
    const { updateExample } = UseExampleTab(selectedEntryCopy);
    const { updateParadigmaticInfo } = UseParadigmaticInfo(selectedEntryCopy);
    const { goNextTab, goPreviewTab, goEntries } = UseTabsFooter(activeKey);
    const createEntry = async () => {
      store.layout.isLoading = true;
      const context: string[] = [];
      // Uploading Images
      store.layout.loadingTip = 'Subiendo imágenes';
      for (let i = 0; i < images.value.length; i++) {
        const fd = new FormData();
        const img = images.value[i];
        if (img.context === '') {
          const extensionFile = '.' + img.file.name.split('.')[1];
          const date = Date.now();
          const newContext =
            store.dictionary.id + '_' + date + '_' + (i + 1) + extensionFile;
          context.push(newContext);
          fd.append('file', img.file);
          axiosClientPostImage.post(`/${newContext}`, fd);
        } else {
          context.push(img.context);
        }
      }
      selectedEntryCopy.value.context = context;
      store.layout.loadingTip = 'Editando entrada';
      await EntryModel.editEntry(selectedEntryCopy.value);
      goEntries();
      ShowMessage('success', 'edited', 'Artículo lexicográfico');
      store.layout.isLoading = false;
      store.layout.loadingTip = '';
    };
    const deleteImage = (index) => {
      images.value.splice(index, 1);
    };
    const crop = (e) => {
      images.value.push(e);
    };
    return {
      images,
      activeKey,
      selectedEntryCopy,
      elementsUbicationsCopy,
      elementsClasificationsIndexsCopy,
      hasUF,
      hasLemma,
      hasAntSinUF,
      hasLemmaSublemmaUF,
      deleteImage,
      crop,
      changeElement,
      addElement,
      clasificateElement,
      removeElement,
      updateGeneralDescription,
      updateOrderLemma,
      updateUseInformation,
      updateContornoDefinition,
      updateElementContorno,
      updateElementDefinition,
      removeContornoDefinition,
      addContornoDefinition,
      updateExample,
      updateParadigmaticInfo,
      goNextTab,
      goPreviewTab,
      goEntries,
      createEntry,
    };
  },
});
</script>
