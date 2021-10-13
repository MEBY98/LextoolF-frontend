<template>
  <div>
    <!-- HEADER -->
    <div style="text-align: right">
      <add-descriptor
        :tab="1"
        :descriptors-types="$store.GeneralDescriptionDescriptorsTypes"
      ></add-descriptor>
    </div>
    <br />
    <tab-header
      :descriptor-types="$store.GeneralDescriptionDescriptorsTypes"
      :column-width="columnWidth"
    ></tab-header>

    <!-- BODY -->
    <tr
      v-for="(element, indexElement) in elements"
      :key="indexElement"
      class="row w-100 d-inline-flex align-items-center justify-content-center"
    >
      <td
        v-if="
          $store.clasifications[elementsClasificationsIndexs[indexElement]]
            .clasification === 'UF'
        "
        :class="`col-${columnWidth[0]}`"
      >
        <span v-html="elements[indexElement].element"></span>
      </td>
      <td
        v-if="
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
        v-for="(attribute, indexAttribute) in elementAttributes"
        :key="attribute"
        :class="`col-${columnWidth[2]}`"
      >
        <td
          v-if="
            $store.clasifications[elementsClasificationsIndexs[indexElement]]
              .clasification === 'UF'
          "
        >
          <descriptor-type
            :type="
              $store.GeneralDescriptionDescriptorsTypes[indexAttribute]
                .inputType
            "
            :descriptors="
              $store.GeneralDescriptionDescriptorsTypes[indexAttribute]
                .descriptors
            "
            :value="elements[indexElement].generalDescription[attribute]"
            @input-change="
              updateElementDescriptor($event, indexElement, attribute)
            "
            @select-change="
              updateElementDescriptor($event, indexElement, attribute)
            "
          ></descriptor-type>
        </td>
      </div>
      <a-divider
        v-if="
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
import UseFetchAttributeFromObject from '@/utils/FetchAttributeFromObject/UseFetchAttributeFromObject';
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
    'go-next-tab',
    'go-preview-tab',
    'go-entries',
    'save',
    'update-element-descriptor',
  ],
  setup(props, context) {
    const { goNextTab, goPreviewTab, goEntries, save } = UseTabFooter(context);
    const { fetchAttributeFromObject } = UseFetchAttributeFromObject();
    const updateElementDescriptor = (value, indexElement, attribute) => {
      const update = {
        value,
        indexElement,
        attribute,
      };
      context.emit('update-element-descriptor', update);
    };
    return {
      columnWidth: [
        2,
        1,
        Math.floor(9 / store.GeneralDescriptionDescriptorsTypes.length),
      ],
      goNextTab,
      goPreviewTab,
      goEntries,
      save,
      elementAttributes: ['tipo', 'structure', 'conceptualDomain'],
      updateElementDescriptor,
      fetchAttributeFromObject,
    };
  },
});
</script>
