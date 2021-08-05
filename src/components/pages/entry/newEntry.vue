<template>
  <div>
    <h4>Crear Nueva Unidad Fraseologica</h4>
    <br />
    <div class="box01">
      <div class="box02">
        <h6 class="d-none d-sm-block">
          Estudio:
          {{ $store.study.name }}
        </h6>
        <h6 class="d-none d-sm-block">
          Diccionario: {{ $store.dictionary.name }}
        </h6>
        <h6 class="d-none d-sm-block">
          Letra: {{ $route.params.letter.toString() }}
        </h6>
      </div>
      <div class="w-100 h-100 d-flex justify-content-start">
        <!-- <a-form-item name="context"> -->
        <div>
          <lexicografics-articles-images
            :images="images"
            :selected-image-index="selectedImageIndex"
            @select-image="changeSelectedImage"
          ></lexicografics-articles-images>
          <br />
          <div class="d-flex flex-row align-items-center justify-center">
            <vue-croppie
              :button-text="
                selectedImageIndex !== -1
                  ? 'Cambiar Articulo Lexicografico'
                  : 'Subir Articulo Lexicografico'
              "
              :icon="selectedImageIndex !== -1 ? 'change' : 'upload'"
              @crop="updateImage($event, selectedImageIndex)"
            ></vue-croppie>
            <a-button
              v-if="selectedImageIndex !== -1"
              class="ml-2 d-flex align-items-center justify-center"
              type="primary"
              danger
              @click="deleteImage"
            >
              <DeleteOutlined />
              Eliminar Articulo Lexicografico
            </a-button>
          </div>
        </div>
        <!-- </a-form-item> -->
      </div>
    </div>
    <a-tabs
      v-model:activeKey="activeKey"
      :style="{ 'margin-top': '5px' }"
      size="small"
      @change="handleTabsChange"
    >
      <a-tab-pane :key="1" tab="Extracción">
        <extraction-tab
          v-model:lemma="newEntry.lemma"
          v-model:sublemmas="newEntry.sublemmas"
          v-model:ufs="newEntry.UFs"
          v-model:ufs-ubications="UFUbications"
          @lemma-change="updateLemma"
          @update-lemma-clasification="updateLemmaClasification"
          @add-sublemma="addSublemma"
          @sublemma-change="updateSublemma"
          @update-sublemma-clasification="updateSublemmaClasification"
          @remove-sublemma="removeSublemma"
          @add-uf="addUF"
          @uf-change="updateUF"
          @remove-uf="removeUF"
          @go-next-tab="goNextTab"
          @go-preview-tab="goPreviewTab"
          @go-dictionaries="goDictionaries"
          @save="createUF"
        ></extraction-tab>
      </a-tab-pane>
      <a-tab-pane :key="2" tab="Descripción General">
        <general-description-tab
          v-model:ufs="newEntry.UFs"
          :descriptors-types="$store.GeneralDescriptionDescriptorsTypes"
          :ufs-ubications="UFUbications"
          @update-uf-descriptor="updateUFGeneralDescriptionDescriptor"
          @go-next-tab="goNextTab"
          @go-preview-tab="goPreviewTab"
          @go-dictionaries="goDictionaries"
          @save="createUF"
        ></general-description-tab>
      </a-tab-pane>
      <a-tab-pane :key="3" tab="Información de Uso">
        <use-information-tab
          v-model:ufs="newEntry.UFs"
          :observations="$store.UseInformationObservations"
          :ufs-ubications="UFUbications"
          @update-uf-anotation-descriptor="
            updateUFAnotationUseInformationDescriptor
          "
          @update-uf-d1-descriptor="updateUFD1UseInformationDescriptor"
          @update-uf-d2-descriptor="updateUFD2UseInformationDescriptor"
          @update-uf-d3-descriptor="updateUFD3UseInformationDescriptor"
          @go-next-tab="goNextTab"
          @go-preview-tab="goPreviewTab"
          @go-dictionaries="goDictionaries"
          @save="createUF"
        ></use-information-tab>
      </a-tab-pane>
      <a-tab-pane :key="4" tab="Ordenación y Lematización">
        <order-lemma-tab
          v-model:ufs="newEntry.UFs"
          :observations="$store.OrderLemmaObservations"
          :ufs-ubications="UFUbications"
          @update-uf-descriptor="updateUFOrderLemmaDescriptor"
          @go-next-tab="goNextTab"
          @go-preview-tab="goPreviewTab"
          @go-dictionaries="goDictionaries"
          @save="createUF"
        ></order-lemma-tab>
      </a-tab-pane>
      <a-tab-pane :key="5" tab="Definición">
        <definition-tab
          v-model:ufs="newEntry.UFs"
          :ufs-ubications="UFUbications"
          :definitions-descriptors-types="$store.DefinitionDescriptorsTypes"
          :contorno-descriptors-types="$store.ContornoDescriptorsTypes"
          @update-uf-type-definition-descriptor="
            updateUFTypeOfDefinitionDescriptor
          "
          @update-uf-relationship-definition-descriptor="
            updateUFRelationshipDefinitionDescriptor
          "
          @update-uf-contorno-descriptor="updateUFContornoDescriptor"
          @update-uf-definition="updateUFDefinition"
          @update-uf-contorno="updateUFContorno"
          @add-contorno-definition="addContornoDefinition"
          @remove-contorno-definition="removeContornoDefinition"
          @go-next-tab="goNextTab"
          @go-preview-tab="goPreviewTab"
          @go-dictionaries="goDictionaries"
          @save="createUF"
        ></definition-tab>
      </a-tab-pane>
      <a-tab-pane :key="6" tab="Ejemplificación">
        <example-tab
          v-model:ufs="newEntry.UFs"
          :descriptors-types="$store.ExampleDescriptorsTypes"
          :ufs-ubications="UFUbications"
          @update-uf-anotation-descriptor="updateUFAnotationExampleDescriptor"
          @update-uf-type-descriptor="updateUFTypeExampleDescriptor"
          @update-uf-format-descriptor="updateUFFormatExampleDescriptor"
          @update-uf-function-descriptor="updateUFFunctionExampleDescriptor"
          @go-next-tab="goNextTab"
          @go-preview-tab="goPreviewTab"
          @go-dictionaries="goDictionaries"
          @save="createUF"
        ></example-tab>
      </a-tab-pane>
      <a-tab-pane :key="7" tab="información Paradigmática">
        <paradigmatic-info-tab
          v-model:ufs="newEntry.UFs"
          :descriptors-types="$store.ParadigmaticInfoDescriptorsTypes"
          :ufs-ubications="UFUbications"
          @update-uf-descriptor="updateUFParadigmaticInfoDescriptor"
          @go-next-tab="goNextTab"
          @go-preview-tab="goPreviewTab"
          @go-dictionaries="goDictionaries"
          @save="createUF"
        ></paradigmatic-info-tab>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts">
