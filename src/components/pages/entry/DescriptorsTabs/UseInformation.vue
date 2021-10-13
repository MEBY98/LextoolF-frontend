<template>
  <div>
    <!-- BODY -->
    <div>
      <div>
        <div style="text-align: right">
          <add-descriptor
            :observation="
              $store.UseInformationObservations[selectedObservation].name
            "
            :tab="3"
            :descriptors-types="
              $store.UseInformationObservations[selectedObservation]
                .descriptorsTypes
            "
          ></add-descriptor>
        </div>
        <general-select
          :display-attribute="'name'"
          :elements="$store.UseInformationObservations"
          :index-value="true"
          :key-value="'name'"
          :multiple="false"
          :placeholder="'Seleccione'"
          :value="selectedObservation"
          @change="handleObservationChange"
        ></general-select>
      </div>
      <br />
      <div>
        <tab-header
          :descriptor-types="
            $store.UseInformationObservations[selectedObservation]
              .descriptorsTypes
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
              :class="`col-${columnWidth[0]}`"
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
              :class="`col-${columnWidth[1]}`"
            >
              <span>
                {{ elementsUbications[indexElement] }}
              </span>
            </td>
            <div
              v-for="(descriptorType, indexDT) in $store
                .UseInformationObservations[selectedObservation]
                .descriptorsTypes"
              :key="indexDT"
              :class="`col-${columnWidth[2]}`"
            >
              <td
                v-if="
                  (elementsUbications[indexElement] === 'lema' ||
                    elementsUbications[indexElement] === 'sublema') &&
                  $store.clasifications[
                    elementsClasificationsIndexs[indexElement]
                  ].clasification === 'UF'
                "
              >
                <descriptor-type
                  :style="{ width: '150px' }"
                  :type="descriptorType.inputType"
                  :descriptors="descriptorType.descriptors"
                  :multi-input="descriptorType.multiInput"
                  :value="
                    elements[indexElement].useInformation[selectedObservation][
                      attributes[indexDT]
                    ]
                  "
                  @input-change="
                    updateElementDescriptor(
                      $event,
                      selectedObservation,
                      attributes[indexDT],
                      indexElement
                    )
                  "
                  @select-change="
                    updateElementDescriptor(
                      $event,
                      selectedObservation,
                      attributes[indexDT],
                      indexElement
                    )
                  "
                ></descriptor-type>
              </td>
            </div>

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
import UseTabFooter from './TabsFooter/UseTabFooter';
import Select from '@/components/shared/Select.vue';
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
    'go-preview-tab',
    'go-next-tab',
    'save',
    'go-entries',
    'update-element-descriptor',
  ],
  setup(props, context) {
    const selectedObservation = ref(0);
    const handleObservationChange = (index) => {
      selectedObservation.value = index;
    };
    const updateElementDescriptor = (
      descriptor,
      selectedObservation,
      attribute,
      indexElement
    ) => {
      const update = {
        descriptor,
        selectedObservation,
        attribute,
        indexElement,
      };

      console.log('update', update);
      context.emit('update-element-descriptor', update);
    };
    const columnWidth = computed(() => {
      const descriptorW = Math.floor(
        8 /
          store.UseInformationObservations[selectedObservation.value]
            .descriptorsTypes.length
      );
      return [2, 2, descriptorW];
    });
    const { goNextTab, goPreviewTab, goEntries, save } = UseTabFooter(context);
    return {
      attributes: ['anotation', 'position', 'format', 'tipography'],
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
