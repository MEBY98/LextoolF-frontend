<template>
  <div>
    <!-- BODY -->
    <div>
      <div>
        <div style="text-align: right">
          <add-descriptor
            :observation="observations[selectedObservation].name"
            :tab="3"
            :descriptors-types="
              observations[selectedObservation].descriptorsTypes
            "
          ></add-descriptor>
        </div>
        <a-select
          :value="selectedObservation"
          show-search
          placeholder="Seleccione un tipo"
          option-filter-prop="label"
          style="width: 250px"
          :filter-option="filterOption"
          @change="handleObservationChange"
        >
          <a-select-option
            v-for="(o, index) in observations"
            :key="o.name"
            :value="index"
          >
            {{ o.name }}
          </a-select-option>
        </a-select>
      </div>

      <br />
      <div>
        <tab-header></tab-header>
        <div v-if="selectedObservation !== -1">
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
              class="col-6 d-flex align-items-center align-middle"
            >
              <descriptor-type
                v-for="(descriptorType, indexDT) in observations[
                  selectedObservation
                ].descriptorsTypes"
                :key="indexDT"
                :type="descriptorType.inputType"
                :descriptors="descriptorType.descriptors"
                :multi-input="descriptorType.multiInput"
                :value="ufs[indexUFS].orderLemma[selectedObservation]"
                :label="descriptorType.name"
                @input-change="
                  updateUFDescriptor(
                    $event,
                    selectedObservation,
                    indexDT,
                    indexUFS
                  )
                "
                @select-change="
                  updateUFDescriptor(
                    $event,
                    selectedObservation,
                    indexDT,
                    indexUFS
                  )
                "
              ></descriptor-type>
            </td>
            <!-- </div> -->
          </tr>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

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
    observations: {
      type: [Object],
    },
    ufs: {
      type: [Object],
    },
    ufsUbications: {
      type: [String],
    },
  },
  emits: ['update-uf-descriptor'],
  setup(props, context) {
    const filterOption = (input: string, option: any) => {
      console.log('option:', option);
      return option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    const selectedObservation = ref(0);

    const handleObservationChange = (index) => {
      selectedObservation.value = index;
    };

    const updateUFDescriptor = (
      descriptor,
      selectedObservation,
      indexDT,
      indexUFS
    ) => {
      const update = { descriptor, selectedObservation, indexDT, indexUFS };
      context.emit('update-uf-descriptor', update);
    };
    return {
      filterOption,
      selectedObservation,
      handleObservationChange,
      updateUFDescriptor,
    };
  },
});
</script>
