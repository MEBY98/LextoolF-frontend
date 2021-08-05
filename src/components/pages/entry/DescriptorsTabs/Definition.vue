<template>
  <div style="text-align: right">
    <PlusSquareFilled
      v-if="selectedUF !== -1"
      :style="{
        fontSize: '24px',
        color: '#08c',
        'margin-bottom': '10px',
      }"
      @click="addContornoDefinition"
    />
    <span
      v-if="selectedUF !== -1"
      style="font-weight: 500; margin-left: 8px; margin-right: 8px"
    >
      Definición
    </span>
    <add-descriptor
      v-if="selectedDescriptor === 0"
      :tab="4"
      :observation="'Definición'"
      :descriptors-types="definitionsDescriptorsTypes"
    ></add-descriptor>
    <add-descriptor
      v-if="selectedDescriptor === 1"
      :tab="4"
      :observation="'Contorno'"
      :descriptors-types="contornoDescriptorsTypes"
    ></add-descriptor>
  </div>
  <br />
  <tab-header></tab-header>

  <tr
    v-for="(uf, indexUFS) in ufs"
    :key="indexUFS"
    class="row w-100 align-middle"
  >
    <div
      v-for="(cd, indexCD) in ufs[indexUFS].ContornoDefinition"
      :key="indexCD"
      class="row w-100 align-middle m-1"
    >
      <td
        v-if="
          ufsUbications[indexUFS] === 'Lema' ||
          ufsUbications[indexUFS] === 'Sublema'
        "
        class="col-3 d-flex align-items-center align-middle"
      >
        <a-checkbox
          class="mr-3"
          :checked="selectedUF === indexUFS && selectedCD === indexCD"
          @change="handleSelectDefinition(indexUFS, indexCD)"
        ></a-checkbox>
        <span v-if="ufs[indexUFS].UF" style="font-weight: 500">
          {{ ufs[indexUFS].UF }}
        </span>
      </td>
      <td
        v-if="
          ufsUbications[indexUFS] === 'Lema' ||
          ufsUbications[indexUFS] === 'Sublema'
        "
        class="col-3 d-flex align-items-center align-middle"
      >
        <span v-if="ufs[indexUFS].UF" style="font-weight: 500">
          {{ ufsUbications[indexUFS] }}
        </span>
      </td>
      <td
        v-if="
          ufsUbications[indexUFS] === 'Lema' ||
          ufsUbications[indexUFS] === 'Sublema'
        "
        class="col-6 d-flex align-items-center align-middle"
      >
        <span v-if="ufs[indexUFS].UF" class="mr-2" style="font-weight: 500">
          Definición
        </span>
        <a-input
          class="mr-2"
          :value="
            ufs[indexUFS].ContornoDefinition[indexCD].definition.definition
          "
          @input="updateUFDefinition($event.target.value, indexUFS, indexCD)"
        ></a-input>
        <span v-if="ufs[indexUFS].UF" class="mr-2" style="font-weight: 500">
          Contorno
        </span>
        <a-input
          class="mr-2"
          :value="ufs[indexUFS].ContornoDefinition[indexCD].contorno.contorno"
          @input="updateUFContorno($event.target.value, indexUFS, indexCD)"
        ></a-input>
        <MinusCircleFilled
          v-if="ufs[indexUFS].ContornoDefinition.length > 1"
          class="dynamic-delete-button"
          :style="{ color: 'red', marginLeft: '8px' }"
          @click="removeContornoDefinition(indexUFS, indexCD)"
        />
      </td>
    </div>
  </tr>

  <div
    v-if="selectedCD !== -1"
    class="container mt-3 border"
    style="width: 400px; background: #e9ecef"
  >
    <a-radio-group v-model:value="selectedDescriptor" class="m-3">
      <a-radio class="mr-5" :value="0">Definición</a-radio>
      <a-radio :value="1">Contorno</a-radio>
    </a-radio-group>
    <div class="row w-100 m-3">
      <div v-if="selectedDescriptor === 0">
        <descriptor-type
          :type="definitionsDescriptorsTypes[0].inputType"
          :descriptors="definitionsDescriptorsTypes[0].descriptors"
          :multi-input="definitionsDescriptorsTypes[0].multiInput"
          :value="
            ufs[selectedUF].ContornoDefinition[selectedCD].definition
              .descriptors.typeOfDefinition
          "
          :label="definitionsDescriptorsTypes[0].name"
          @input-change="updateUFTypeOfDefinitionDescriptor($event)"
          @select-change="updateUFTypeOfDefinitionDescriptor($event)"
        ></descriptor-type>
        <descriptor-type
          :type="definitionsDescriptorsTypes[1].inputType"
          :descriptors="definitionsDescriptorsTypes[1].descriptors"
          :multi-input="definitionsDescriptorsTypes[1].multiInput"
          :value="
            ufs[selectedUF].ContornoDefinition[selectedCD].definition
              .descriptors.relationship
          "
          :label="definitionsDescriptorsTypes[1].name"
          @input-change="updateUFRelationshipDefinitionDescriptor($event)"
          @select-change="updateUFRelationshipDefinitionDescriptor($event)"
        ></descriptor-type>
      </div>
      <div v-if="selectedDescriptor === 1">
        <descriptor-type
          v-for="(descriptorType, indexDT) in contornoDescriptorsTypes"
          :key="indexDT"
          :type="descriptorType.inputType"
          :descriptors="descriptorType.descriptors"
          :multi-input="descriptorType.multiInput"
          :value="
            ufs[selectedUF].ContornoDefinition[selectedCD].contorno.descriptors
          "
          :label="descriptorType.name"
          @input-change="updateUFContornoDescriptor($event)"
          @select-change="updateUFContornoDescriptor($event)"
        ></descriptor-type>
      </div>
    </div>
  </div>

  <!-- FOOTER -->
  <br />
  <tabs-footer
    :first-tab="false"
    :last-tab="false"
    @go-next-tab="goNextTab"
    @go-preview-tab="goPreviewTab"
    @go-dictionaries="goDictionaries"
    @save="save"
  ></tabs-footer>
