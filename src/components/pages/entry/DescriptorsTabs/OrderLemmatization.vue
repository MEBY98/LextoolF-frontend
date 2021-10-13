<template>
  <div>
    <!-- BODY -->
    <div>
      <div>
        <div style="text-align: right">
          <add-descriptor
            :observation="
              $store.OrderLemmaObservations[selectedObservation].name
            "
            :tab="2"
            :descriptors-types="
              $store.OrderLemmaObservations[selectedObservation]
                .descriptorsTypes
            "
          ></add-descriptor>
        </div>
        <span class="ml-3 mr-3" style="font-weight: 500">Observación</span>
        <general-select
          :display-attribute="'name'"
          :elements="$store.OrderLemmaObservations"
          :index-value="true"
          :key-value="'name'"
          :multiple="false"
          :placeholder="'Seleccione'"
          :value="selectedObservation"
          :style="{ width: '240px' }"
          @change="handleObservationChange"
        ></general-select>
      </div>
      <br />
      <div>
        <tab-header
          :descriptor-types="
            $store.OrderLemmaObservations[selectedObservation].descriptorsTypes
          "
          :column-width="columnWidth"
        ></tab-header>
        <div v-if="selectedObservation !== -1">
          <tr
            v-for="(element, indexElement) in elements"
            :key="indexElement"
            class="row w-100 d-flex align-items-center align-middle"
          >
            <td
              v-if="
                (elementsUbications[indexElement] === 'lema' ||
                  elementsUbications[indexElement] === 'sublema') &&
                $store.clasifications[
                  elementsClasificationsIndexs[indexElement]
                ].clasification === 'UF'
              "
              class="col-3"
            >
              <span v-html="elements[indexElement].element"></span>
            </td>
            <td
              v-if="
                (elementsUbications[indexElement] === 'lema' ||
                  elementsUbications[indexElement] === 'sublema') &&
                $store.clasifications[
                  elementsClasificationsIndexs[indexElement]
                ].clasification === 'UF'
              "
              class="col-3"
            >
              <span>
                {{ elementsUbications[indexElement] }}
              </span>
            </td>
            <td
              v-if="
                (elementsUbications[indexElement] === 'lema' ||
                  elementsUbications[indexElement] === 'sublema') &&
                $store.clasifications[
                  elementsClasificationsIndexs[indexElement]
                ].clasification === 'UF'
              "
              class="col-6"
            >
              <descriptor-type
                v-for="(descriptorType, indexDT) in $store
                  .OrderLemmaObservations[selectedObservation].descriptorsTypes"
                :key="indexDT"
                :type="descriptorType.inputType"
                :descriptors="descriptorType.descriptors"
                :multi-input="descriptorType.multiInput"
                :value="
                  elements[indexElement].orderLemma[
                    attributes[selectedObservation]
                  ]
                "
                @input-change="
                  updateElementDescriptor(
                    $event,
                    attributes[selectedObservation],
                    indexElement
                  )
                "
                @select-change="
                  updateElementDescriptor(
                    $event,
                    attributes[selectedObservation],
                    indexElement
                  )
                "
              ></descriptor-type>
            </td>
            <!-- </div> -->
            <a-divider
              v-if="
                (elementsUbications[indexElement] === 'lema' ||
                  elementsUbications[indexElement] === 'sublema') &&
                $store.clasifications[
                  elementsClasificationsIndexs[indexElement]
                ].clasification === 'UF'
              "
            ></a-divider>
          </tr>
        </div>
      </div>
    </div>
    <!-- FOOTER -->
    <br />
    <tabs-footer
      :first-tab="false"
      :last-tab="false"
      :disable-next-button="disableNextButton"
      :disable-preview-button="disablePreviewButton"
      @go-next-tab="goNextTab"
      @go-preview-tab="goPreviewTab"
      @go-entries="goEntries"
      @save="save"
    ></tabs-footer>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import TabsHeader from './TabsHeader/TabsHeader.vue';
import TabsFooter from './TabsFooter/TabsFooter.vue';
import AddDescriptor from './AddDescriptor/AddDescriptor.vue';
import DescriptorType from './DescriptorType/DescriptorType.vue';
import Select from '@/components/shared/Select.vue';
import UseTabFooter from './TabsFooter/UseTabFooter';
import { store } from '@/store/store';

export default defineComponent({
  components: {
    'tab-header': TabsHeader,
    'tabs-footer': TabsFooter,
    'descriptor-type': DescriptorType,
    'add-descriptor': AddDescriptor,
    'general-select': Select,
  },
  props: {
    elements: {
      type: Array,
    },
    elementsUbications: {
      type: Array,
    },
    elementsClasificationsIndexs: {
      type: Array,
    },
    disableNextButton: {
      type: Boolean,
      default: () => false,
    },
    disablePreviewButton: {
      type: Boolean,
      default: () => false,
    },
  },
  emits: [
    'go-next-tab',
    'go-preview-tab',
    'go-entries',
    'save',
    'update-element-descriptor',
  ],
  setup(props, context) {
    const selectedObservation = ref(0);
    const handleObservationChange = (index) => {
      selectedObservation.value = index;
    };
    const { goNextTab, goPreviewTab, goEntries, save } = UseTabFooter(context);
    const updateElementDescriptor = (descriptor, attribute, indexElement) => {
      const update = { descriptor, attribute, indexElement };
      context.emit('update-element-descriptor', update);
    };
    const columnWidth = computed(() => {
      const descriptorW = Math.floor(
        6 /
          store.OrderLemmaObservations[selectedObservation.value]
            .descriptorsTypes.length
      );
      return [3, 3, descriptorW];
    });
    return {
      attributes: [
        'order',
        'criteriaOfLematization',
        'formalStructure',
        'ubicationOfContorno',
        'typeOfVariant',
        'formatOfVariant',
        'tipographyOfVariant',
      ],
      selectedObservation,
      handleObservationChange,
      updateElementDescriptor,
      columnWidth,
      goNextTab,
      goPreviewTab,
      goEntries,
      save,
    };
  },
});
</script>
