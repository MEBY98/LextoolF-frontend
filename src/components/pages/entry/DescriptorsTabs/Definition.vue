<template>
  <div style="text-align: right">
    <tooltip-icon
      v-if="selectedCD !== -1"
      :icon="'PlusSquareFilled'"
      :text="'Definición'"
      :title="'Agregar definición'"
      @click="addContornoDefinition"
    ></tooltip-icon>
    <add-descriptor
      v-if="selectedDescriptor === 0 && selectedCD !== -1"
      :tab="4"
      :observation="'Definición'"
      :descriptors-types="$store.DefinitionDescriptorsTypes"
    ></add-descriptor>
    <add-descriptor
      v-if="selectedDescriptor === 1 && selectedCD !== -1"
      :tab="4"
      :observation="'Contorno'"
      :descriptors-types="$store.ContornoDescriptorsTypes"
    ></add-descriptor>
  </div>
  <br />
  <tr class="row w-100">
    <th :class="`col-${columnWidth[0]}`">
      <h6>Unidad fraseológica</h6>
    </th>
    <th :class="`col-${columnWidth[1]}`">
      <h6>Ubicación</h6>
    </th>
    <th :class="`col-${columnWidth[2]}`">
      <h6>Definición</h6>
    </th>
    <th :class="`col-${columnWidth[2]}`">
      <h6>Contorno definicional</h6>
    </th>
  </tr>

  <div v-for="(element, indexElement) in elements" :key="indexElement">
    <tr
      v-for="(cd, indexCD) in elements[indexElement].contornoDefinition"
      :key="indexCD"
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
        <div class="d-flex align-items-center align-middle">
          <a-checkbox
            class="mr-2"
            :checked="
              selectedElement === indexElement && selectedCD === indexCD
            "
            @change="handleSelectDefinition(indexElement, indexCD)"
          ></a-checkbox>
          <span v-html="elements[indexElement].element"></span>
        </div>
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
      <td
        v-if="
          (elementsUbications[indexElement] === 'lema' ||
            elementsUbications[indexElement] === 'sublema') &&
          $store.clasifications[elementsClasificationsIndexs[indexElement]]
            .clasification === 'UF'
        "
        :class="`col-${columnWidth[2]}`"
      >
        <a-input
          :value="elements[indexElement].contornoDefinition[indexCD].definition"
          style="width: 290px"
          @input="
            updateElementDefinition($event.target.value, indexElement, indexCD)
          "
        ></a-input>
      </td>
      <td
        v-if="
          (elementsUbications[indexElement] === 'lema' ||
            elementsUbications[indexElement] === 'sublema') &&
          $store.clasifications[elementsClasificationsIndexs[indexElement]]
            .clasification === 'UF'
        "
        :class="`col-${columnWidth[2]}`"
      >
        <a-input
          :value="elements[indexElement].contornoDefinition[indexCD].contorno"
          style="width: 290px; margin-right: 5px"
          @input="
            updateElementContorno($event.target.value, indexElement, indexCD)
          "
        ></a-input>
        <tooltip-icon
          v-if="elements[indexElement].contornoDefinition.length > 1"
          :icon="'MinusCircleFilled'"
          :text="''"
          :title="'Eliminar definición'"
          @click="removeContornoDefinition(indexElement, indexCD)"
        ></tooltip-icon>
      </td>
    </tr>
    <a-divider
      v-if="
        (elementsUbications[indexElement] === 'lema' ||
          elementsUbications[indexElement] === 'sublema') &&
        $store.clasifications[elementsClasificationsIndexs[indexElement]]
          .clasification === 'UF'
      "
    ></a-divider>
  </div>

  <transition name="no-mode-fade">
    <div
      v-if="selectedCD !== -1"
      class="container mt-3 border"
      style="width: 450px; border-radius: 10px; box-shadow: 5px 5px 5px #ccc"
    >
      <a-radio-group v-model:value="selectedDescriptor" class="m-3">
        <a-radio class="mr-5" :value="0">Definición</a-radio>
        <a-radio :value="1">Contorno definicional</a-radio>
      </a-radio-group>
      <div class="row w-100 m-3">
        <div v-if="selectedDescriptor === 0">
          <descriptor-type
            v-for="(descriptorType,
            indexDefinitionDT) in $store.DefinitionDescriptorsTypes"
            :key="indexDefinitionDT"
            :type="descriptorType.inputType"
            :descriptors="descriptorType.descriptors"
            :multi-input="descriptorType.multiInput"
            :value="
              elements[selectedElement].contornoDefinition[selectedCD][
                definitionAttributes[indexDefinitionDT]
              ]
            "
            :label="descriptorType.name"
            @input-change="
              updateElementDescriptor(
                $event,
                selectedElement,
                selectedCD,
                definitionAttributes[indexDefinitionDT]
              )
            "
            @select-change="
              updateElementDescriptor(
                $event,
                selectedElement,
                selectedCD,
                definitionAttributes[indexDefinitionDT]
              )
            "
          ></descriptor-type>
        </div>
        <div v-if="selectedDescriptor === 1">
          <descriptor-type
            v-for="(descriptorType,
            indexContornoDT) in $store.ContornoDescriptorsTypes"
            :key="indexContornoDT"
            :type="descriptorType.inputType"
            :descriptors="descriptorType.descriptors"
            :multi-input="descriptorType.multiInput"
            :value="
              elements[selectedElement].contornoDefinition[selectedCD][
                contornoAttributes[indexContornoDT]
              ]
            "
            :label="descriptorType.name"
            @input-change="
              updateElementDescriptor(
                $event,
                selectedElement,
                selectedCD,
                contornoAttributes[indexContornoDT]
              )
            "
            @select-change="
              updateElementDescriptor(
                $event,
                selectedElement,
                selectedCD,
                contornoAttributes[indexContornoDT]
              )
            "
          ></descriptor-type>
        </div>
      </div>
    </div>
  </transition>
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
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { PlusSquareFilled, MinusCircleFilled } from '@ant-design/icons-vue';
import TabsHeader from './TabsHeader/TabsHeader.vue';
import TabsFooter from './TabsFooter/TabsFooter.vue';
import AddDescriptor from './AddDescriptor/AddDescriptor.vue';
import TooltipIcon from '@/components/shared/TooltipIcon.vue';
import DescriptorType from './DescriptorType/DescriptorType.vue';
import UseTabFooter from './TabsFooter/UseTabFooter';
export default defineComponent({
  components: {
    PlusSquareFilled,
    MinusCircleFilled,
    'tab-header': TabsHeader,
    'tabs-footer': TabsFooter,
    'descriptor-type': DescriptorType,
    'add-descriptor': AddDescriptor,
    'tooltip-icon': TooltipIcon,
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
    'add-contorno-definition',
    'update-element-definition',
    'update-element-contorno',
    'remove-contorno-definition',
    'go-next-tab',
    'go-preview-tab',
    'go-entries',
    'save',
  ],
  setup(props, context) {
    const selectedElement = ref(-1);
    const selectedCD = ref(-1);
    const selectedDescriptor = ref(-1);
    const updateElementDescriptor = (
      descriptor,
      indexElement,
      indexCD,
      attribute
    ) => {
      const update = {
        descriptor,
        indexElement,
        indexCD,
        attribute,
      };
      context.emit('update-element-descriptor', update);
    };

    const handleSelectDefinition = (indexElement, indexCD) => {
      if (
        indexCD === selectedCD.value &&
        indexElement === selectedElement.value
      ) {
        selectedElement.value = -1;
        selectedCD.value = -1;
      } else {
        selectedElement.value = indexElement;
        selectedCD.value = indexCD;
      }
    };

    const addContornoDefinition = () => {
      context.emit('add-contorno-definition', selectedElement.value);
    };

    const updateElementDefinition = (value, indexElement, indexCD) => {
      const update = {
        definition: value,
        indexElement,
        indexCD,
      };
      context.emit('update-element-definition', update);
    };

    const updateElementContorno = (value, indexElement, indexCD) => {
      const update = {
        contorno: value,
        indexElement,
        indexCD,
      };
      context.emit('update-element-contorno', update);
    };

    const removeContornoDefinition = (indexElement, indexCD) => {
      const update = {
        indexElement,
        indexCD,
      };
      context.emit('remove-contorno-definition', update);
    };
    const { goNextTab, goPreviewTab, goEntries, save } = UseTabFooter(context);
    return {
      definitionAttributes: [
        'typeOfDefinition',
        'argumentalSchema',
        'relationship',
      ],
      contornoAttributes: [
        'typeOfContorno',
        'positionOfContorno',
        'formatOfContorno',
      ],
      selectedElement,
      selectedCD,
      addContornoDefinition,
      selectedDescriptor,
      updateElementDescriptor,
      handleSelectDefinition,
      updateElementDefinition,
      updateElementContorno,
      removeContornoDefinition,
      columnWidth: [2, 2, 4],
      goNextTab,
      goPreviewTab,
      goEntries,
      save,
    };
  },
});
</script>

<style scoped>
.no-mode-fade-enter-active,
.no-mode-fade-leave-active {
  transition: opacity 0.5s ease;
}

.no-mode-fade-enter-from,
.no-mode-fade-leave-to {
  opacity: 0;
}

.opacity {
  opacity: 0.3;
}
.opacity:hover {
  opacity: 0.8;
}
</style>