import Vue, { defineComponent, reactive, ref, UnwrapRef, h } from 'vue';
import {
  PlusOutlined,
  MinusCircleFilled,
  PlusSquareFilled,
  DoubleRightOutlined,
  FolderOpenOutlined,
  DeleteOutlined,
} from '@ant-design/icons-vue';

import { base64ImageToFile, readImageAsUrl } from '../../../utils/images';
import { UF } from '@/graphql/modules/entry/model';
import { axiosClientPostImage } from '@/plugins/axios';

import ClasificationSelect from './ClasificationSelect.vue';
import LexicograficsArticlesImages from './LexicograficsArticlesImages.vue';
import UbicationsModal from './UbicationsModal.vue';
import TabContent from './DescriptorTabContent.vue';
import VueCroppie from './CroppieComponent.vue';

//DescriptorsTabs
import ExtractionTab from './DescriptorsTabs/Extraction.vue';
import GeneralDescriptionTab from './DescriptorsTabs/GeneralDescription.vue';
import UseInformationTab from './DescriptorsTabs/UseInformation.vue';
import OrderLemmaTab from './DescriptorsTabs/OrderLemmatization.vue';
import DefinitionTab from './DescriptorsTabs/Definition.vue';
import ExampleTab from './DescriptorsTabs/Example.vue';
import ParadigmaticInfoTab from './DescriptorsTabs/ParadigmaticInfo.vue';

