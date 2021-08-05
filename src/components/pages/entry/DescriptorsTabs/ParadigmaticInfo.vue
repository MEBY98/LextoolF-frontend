<template>
  <div>
    <!-- HEADER -->
    <div style="text-align: right">
      <add-descriptor
        :tab="6"
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
          ufsUbications[indexUFS] === 'sinónimo' ||
          ufsUbications[indexUFS] === 'antónimo'
        "
        class="col-3 d-flex align-items-center"
      >
        <span v-if="ufs[indexUFS].UF" style="font-weight: 500">
          {{ ufs[indexUFS].UF }}
        </span>
      </td>
      <td
        v-if="
          ufsUbications[indexUFS] === 'sinónimo' ||
          ufsUbications[indexUFS] === 'antónimo'
        "
        class="col-3 d-flex align-items-center align-middle"
      >
        <span v-if="ufs[indexUFS].UF" style="font-weight: 500">
          {{ ufsUbications[indexUFS] }}
        </span>
      </td>
      <td
        v-if="
          ufsUbications[indexUFS] === 'sinónimo' ||
          ufsUbications[indexUFS] === 'antónimo'
        "
        class="d-table-cell"
      >
        <descriptor-type
          v-for="(descriptorType, indexDT) in descriptorsTypes"
          :key="indexDT"
          :type="descriptorType.inputType"
          :descriptors="descriptorType.descriptors"
          :value="ufs[indexUFS].paradigmaticInfo[indexDT]"
          :label="descriptorType.name"
          :multi-input="descriptorType.multiInput"
          @input-change="updateUFDescriptor($event, indexDT, indexUFS)"
          @select-change="updateUFDescriptor($event, indexDT, indexUFS)"
        ></descriptor-type>
      </td>
    </tr>

    <!-- FOOTER -->
    <br />
    <tabs-footer
      :first-tab="false"
      :last-tab="true"
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
  emits: ['update-uf-descriptor'],
  setup(props, context) {
    const updateUFDescriptor = (descriptor, indexDT, indexUFS) => {
      const update = { descriptor, indexDT, indexUFS };
      context.emit('update-uf-descriptor', update);
    };

    return {
      updateUFDescriptor,
    };
  },
});
</script>
