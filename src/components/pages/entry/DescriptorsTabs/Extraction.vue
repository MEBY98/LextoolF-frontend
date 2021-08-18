<template>
  <div style="text-align: right">
    <ubications-modal
      v-model:visible="showUbicationsModal"
      @add-uf="addUF"
      @close="closeUbicationsModalMethod"
    ></ubications-modal>
    <PlusSquareFilled
      :style="{
        fontSize: '24px',
        color: '#08c',
        'margin-bottom': '10px',
      }"
      @click="showUbicationsModalMethod"
    />
    <span
      style="font-weight: 500; margin-left: 8px; margin-right: 8px"
      @click="showUbicationsModalMethod"
    >
      UF
    </span>
    <PlusSquareFilled
      :style="{
        fontSize: '24px',
        color: '#08c',
        'margin-bottom': '10px',
      }"
      @click="addSublemma"
    />
    <span
      style="font-weight: 500; margin-left: 8px; margin-right: 8px"
      @click="addSublemma"
    >
      Sublema
    </span>
  </div>

  <a-form :rules="rules">
    <!-- LEMMA -->
    <br />

    <div class="d-flex-inline">
      <h6 style="margin-right: 8px; font-weight: 500">Lema</h6>
      <!-- <a-form-item class="d-flex-inline" name="lemmaInput"> -->
      <a-input
        :value="lemma.lemma"
        placeholder="Escriba el Lema"
        style="width: 62%; margin-right: 8px"
        @input="lemmaChange($event.target.value)"
      ></a-input>
      <!-- </a-form-item> -->
      <!-- <a-form-item class="d-flex-inline" name="lemmaSelect"> -->
      <clasification-select
        :selected="lemma.clasification"
        :clasifications="$store.lemmaClasifications"
        style="width: 20%"
        @clasification-change="updateLemmaClasification"
      ></clasification-select>
      <!-- </a-form-item> -->
    </div>

    <!-- SUBLEMMAS -->
    <br />
    <h6 v-if="sublemmas.length !== 0">Sublemas</h6>
    <div
      v-for="(sublemma, index) in sublemmas"
      :key="index"
      name="sublemmas"
      style="margin-bottom: 10px"
    >
      <span style="font-weight: 500; font-size: 15px; margin-right: 8px">
        Sublema {{ index + 1 }}
      </span>
      <a-input
        :value="sublemmas[index].sublemma"
        placeholder="Escriba el sublema"
        style="width: 62%; margin-right: 8px"
        @input="sublemmaChange($event.target.value, index)"
      ></a-input>
      <clasification-select
        :selected="sublemmas[index].clasification"
        :clasifications="$store.sublemmaClasifications"
        style="width: 20%"
        @clasification-change="updateSublemmaClasification($event, index)"
      ></clasification-select>
      <MinusCircleFilled
        class="dynamic-delete-button"
        :style="{ color: 'red', marginLeft: '8px' }"
        @click="removeSublemma(index)"
      />
    </div>

    <!-- UFS -->
    <br />
    <h6 v-if="ufs.length !== 0">Unidades Fraseologicas</h6>
    <div
      v-for="(UF, index) in ufs"
      :key="index"
      name="ufs"
      style="margin-bottom: 10px"
    >
      <span style="font-weight: 500; font-size: 15px; margin-right: 8px">
        {{ ufsUbications[index] }}
      </span>
      <a-input
        :value="ufs[index].UF"
        placeholder="Escriba la UF"
        style="width: 62%; margin-right: 8px"
        @input="UFChange($event.target.value, index)"
      ></a-input>
      <MinusCircleFilled
        class="dynamic-delete-button"
        :style="{ color: 'red', marginLeft: '8px' }"
        @click="removeUF(index)"
      />
    </div>
  </a-form>

  <!-- FOOTER -->
  <br />
  <tabs-footer
    :first-tab="true"
    :last-tab="false"
    @go-next-tab="goNextTab"
    @go-preview-tab="goPreviewTab"
    @go-dictionaries="goDictionaries"
    @save="save"
  ></tabs-footer>
</template>

<script lang="ts">
import { MinusCircleFilled, PlusSquareFilled } from '@ant-design/icons-vue';

import { defineComponent, ref } from 'vue';

import UbicationsModal from '../UbicationsModal.vue';
import ClasificationSelect from '../ClasificationSelect.vue';
import TabsFooter from './TabsFooter/TabsFooter.vue';
import TabsFooterMixin from './TabsFooter/TabsFooter.mixin.js';

export default defineComponent({
  components: {
    MinusCircleFilled,
    PlusSquareFilled,
    'ubications-modal': UbicationsModal,
    'clasification-select': ClasificationSelect,
    'tabs-footer': TabsFooter,
  },
  mixins: [TabsFooterMixin],
  props: {
    lemma: {
      type: Object,
    },
    sublemmas: {
      type: [Object],
    },
    ufs: {
      type: [Object],
    },
    ufsUbications: {
      type: [String],
    },
  },
  emits: [
    'add-uf',
    'uf-change',
    'remove-uf',

    'lemma-change',
    'update-lemma-clasification',

    'add-sublemma',
    'sublemma-change',
    'update-sublemma-clasification',
    'remove-sublemma',
  ],
  setup(props, context) {
    const showUbicationsModal = ref(false);
    //FORM RULES
    const rules = {
      lemmaInput: [
        {
          required: true,
          message: 'Por favor escriba el Lema',
          trigger: 'blur',
        },
      ],
      lemmaSelect: [
        {
          required: true,
          message: 'Seleccione una clasificacion',
          trigger: 'blur',
        },
      ],
    };

    //UF METHODS
    const addUF = (selectedUbication) => {
      context.emit('add-uf', selectedUbication);
      showUbicationsModal.value = false;
    };
    const UFChange = (uf, index) => {
      const update = { uf, index };
      context.emit('uf-change', update);
    };
    const removeUF = (index) => {
      context.emit('remove-uf', index);
    };

    //SUBLEMMA METHODS
    const addSublemma = () => {
      context.emit('add-sublemma');
      console.log('context:', context);
    };
    const sublemmaChange = (sublemma, index) => {
      const update = { sublemma, index };
      context.emit('sublemma-change', update);
    };
    const updateSublemmaClasification = (clasification, index) => {
      const update = { clasification, index };
      context.emit('update-sublemma-clasification', update);
    };
    const removeSublemma = (index) => {
      context.emit('remove-sublemma', index);
    };

    //LEMMA METHODS
    const lemmaChange = (lemma) => {
      context.emit('lemma-change', lemma);
    };
    const updateLemmaClasification = (clasification) => {
      context.emit('update-lemma-clasification', clasification);
    };

    //UBICATIONS MODAL METHODS
    const closeUbicationsModalMethod = () => {
      showUbicationsModal.value = false;
    };
    const showUbicationsModalMethod = () => {
      showUbicationsModal.value = true;
    };
    return {
      rules,

      showUbicationsModal,
      closeUbicationsModalMethod,
      showUbicationsModalMethod,

      addUF,
      UFChange,
      removeUF,

      addSublemma,
      sublemmaChange,
      updateSublemmaClasification,
      removeSublemma,

      lemmaChange,
      updateLemmaClasification,
    };
  },
});
</script>
