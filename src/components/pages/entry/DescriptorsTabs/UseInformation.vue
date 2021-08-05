<template>
  <div>
    <!-- BODY -->
    <div>
      <div>
        <div style="text-align: right">
          <add-descriptor
            :observation="observations[selectedObservation].name"
            :tab="2"
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
              class="d-table-cell"
            >
              <descriptor-type
                :type="
                  observations[selectedObservation].descriptorsTypes[0]
                    .inputType
                "
                :multi-input="
                  observations[selectedObservation].descriptorsTypes[0]
                    .multiInput
                "
                :descriptors="
                  observations[selectedObservation].descriptorsTypes[0]
                    .descriptors
                "
                :value="
                  ufs[indexUFS].useInformation[selectedObservation].anotation
                "
                :label="
                  observations[selectedObservation].descriptorsTypes[0].name
                "
                @input-change="
                  updateUFAnotationUseInformationDescriptor(
                    $event,
                    selectedObservation,
                    indexUFS
                  )
                "
                @select-change="
                  updateUFAnotationUseInformationDescriptor(
                    $event,
                    selectedObservation,
                    indexUFS
                  )
                "
              ></descriptor-type>
              <descriptor-type
                :type="
                  observations[selectedObservation].descriptorsTypes[1]
                    .inputType
                "
                :multi-input="
                  observations[selectedObservation].descriptorsTypes[1]
                    .multiInput
                "
                :descriptors="
                  observations[selectedObservation].descriptorsTypes[1]
                    .descriptors
                "
                :value="
                  ufs[indexUFS].useInformation[selectedObservation]
                    .descriptors[0]
                "
                :label="
                  observations[selectedObservation].descriptorsTypes[1].name
                "
                @input-change="
                  updateUFD1UseInformationDescriptor(
                    $event,
                    selectedObservation,
                    indexUFS
                  )
                "
                @select-change="
                  updateUFD1UseInformationDescriptor(
                    $event,
                    selectedObservation,
                    indexUFS
                  )
                "
              ></descriptor-type>
              <descriptor-type
                :type="
                  observations[selectedObservation].descriptorsTypes[2]
                    .inputType
                "
                :multi-input="
                  observations[selectedObservation].descriptorsTypes[2]
                    .multiInput
                "
                :descriptors="
                  observations[selectedObservation].descriptorsTypes[2]
                    .descriptors
                "
                :value="
                  ufs[indexUFS].useInformation[selectedObservation]
                    .descriptors[1]
                "
                :label="
                  observations[selectedObservation].descriptorsTypes[2].name
                "
                @input-change="
                  updateUFD2UseInformationDescriptor(
                    $event,
                    selectedObservation,
                    indexUFS
                  )
                "
                @select-change="
                  updateUFD2UseInformationDescriptor(
                    $event,
                    selectedObservation,
                    indexUFS
                  )
                "
              ></descriptor-type>
              <descriptor-type
                :type="
                  observations[selectedObservation].descriptorsTypes[3]
                    .inputType
                "
                :multi-input="
                  observations[selectedObservation].descriptorsTypes[3]
                    .multiInput
                "
                :descriptors="
                  observations[selectedObservation].descriptorsTypes[3]
                    .descriptors
                "
                :value="
                  ufs[indexUFS].useInformation[selectedObservation]
                    .descriptors[2]
                "
                :label="
                  observations[selectedObservation].descriptorsTypes[3].name
                "
                @input-change="
                  updateUFD3UseInformationDescriptor(
                    $event,
                    selectedObservation,
                    indexUFS
                  )
                "
                @select-change="
                  updateUFD3UseInformationDescriptor(
                    $event,
                    selectedObservation,
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
  emits: [
    'update-uf-anotation-descriptor',
    'update-uf-d1-descriptor',
    'update-uf-d2-descriptor',
    'update-uf-d3-descriptor',
  ],
  setup(props, context) {
    const filterOption = (input: string, option: any) => {
      console.log('option:', option);
      return option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    const selectedObservation = ref(0);

    const handleObservationChange = (index) => {
      selectedObservation.value = index;
    };

    const updateUFAnotationUseInformationDescriptor = (
      descriptor,
      selectedObservation,
      indexUFS
    ) => {
      const update = { descriptor, selectedObservation, indexUFS };
      context.emit('update-uf-anotation-descriptor', update);
    };
    const updateUFD1UseInformationDescriptor = (
      descriptor,
      selectedObservation,
      indexUFS
    ) => {
      const update = { descriptor, selectedObservation, indexUFS };
      context.emit('update-uf-d1-descriptor', update);
    };
    const updateUFD2UseInformationDescriptor = (
      descriptor,
      selectedObservation,
      indexUFS
    ) => {
      const update = { descriptor, selectedObservation, indexUFS };
      context.emit('update-uf-d2-descriptor', update);
    };
    const updateUFD3UseInformationDescriptor = (
      descriptor,
      selectedObservation,
      indexUFS
    ) => {
      const update = { descriptor, selectedObservation, indexUFS };
      context.emit('update-uf-d3-descriptor', update);
    };
    return {
      filterOption,
      selectedObservation,
      handleObservationChange,
      updateUFAnotationUseInformationDescriptor,
      updateUFD1UseInformationDescriptor,
      updateUFD2UseInformationDescriptor,
      updateUFD3UseInformationDescriptor,
    };
  },
});
</script>
