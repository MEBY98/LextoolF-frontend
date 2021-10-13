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
          {{ $route.params.letter.toString() }}
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
            :elements="newEntry.elements"
            :elements-ubications="elementsUbications"
            :elements-clasifications-indexs="elementsClasificationsIndexs"
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
            :elements="newEntry.elements"
            :elements-ubications="elementsUbications"
            :elements-clasifications-indexs="elementsClasificationsIndexs"
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
            :elements="newEntry.elements"
            :elements-ubications="elementsUbications"
            :elements-clasifications-indexs="elementsClasificationsIndexs"
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
            :elements="newEntry.elements"
            :elements-ubications="elementsUbications"
            :elements-clasifications-indexs="elementsClasificationsIndexs"
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
            :elements="newEntry.elements"
            :elements-ubications="elementsUbications"
            :elements-clasifications-indexs="elementsClasificationsIndexs"
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
            :elements="newEntry.elements"
            :elements-ubications="elementsUbications"
            :elements-clasifications-indexs="elementsClasificationsIndexs"
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
            :elements="newEntry.elements"
            :elements-ubications="elementsUbications"
            :elements-clasifications-indexs="elementsClasificationsIndexs"
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
import { NewEntry } from '@/models/Entry';
import { Image } from './Image.interface';
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
import UseExtractionTab from './UseExtractionTab';
import UseGeneralDescriptionTab from './UseGeneralDescriptionTab';
import UseOrderLemmaTab from './UseOrderLemmaTab';
import UseUseInformationTab from './UseUseInformationTab';
import UseContornoDefinitionTab from './UseContornoDefinitionTab';
import UseExampleTab from './UseExampleTab';
import UseParadigmaticInfo from './UseParadigmaticInfo';
import UseTabsFooter from './UseTabsFooter';
import UseAllDescriptorsInitData from '../DescriptorsInitOnMounted/UseAllDescriptorsInitData';
import UseUbicationInitData from '../DescriptorsInitOnMounted/UseUbicationInitData';
import UseClasificationInitData from '../DescriptorsInitOnMounted/UseClasificationInitData';
import UseValidateTabs from './UseValidateTabs';
import UseRoutes from '@/router/UseRoutes';
import ShowMessage from '@/utils/Message/Message';
import { store } from '@/store/store';
import CKEditorComponentVue from '../HtmlEditor/CKEditorComponent.vue';

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
    'ck-editor-component': CKEditorComponentVue,
  },
  setup() {
    const { UbicationInitData } = UseUbicationInitData();
    const { ClasificationInitData } = UseClasificationInitData();
    onMounted(UbicationInitData);
    onMounted(ClasificationInitData);
    const { AllDescriptorsInitData } = UseAllDescriptorsInitData();
    onMounted(AllDescriptorsInitData);
    const { route } = UseRoutes();
    const images: Ref<Image[]> = ref(new Array<Image>());
    const activeKey: Ref<number> = ref(1);
    const newEntry: Ref<NewEntry> = ref({
      letter: '',
      context: [],
      elements: [],
    });
    const elementsUbications: Ref<string[]> = ref(new Array<string>());
    const elementsClasificationsIndexs: Ref<number[]> = ref(
      new Array<number>()
    );
    const {
      hasLemma,
      hasAntSinUF,
      hasLemmaSublemmaUF,
      hasUF,
    } = UseValidateTabs(
      elementsClasificationsIndexs,
      elementsUbications,
      newEntry
    );
    const {
      changeElement,
      addElement,
      clasificateElement,
      removeElement,
    } = UseExtractionTab(
      newEntry,
      elementsUbications,
      elementsClasificationsIndexs
    );
    const { updateGeneralDescription } = UseGeneralDescriptionTab(newEntry);
    const { updateOrderLemma } = UseOrderLemmaTab(newEntry);
    const { updateUseInformation } = UseUseInformationTab(newEntry);
    const {
      updateContornoDefinition,
      updateElementContorno,
      updateElementDefinition,
      removeContornoDefinition,
      addContornoDefinition,
    } = UseContornoDefinitionTab(newEntry);
    const { updateExample } = UseExampleTab(newEntry);
    const { updateParadigmaticInfo } = UseParadigmaticInfo(newEntry);
    const { goNextTab, goPreviewTab, goEntries } = UseTabsFooter(activeKey);
    const createEntry = async () => {
      store.layout.isLoading = true;
      store.layout.loadingTip = 'Creando entrada';
      const context: string[] = [];
      for (let i = 0; i < images.value.length; i++) {
        const element = images.value[i];
        const extensionFile = '.' + element.file.name.split('.')[1];
        const date = Date.now();
        context.push(
          store.dictionary.id + '_' + date + '_' + (i + 1) + extensionFile
        );
      }
      newEntry.value.letter = route.params.letter.toString();
      newEntry.value.context = context;
      const { data } = await EntryModel.createEntry(
        store.dictionary.id,
        newEntry.value
      );
      store.entries.push(data.createEntryByDictionaryID);
      // Uploading Images
      store.layout.loadingTip = 'Subiendo imágenes';
      for (let i = 0; i < images.value.length; i++) {
        const fd = new FormData();
        fd.append('file', images.value[i].file);
        axiosClientPostImage.post(`/${context[i]}`, fd);
      }
      goEntries();
      ShowMessage('success', 'created', 'Artículo lexicográfico');
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
      newEntry,
      elementsUbications,
      elementsClasificationsIndexs,
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
