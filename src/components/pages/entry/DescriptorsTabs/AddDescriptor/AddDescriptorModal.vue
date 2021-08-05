<template>
  <a-modal :visible="visible" :footer="null" @cancel="closeModal">
    <span v-if="observation !== null" style="font-weigth: 700">
      Observacion: {{ observation }}
    </span>
    <a-divider v-if="observation !== null" />
    <a-radio-group v-model:value="selectedDescriptorType">
      <div v-for="(d, index) in descriptorsTypes" :key="index" class="d-inline">
        <a-radio v-if="d.inputType !== 'textInput'" :value="d.id">
          {{ d.name }}
        </a-radio>
      </div>
    </a-radio-group>
    <a-divider />
    <a-input
      v-if="selectedDescriptorType !== ''"
      v-model:value="descriptor"
      :placeholder="'Escriba el Nuevo Descriptor'"
    ></a-input>
    <a-divider />
    <div class="d-flex flex-row-reverse">
      <a-button
        v-if="selectedDescriptorType !== ''"
        type="primary"
        @click="addDescriptor"
      >
        Agregar
      </a-button>
      <a-button class="mr-2" @click="closeModal">Cancelar</a-button>
    </div>
  </a-modal>
</template>
<script lang="ts">
import Vue, { defineComponent, ref } from 'vue';

import { DescriptorType as DescriptorTypeModel } from '@/graphql/modules/DescriptorsTypes/model';
import { Observation as ObservationModel } from '@/graphql/modules/Observation/model';

export default defineComponent({
  props: {
    observation: {
      type: String,
      default: () => {
        return null;
      },
    },
    visible: {
      type: Boolean,
    },
    descriptorsTypes: {
      type: [Object],
    },
    tab: {
      type: Number,
    },
  },
  emits: ['add-descriptor', 'close-modal'],
  data() {
    const selectedDescriptorType = new String('');
    const descriptor = new String('');
    return {
      selectedDescriptorType,
      descriptor,
    };
  },
  methods: {
    async addDescriptor() {
      this.$store.layout.isLoading = true;
      const dataDescriptor = await DescriptorTypeModel.createDescriptorByDescriptorType(
        this.selectedDescriptorType,
        { description: this.descriptor }
      );
      if (this.tab === 1) {
        const dataGeneralDescriptorsDescriptorsTypes = await DescriptorTypeModel.getAllGeneralDescriptionDescriptorsTypes();
        this.$store.GeneralDescriptionDescriptorsTypes =
          dataGeneralDescriptorsDescriptorsTypes.data.getAllGeneralDescriptionDescriptorsTypes;
      } else if (this.tab === 2) {
        const dataUseInformationObservations = await ObservationModel.getAllUseInformationObservations();
        this.$store.UseInformationObservations =
          dataUseInformationObservations.data.getAllUseInformationObservations;
      } else if (this.tab === 3) {
        const dataOrderLemmaObservations = await ObservationModel.getAllOrderLemmaObservations();
        this.$store.OrderLemmaObservations =
          dataOrderLemmaObservations.data.getAllOrderLemmaObservations;
      } else if (this.tab === 4) {
        const dataDefinitionDescriptorsTypes = await DescriptorTypeModel.getAllDefinitionDescriptorsTypes();
        this.$store.DefinitionDescriptorsTypes =
          dataDefinitionDescriptorsTypes.data.getAllDefinitionDescriptorsTypes;
        const dataContornoDescriptorsTypes = await DescriptorTypeModel.getAllContornoDescriptorsTypes();
        this.$store.ContornoDescriptorsTypes =
          dataContornoDescriptorsTypes.data.getAllContornoDescriptorsTypes;
      } else if (this.tab === 5) {
        const dataExampleDescriptorsTypes = await DescriptorTypeModel.getAllExampleDescriptorsTypes();
        this.$store.ExampleDescriptorsTypes =
          dataExampleDescriptorsTypes.data.getAllExampleDescriptorsTypes;
      } else if (this.tab === 6) {
        const dataParadigmaticInfoDescriptorsTypes = await DescriptorTypeModel.getAllParadigmaticInfoDescriptorsTypes();
        this.$store.ParadigmaticInfoDescriptorsTypes =
          dataParadigmaticInfoDescriptorsTypes.data.getAllParadigmaticInfoDescriptorsTypes;
      }
      this.$store.layout.isLoading = false;
      this.$emit('add-descriptor');
    },
    closeModal() {
      this.$emit('close-modal');
    },
  },
});
</script>
