<template>
  <div style="text-align: right">
    <tooltip-icon
      :icon="'PlusSquareFilled'"
      :text="'Ubicación'"
      :title="'Crear nueva ubicación'"
      @click="showNewUbicationModalMethod"
    ></tooltip-icon>
    <tooltip-icon
      :icon="'PlusSquareFilled'"
      :text="'Clasificación'"
      :title="'Crear nueva clasificación'"
      @click="showNewClasificationModalMethod"
    ></tooltip-icon>
    <tooltip-icon
      :icon="'PlusSquareFilled'"
      :text="'Elemento'"
      :title="'Extraer elemento'"
      @click="showUbicationsModalMethod"
    ></tooltip-icon>
  </div>

  <br />
  <tr class="row w-100">
    <th class="col-3">
      <h6>Ubicación</h6>
    </th>
    <th class="col-5">
      <h6>Anotación del lexicógrafo</h6>
    </th>
    <th class="col-4">
      <h6>Clasificación</h6>
    </th>
  </tr>
  <tr
    v-for="(element, indexElement) in elements"
    :key="indexElement"
    class="row w-100 d-flex align-items-center justify-center"
  >
    <td class="col-3">
      <span>
        {{ elementsUbications[indexElement] }}
      </span>
    </td>
    <td class="col-5">
      <ck-editor-component
        :value="elements[indexElement].element"
        @input="changeElement($event, indexElement)"
      ></ck-editor-component>
    </td>
    <td class="col-4">
      <general-select
        :elements="$store.clasifications"
        :display-attribute="'clasification'"
        :key-value="'clasification'"
        :placeholder="'Clasifique'"
        :multiple="false"
        :index-value="true"
        :value="elementsClasificationsIndexs[indexElement]"
        @change="clasificateElement($event, indexElement)"
      ></general-select>
      <div class="d-inline opacity">
        <tooltip-icon
          class="opacity"
          :icon="'MinusCircleFilled'"
          :text="''"
          :style-icon="{
            fontSize: '20px',
            color: 'red',
          }"
          :title="'Eliminar elemento'"
          @click="removeElement(indexElement)"
        ></tooltip-icon>
      </div>
    </td>
    <a-divider></a-divider>
  </tr>

  <!-- FOOTER -->
  <br />
  <tabs-footer
    :first-tab="true"
    :last-tab="false"
    :disable-next-button="disableNextButton"
    :disable-preview-button="disablePreviewButton"
    @go-next-tab="goNextTab"
    @go-preview-tab="goPreviewTab"
    @go-entries="goEntries"
    @save="save"
  ></tabs-footer>
  <ubications-modal
    :visible="showUbicationsModal"
    :has-lemma="hasLemma"
    @add-element="addElement"
    @close-modal="closeUbicationsModalMethod"
  ></ubications-modal>
  <new-ubication-modal
    :visible="showNewUbicationModal"
    @close-modal="closeNewUbicationModalMethod"
  ></new-ubication-modal>
  <new-clasification-modal
    :visible="showNewClasificationModal"
    @close-modal="closeNewClasificationModalMethod"
  ></new-clasification-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TooltipIcon from '@/components/shared/TooltipIcon.vue';
import UbicationsModal from './UbicationsModal/UbicationsModal.vue';
import NewUbicationModal from '../../ubication/NewUbicationModal.vue';
import NewClasificationModal from '../../clasification/NewClasificationModal.vue';
import Select from '@/components/shared/Select.vue';
import TabsFooter from './TabsFooter/TabsFooter.vue';
import UseUbicationsModal from './UbicationsModal/UseUbicationsModal';
import UseNewUbicationModal from '../../ubication/UseNewUbicationModal';
import UseNewClasificationModal from '../../clasification/UseNewClasificationModal';
import UseTabFooter from './TabsFooter/UseTabFooter';
import CKEditorComponentVue from '../HtmlEditor/CKEditorComponent.vue';
export default defineComponent({
  components: {
    'ubications-modal': UbicationsModal,
    'new-ubication-modal': NewUbicationModal,
    'new-clasification-modal': NewClasificationModal,
    'general-select': Select,
    'tabs-footer': TabsFooter,
    'tooltip-icon': TooltipIcon,
    'ck-editor-component': CKEditorComponentVue,
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
    hasLemma: {
      type: Boolean,
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
    'add-element',
    'change-element',
    'remove-element',
    'clasificate-element',
    'go-next-tab',
    'go-preview-tab',
    'save',
    'go-entries',
  ],
  setup(props, context) {
    const addElement = (ubication) => {
      context.emit('add-element', ubication);
      closeUbicationsModalMethod();
    };
    const changeElement = (element: string, index: number) => {
      const update = {
        element,
        index,
      };
      context.emit('change-element', update);
    };
    const removeElement = (index) => {
      context.emit('remove-element', index);
    };
    const clasificateElement = (index, indexElement) => {
      const update = {
        index,
        indexElement,
      };
      context.emit('clasificate-element', update);
    };
    const {
      showUbicationsModal,
      showUbicationsModalMethod,
      closeUbicationsModalMethod,
    } = UseUbicationsModal();
    const {
      showNewUbicationModal,
      showNewUbicationModalMethod,
      closeNewUbicationModalMethod,
    } = UseNewUbicationModal();
    const {
      showNewClasificationModal,
      showNewClasificationModalMethod,
      closeNewClasificationModalMethod,
    } = UseNewClasificationModal();
    const { goNextTab, goPreviewTab, goEntries, save } = UseTabFooter(context);
    return {
      showUbicationsModal,
      closeUbicationsModalMethod,
      showUbicationsModalMethod,
      showNewUbicationModal,
      showNewUbicationModalMethod,
      closeNewUbicationModalMethod,
      showNewClasificationModal,
      showNewClasificationModalMethod,
      closeNewClasificationModalMethod,
      goNextTab,
      goPreviewTab,
      goEntries,
      save,
      addElement,
      changeElement,
      removeElement,
      clasificateElement,
    };
  },
});
</script>
<style scoped>
.opacity {
  opacity: 0.5;
}
.opacity:hover {
  opacity: 0.8;
}
</style>
