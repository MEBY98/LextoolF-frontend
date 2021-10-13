<template>
  <div>
    <!-- HEADER -->
    <div style="text-align: right">
      <add-descriptor
        :tab="1"
        :descriptors-types="$store.ExampleDescriptorsTypes"
      ></add-descriptor>
    </div>
    <br />
    <tab-header
      :descriptor-types="$store.ExampleDescriptorsTypes"
      :column-width="columnWidth"
    ></tab-header>

    <!-- BODY -->
    <tr
      v-for="(element, indexElement) in elements"
      :key="indexElement"
      class="row w-100 d-flex align-items-center align-middle"
    >
      <td
        v-if="
          (elementsUbications[indexElement] === 'lema' ||
            elementsUbications[indexElement] === 'sublema') &&
          $store.clasifications[elementsClasificationsIndexs[indexElement]]
            .clasification === 'UF'
        "
        :class="`col-${columnWidth[0]}`"
      >
        <span v-html="elements[indexElement].element"></span>
      </td>
      <td
        v-if="
          (elementsUbications[indexElement] === 'lema' ||
            elementsUbications[indexElement] === 'sublema') &&
          $store.clasifications[elementsClasificationsIndexs[indexElement]]
            .clasification === 'UF'
        "
        :class="`col-${columnWidth[1]}`"
      >
        <span>
          {{ elementsUbications[indexElement] }}
        </span>
      </td>
      <div
        v-for="(descriptorType, indexDT) in $store.ExampleDescriptorsTypes"
        :key="indexDT"
        :class="`col-${columnWidth[2]}`"
      >
        <td
          v-if="
            (elementsUbications[indexElement] === 'lema' ||
              elementsUbications[indexElement] === 'sublema') &&
            $store.clasifications[elementsClasificationsIndexs[indexElement]]
              .clasification === 'UF'
          "
        >
          <descriptor-type
            :style="{ width: '150px' }"
            :type="descriptorType.inputType"
            :descriptors="descriptorType.descriptors"
            :value="elements[indexElement].example[attributes[indexDT]]"
            :multi-input="descriptorType.multiInput"
            @input-change="
              updateElementDescriptor($event, indexElement, attributes[indexDT])
            "
            @select-change="
              updateElementDescriptor($event, indexElement, attributes[indexDT])
            "
          ></descriptor-type>
        </td>
      </div>
      <a-divider
        v-if="
          (elementsUbications[indexElement] === 'lema' ||
            elementsUbications[indexElement] === 'sublema') &&
          $store.clasifications[elementsClasificationsIndexs[indexElement]]
            .clasification === 'UF'
        "
      ></a-divider>
    </tr>

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
import { defineComponent } from 'vue';
import TabsHeader from './TabsHeader/TabsHeader.vue';
import TabsFooter from './TabsFooter/TabsFooter.vue';
import AddDescriptor from './AddDescriptor/AddDescriptor.vue';
import DescriptorType from './DescriptorType/DescriptorType.vue';
import UseTabFooter from './TabsFooter/UseTabFooter';
import { store } from '@/store/store';
export default defineComponent({
  components: {
    'tab-header': TabsHeader,
    'tabs-footer': TabsFooter,
    'descriptor-type': DescriptorType,
    'add-descriptor': AddDescriptor,
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
    'update-element-descriptor',
    'go-next-tab',
    'go-preview-tab',
    'go-entries',
    'save',
  ],
  setup(props, context) {
    const updateElementDescriptor = (descriptor, indexElement, attribute) => {
      const update = { descriptor, indexElement, attribute };
      context.emit('update-element-descriptor', update);
    };
    const { goNextTab, goPreviewTab, goEntries, save } = UseTabFooter(context);
    const descriptorW = Math.floor(8 / store.ExampleDescriptorsTypes.length);
    return {
      attributes: [
        'anotation',
        'typeOfExample',
        'formatOfExample',
        'functionOfExample',
      ],
      updateElementDescriptor,
      columnWidth: [2, 2, descriptorW],
      goNextTab,
      goPreviewTab,
      goEntries,
      save,
    };
  },
});
</script>
