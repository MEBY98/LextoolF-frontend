<template>
  <div>
    <!-- HEADER -->
    <div style="text-align: right">
      <add-descriptor
        :tab="1"
        :descriptors-types="descriptorsTypes"
      ></add-descriptor>
    </div>
    <br />
    <tab-header></tab-header>

    <!-- BODY -->
    <tr
      v-for="(element, indexUFS) in ufs"
      :key="indexUFS"
      class="row w-100 align-middle"
    >
      <td
        v-if="
          ufsUbications[indexUFS] === 'Lema' ||
          ufsUbications[indexUFS] === 'Sublema'
        "
        class="col-3 d-flex align-items-center"
      >
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
        class="d-table-cell"
      >
        <descriptor-type
          :type="descriptorsTypes[0].inputType"
          :descriptors="descriptorsTypes[0].descriptors"
          :value="ufs[indexUFS].example.anotation"
          :label="descriptorsTypes[0].name"
          :multi-input="descriptorsTypes[0].multiInput"
          @input-change="updateUFAnotationDescriptor($event, indexUFS)"
          @select-change="updateUFAnotationDescriptor($event, indexUFS)"
        ></descriptor-type>
        <descriptor-type
          :type="descriptorsTypes[1].inputType"
          :descriptors="descriptorsTypes[1].descriptors"
          :value="ufs[indexUFS].example.typeOfExample"
          :label="descriptorsTypes[1].name"
          :multi-input="descriptorsTypes[1].multiInput"
          @input-change="updateUFTypeOfExampleDescriptor($event, indexUFS)"
          @select-change="updateUFTypeOfExampleDescriptor($event, indexUFS)"
        ></descriptor-type>
        <descriptor-type
          :type="descriptorsTypes[2].inputType"
          :descriptors="descriptorsTypes[2].descriptors"
          :value="ufs[indexUFS].example.formatOfExample"
          :label="descriptorsTypes[2].name"
          :multi-input="descriptorsTypes[2].multiInput"
          @input-change="updateUFFormatOfExampleDescriptor($event, indexUFS)"
          @select-change="updateUFFormatOfExampleDescriptor($event, indexUFS)"
        ></descriptor-type>
        <descriptor-type
          :type="descriptorsTypes[3].inputType"
          :descriptors="descriptorsTypes[3].descriptors"
          :value="ufs[indexUFS].example.functionOfExample"
          :label="descriptorsTypes[3].name"
          :multi-input="descriptorsTypes[3].multiInput"
          @input-change="updateUFFunctionOfExampleDescriptor($event, indexUFS)"
          @select-change="updateUFFunctionOfExampleDescriptor($event, indexUFS)"
        ></descriptor-type>
      </td>
    </tr>

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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import TabsHeader from './TabsHeader/TabsHeader.vue';
import TabsFooterMixin from './TabsFooter/TabsFooter.mixin.js';
import TabsFooter from './TabsFooter/TabsFooter.vue';
import AddDescriptor from './AddDescriptor/AddDescriptor.vue';
import DescriptorType from './DescriptorType/DescriptorType.vue';

export default defineComponent({
  components: {
    'tab-header': TabsHeader,
    'tabs-footer': TabsFooter,
    'descriptor-type': DescriptorType,
    'add-descriptor': AddDescriptor,
  },
  mixins: [TabsFooterMixin],
  props: {
    descriptorsTypes: {
      type: [Object],
    },
    ufs: {
      type: [Object],
    },
    ufsUbications: {
      type: [Object],
    },
  },
  emits: [
    'update-uf-anotation-descriptor',
    'update-uf-type-descriptor',
    'update-uf-format-descriptor',
    'update-uf-function-descriptor',
  ],
  setup(props, context) {
    const updateUFAnotationDescriptor = (descriptor, indexUFS) => {
      const update = { descriptor, indexUFS };
      context.emit('update-uf-anotation-descriptor', update);
    };
    const updateUFTypeOfExampleDescriptor = (descriptor, indexUFS) => {
      const update = { descriptor, indexUFS };
      context.emit('update-uf-type-descriptor', update);
    };
    const updateUFFormatOfExampleDescriptor = (descriptor, indexUFS) => {
      const update = { descriptor, indexUFS };
      context.emit('update-uf-format-descriptor', update);
    };
    const updateUFFunctionOfExampleDescriptor = (descriptor, indexUFS) => {
      const update = { descriptor, indexUFS };
      context.emit('update-uf-function-descriptor', update);
    };

    return {
      updateUFAnotationDescriptor,
      updateUFTypeOfExampleDescriptor,
      updateUFFormatOfExampleDescriptor,
      updateUFFunctionOfExampleDescriptor,
    };
  },
});
</script>