</template>
<script lang="ts">
import { PlusSquareFilled, MinusCircleFilled } from '@ant-design/icons-vue';
import TabsHeader from './TabsHeader/TabsHeader.vue';
import TabsFooterMixin from './TabsFooter/TabsFooter.mixin.js';
import TabsFooter from './TabsFooter/TabsFooter.vue';
import AddDescriptor from './AddDescriptor/AddDescriptor.vue';
import DescriptorType from './DescriptorType/DescriptorType.vue';

import { defineComponent, reactive, ref } from 'vue';
export default defineComponent({
  components: {
    PlusSquareFilled,
    MinusCircleFilled,
    'tab-header': TabsHeader,
    'tabs-footer': TabsFooter,
    'descriptor-type': DescriptorType,
    'add-descriptor': AddDescriptor,
  },
  mixins: [TabsFooterMixin],
  props: {
    ufs: {
      type: [Object],
    },
    ufsUbications: {
      type: [String],
    },
    definitionsDescriptorsTypes: {
      type: [Object],
    },
    contornoDescriptorsTypes: {
      type: [Object],
    },
  },
  emits: [
    'update-uf-type-definition-descriptor',
    'update-uf-relationship-definition-descriptor',
    'update-uf-contorno-descriptor',
    'add-contorno-definition',
    'update-uf-definition',
    'update-uf-contorno',
    'remove-contorno-definition',
  ],
  setup(props, context) {
    const selectedUF = ref(-1);
    const selectedCD = ref(-1);
    const selectedDescriptor = ref(-1);
    // const allDescriptorsTypes =
    //   props.definitionsDescriptorsTypes +
    //   props.contornoDescriptorsTypes;

    const updateUFTypeOfDefinitionDescriptor = (descriptor) => {
      console.log(descriptor);
      const update = {
        descriptor,
        selectedUF: selectedUF.value,
        selectedCD: selectedCD.value,
      };
      context.emit('update-uf-type-definition-descriptor', update);
    };
    const updateUFRelationshipDefinitionDescriptor = (descriptor) => {
      console.log(descriptor);
      const update = {
        descriptor,
        selectedUF: selectedUF.value,
        selectedCD: selectedCD.value,
      };
      context.emit('update-uf-relationship-definition-descriptor', update);
    };
    const updateUFContornoDescriptor = (descriptor) => {
      console.log(descriptor);
      const update = {
        descriptor,
        selectedUF: selectedUF.value,
        selectedCD: selectedCD.value,
      };
      context.emit('update-uf-contorno-descriptor', update);
    };

    const handleSelectDefinition = (indexUFS, indexCD) => {
      if (indexCD === selectedCD.value && indexUFS === selectedUF.value) {
        selectedUF.value = -1;
        selectedCD.value = -1;
      } else {
        selectedUF.value = indexUFS;
        selectedCD.value = indexCD;
      }
    };

    const addContornoDefinition = () => {
      context.emit('add-contorno-definition', selectedUF.value);
    };

    const updateUFDefinition = (value, indexUFS, indexCD) => {
      const update = {
        definition: value,
        selectedUF: indexUFS,
        selectedCD: indexCD,
      };
      context.emit('update-uf-definition', update);
    };

    const updateUFContorno = (value, indexUFS, indexCD) => {
      const update = {
        contorno: value,
        selectedUF: indexUFS,
        selectedCD: indexCD,
      };
      context.emit('update-uf-contorno', update);
    };

    const removeContornoDefinition = (indexUFS, indexCD) => {
      const update = {
        indexUFS,
        indexCD,
      };
      context.emit('remove-contorno-definition', update);
    };
    return {
      selectedUF,
      selectedCD,
      addContornoDefinition,
      selectedDescriptor,
      updateUFContornoDescriptor,
      updateUFTypeOfDefinitionDescriptor,
      updateUFRelationshipDefinitionDescriptor,
      handleSelectDefinition,
      updateUFDefinition,
      updateUFContorno,
      removeContornoDefinition,
    };
  },
});
</script>
