<template>
  <div>
    <a-table
      :data-source="$store.authors"
      :columns="columns"
      :row-key="(record) => record.id"
      bordered
    >
      <template #title>
        <tooltip-icon
          title="Crear nuevo autor"
          icon="PlusOutlined"
          text="Autor"
          @click="showNewAuthorModalMethod"
        ></tooltip-icon>
        <tooltip-icon
          title="Gestionar estudios"
          icon="ReadOutlined"
          text="Estudios"
          @click="goToStudies"
        ></tooltip-icon>
        <tooltip-icon
          title="Gestionar diccionarios"
          icon="BookOutlined"
          text="Diccionarios"
          @click="goToDictionariesInfo"
        ></tooltip-icon>
      </template>
      <template #operation="{ record }">
        <tooltip-icon
          title="Editar autor"
          icon="EditFilled"
          @click="showEditAuthorModalMethod(record)"
        ></tooltip-icon>
      </template>
    </a-table>
    <new-author-modal
      :visible="showNewAuthorModal"
      @close-modal="closeNewAuthorModalMethod"
    ></new-author-modal>
    <edit-author-modal
      :visible="showEditAuthorModal"
      :selected-author="selectedAuthor"
      @close-modal="closeEditAuthorModalMethod"
    ></edit-author-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { Author } from '@/models/Author';
import TooltipIcon from '@/components/shared/TooltipIcon.vue';
import NewAuthorModal from './NewAuthorModal.vue';
import EditAuthorModal from './EditAuthorModal.vue';
import UseAuthorsInitData from './UseAuthorsInitData';
import UseNewAuthorModal from './UseNewAuthorModal';
import UseEditAuthorModal from './UseEditAuthorModal';
import UseColumns from './UseColumns';
import UseRoutes from '@/router/UseRoutes';
export default defineComponent({
  components: {
    'tooltip-icon': TooltipIcon,
    'new-author-modal': NewAuthorModal,
    'edit-author-modal': EditAuthorModal,
  },
  setup() {
    const selectedAuthor: Ref<Author> = ref(new Author());
    const { AuthorsInitData } = UseAuthorsInitData();
    onMounted(AuthorsInitData);
    const { columns } = UseColumns();
    const { goToStudies, goToDictionariesInfo } = UseRoutes();
    const {
      showNewAuthorModal,
      showNewAuthorModalMethod,
      closeNewAuthorModalMethod,
    } = UseNewAuthorModal();
    const {
      showEditAuthorModal,
      showEditAuthorModalMethod,
      closeEditAuthorModalMethod,
    } = UseEditAuthorModal(selectedAuthor);
    return {
      goToStudies,
      goToDictionariesInfo,
      columns,
      selectedAuthor,
      showNewAuthorModal,
      showNewAuthorModalMethod,
      closeNewAuthorModalMethod,
      showEditAuthorModal,
      showEditAuthorModalMethod,
      closeEditAuthorModalMethod,
    };
  },
});
</script>