//DictionaryModel
import { Dictionary } from '@/graphql/modules/dictionary/model.ts';

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

export default defineComponent({
  components: {
    PlusOutlined,
    MinusCircleFilled,
    PlusSquareFilled,
    DoubleRightOutlined,
    FolderOpenOutlined,
    DeleteOutlined,
    'clasification-select': ClasificationSelect,
    'vue-croppie': VueCroppie,
    'ubications-modal': UbicationsModal,
    'tab-content': TabContent,
    'lexicografics-articles-images': LexicograficsArticlesImages,
    'extraction-tab': ExtractionTab,
    'general-description-tab': GeneralDescriptionTab,
    'use-information-tab': UseInformationTab,
    'order-lemma-tab': OrderLemmaTab,
    'definition-tab': DefinitionTab,
    'example-tab': ExampleTab,
    'paradigmatic-info-tab': ParadigmaticInfoTab,
  },
  setup() {
    const croppieRef = ref();
    return {
      croppieRef,
    };
  },
  data() {
    const activeKey = 1;
    const images = [];
    const newEntry = {
      context: [],
      lemma: {
        lemma: '',
        clasification: '',
      },
      letter: '',
      sublemmas: [],
      UFs: [],
    };
    const UFUbications = [];
    const showUbicationsModal = false;
    const selectedImageIndex = -1;
    return {
      activeKey,
      images,
      newEntry,
      UFUbications,
      showUbicationsModal,
      selectedImageIndex,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
  },
  methods: {
    getEntriesByLetter(allEntries, letter) {
      return allEntries.filter((entry) => entry.letter === letter);
    },
    async createUF() {
      this.$store.layout.isLoading = true;
      let context = [];
      for (let i = 0; i < this.images.length; i++) {
        const element = this.images[i];
        const extensionFile = '.' + element.file.name.split('.')[1];
        const date = Date.now();
        context.push(
          this.newEntry.lemma.lemma + '_' + date + '_' + (i + 1) + extensionFile
        );
      }
      // Uploading Images
      for (let i = 0; i < this.images.length; i++) {
        const fd = new FormData();
        fd.append('file', this.images[i].file);
        axiosClientPostImage.post(`/${context[i]}`, fd);
      }

      this.newEntry.letter = this.$route.params.letter.toString();
      this.newEntry.context = context;
      console.log(this.newEntry);
      await UF.createUF(this.$store.dictionary.id, this.newEntry);

      //UpdatingDictionaryStore
      const dataSelectedDictionary = await Dictionary.getDictionaryByID(
        this.$store.dictionary.id
      );
      const selectedDictionary = dataSelectedDictionary.data.getDictionaryByID;
      console.log('selectedDictionary', selectedDictionary);
      this.$store.dictionary = selectedDictionary;
      this.$store.entries = this.getEntriesByLetter(
        this.$store.dictionary.entries,
        this.$route.params.letter.toString()
      );
      console.log('this.$store.entries', this.$store.entries);
      this.$store.layout.isLoading = false;
      this.$router.push({ name: 'dictionaries' });
    },

    //LEMMA METHODS
    updateLemma(lemma) {
      this.newEntry.lemma.lemma = lemma;
    },
    updateLemmaClasification(clasification) {
      this.newEntry.lemma.clasification = clasification;
    },

    //SUBLEMMA METHODS
    updateSublemma(update) {
      this.newEntry.sublemmas[update.index].sublemma = update.sublemma;
    },
    updateSublemmaClasification(update) {
      this.newEntry.sublemmas[update.index].clasification =
        update.clasification;
    },
    addSublemma() {
      this.newEntry.sublemmas.push({
        sublemma: '',
        clasification: '',
      });
    },
    removeSublemma(index) {
      this.newEntry.sublemmas.splice(index, 1);
    },

    //UF METHODS
    updateUF(update) {
      this.newEntry.UFs[update.index].UF = update.uf;
    },
    removeUF(index) {
      this.newEntry.UFs.splice(index, 1);
      this.UFUbications.splice(index, 1);
    },
    addUF(ubication) {
      this.newEntry.UFs.push({
        UF: '',
        ubication: ubication.id,
        generalDescription: [],
        useInformation: [
          {
            anotation: new String(),
            descriptors: [],
          },
          {
            anotation: new String(),
            descriptors: [],
          },
          {
            anotation: new String(),
            descriptors: [],
          },
          {
            anotation: new String(),
            descriptors: [],
          },
          {
            anotation: new String(),
            descriptors: [],
          },
          {
            anotation: new String(),
            descriptors: [],
          },
          {
            anotation: new String(),
            descriptors: [],
          },
          {
            anotation: new String(),
            descriptors: [],
          },
          {
            anotation: new String(),
            descriptors: [],
          },
          {
            anotation: new String(),
            descriptors: [],
          },
        ],
        orderLemma: [[], [], [], [], [], []],
        ContornoDefinition: [
          {
            definition: {
              definition: '',
              descriptors: {
                typeOfDefinition: '',
                relationship: [],
              },
            },
            contorno: {
              contorno: '',
              descriptors: [],
            },
          },
        ],
        example: {
          anotation: '',
          typeOfExample: '',
          formatOfExample: [],
          functionOfExample: [],
        },
        paradigmaticInfo: [],
      });
      this.UFUbications.push(ubication.ubication);
    },
    addContornoDefinition(selectedUF) {
      this.newEntry.UFs[selectedUF].ContornoDefinition.push({
        definition: {
          definition: '',
          descriptors: {
            typeOfDefinition: '',
            relationship: [],
          },
        },
        contorno: {
          contorno: '',
          descriptors: [],
        },
      });
    },
    updateUFGeneralDescriptionDescriptor(update) {
      this.newEntry.UFs[update.indexUFS].generalDescription[update.indexDT] =
        update.descriptor;
    },
    updateUFAnotationUseInformationDescriptor(update) {
      this.newEntry.UFs[update.indexUFS].useInformation[
        update.selectedObservation
      ].anotation = update.descriptor;
    },
    updateUFD1UseInformationDescriptor(update) {
      this.newEntry.UFs[update.indexUFS].useInformation[
        update.selectedObservation
      ].descriptors[0] = update.descriptor;
    },
    updateUFD2UseInformationDescriptor(update) {
      this.newEntry.UFs[update.indexUFS].useInformation[
        update.selectedObservation
      ].descriptors[1] = update.descriptor;
    },
    updateUFD3UseInformationDescriptor(update) {
      this.newEntry.UFs[update.indexUFS].useInformation[
        update.selectedObservation
      ].descriptors[2] = update.descriptor;
    },
    updateUFOrderLemmaDescriptor(update) {
      console.log(update);
      this.newEntry.UFs[update.indexUFS].orderLemma[
        update.selectedObservation
      ] = update.descriptor;
    },
    updateUFDefinition(update) {
      console.log(update);
      this.newEntry.UFs[update.selectedUF].ContornoDefinition[
        update.selectedCD
      ].definition.definition = update.definition;
    },
    updateUFContorno(update) {
      this.newEntry.UFs[update.selectedUF].ContornoDefinition[
        update.selectedCD
      ].contorno.contorno = update.contorno;
    },
    updateUFTypeOfDefinitionDescriptor(update) {
      this.newEntry.UFs[update.selectedUF].ContornoDefinition[
        update.selectedCD
      ].definition.descriptors.typeOfDefinition = update.descriptor;
    },
    updateUFRelationshipDefinitionDescriptor(update) {
      this.newEntry.UFs[update.selectedUF].ContornoDefinition[
        update.selectedCD
      ].definition.descriptors.relationship = update.descriptor;
      console.log(
        this.newEntry.UFs[update.selectedUF].ContornoDefinition[
          update.selectedCD
        ].definition.descriptors.relationship
      );
    },
    updateUFContornoDescriptor(update) {
      this.newEntry.UFs[update.selectedUF].ContornoDefinition[
        update.selectedCD
      ].contorno.descriptors = update.descriptor;
      console.log(
        this.newEntry.UFs[update.selectedUF].ContornoDefinition[
          update.selectedCD
        ].contorno.descriptors
      );
    },
    removeContornoDefinition(update) {
      this.newEntry.UFs[update.indexUFS].ContornoDefinition.splice(
        update.indexCD,
        1
      );
    },
    updateUFAnotationExampleDescriptor(update) {
      this.newEntry.UFs[update.indexUFS].example.anotation = update.descriptor;
    },
    updateUFTypeExampleDescriptor(update) {
      this.newEntry.UFs[update.indexUFS].example.typeOfExample =
        update.descriptor;
    },
    updateUFFormatExampleDescriptor(update) {
      this.newEntry.UFs[update.indexUFS].example.formatOfExample =
        update.descriptor;
    },
    updateUFFunctionExampleDescriptor(update) {
      this.newEntry.UFs[update.indexUFS].example.functionOfExample =
        update.descriptor;
    },
    updateUFParadigmaticInfoDescriptor(update) {
      this.newEntry.UFs[update.indexUFS].paradigmaticInfo[update.indexDT] =
        update.descriptor;
    },
    //IMAGE METHODS
    updateImage(image, index) {
      console.log('index:', index);
      if (index === -1) {
        this.images.push(image);
      } else {
        this.images[index] = image;
      }
      console.log('image:', image);
    },
    deleteImage() {
      this.images.splice(this.selectedImageIndex, 1);
      this.selectedImageIndex = -1;
    },
    changeSelectedImage(index) {
      console.log('changeSelectedImage:', index);
      if (index === this.selectedImageIndex) {
        this.selectedImageIndex = -1;
      } else {
        this.selectedImageIndex = index;
      }
    },

    goNextTab() {
      this.activeKey++;
    },
    goPreviewTab() {
      this.activeKey--;
    },
    goDictionaries() {
      this.$router.push({ name: 'dictionaries' });
    },
    handleTabsChange(activeKey) {
      console.log(activeKey);
    },
    changeImageFile(e) {
      const imgFile = e.file.originFileObj;
      if (imgFile) {
        this.readImageUrl(imgFile);
      }
    },
    readImageUrl(imgFile) {
      readImageAsUrl(imgFile, (reader) => {
        this.showCroppie = true;
        this.croppieRef.bind({
          url: reader.result,
        });
      });
      this.showCropperModal = true;
    },
    reset() {
      this.showCroppie = false;
      this.croppieRef.refresh();
    },
    crop() {
      this.croppieRef.result(this.options, (base64) => {
        const file = base64ImageToFile(base64);
        const image = {
          file,
          base64,
        };
        this.imageUrl = image.base64;
      });
      this.closeCroppieModal();
    },
    closeCroppieModal() {
      this.showCropperModal = false;
    },
    removeUF(UF) {
      let index = this.newEntry.UFs.indexOf(UF);
      if (index !== -1) {
        this.newEntry.UFs.splice(index, 1);
      }
    },
    addUF() {
      this.newEntry.UFs.push({
        UF: '',
        clasification: [],
      });
    },
  },
});
</script>

<style>
.box01 {
  width: 100%;
  /* border: 5px solid red; */
  display: flex;
  align-items: flex-start;
}

.box02 {
  width: 35%;
  /* background: yellow; */
}

.box03 {
  width: 100%;
  height: 100%;
  /* background: green; */
}

.imageBox {
  width: 100%;
}
</style>
