<template>
  <div>
    <a-table
      :data-source="studies"
      :columns="columns"
      :row-key="(record) => record.id"
      bordered
    >
      <template #title>
        <tooltip-icon
          title="Crear nuevo estudio"
          icon="PlusOutlined"
          text="Estudio"
          @click="goToNewStudy"
        ></tooltip-icon>
        <tooltip-icon
          title="Gestionar diccionarios"
          icon="BookOutlined"
          text="Diccionarios"
          @click="goToDictionariesInfo"
        ></tooltip-icon>
        <tooltip-icon
          title="Gestionar autores"
          icon="TeamOutlined"
          text="Autores"
          @click="goToAuthors"
        ></tooltip-icon>
      </template>
      <template #operation="{ record }">
        <tooltip-icon
          title="Seleccionar estudio"
          icon="CarryOutFilled"
          @click="goToEntries(record)"
        ></tooltip-icon>
        <tooltip-icon
          title="Detalles del estudio"
          icon="EyeFilled"
          @click="showStudyDetailsModalMethod(record)"
        ></tooltip-icon>
        <tooltip-icon
          title="Editar estudio"
          icon="EditFilled"
          @click="goToEditStudy(record.id)"
        ></tooltip-icon>
        <tooltip-icon
          title="Exportar estudio"
          icon="FileExcelFilled"
          @click="downloadExcel(record.id)"
        ></tooltip-icon>
        <a-popconfirm
          title="¿Seguro(a) que desea eliminar el estudio?"
          @confirm="deleteStudy(record.id)"
        >
          <tooltip-icon
            v-if="record.dictionaries.length === 0"
            title="Eliminar estudio"
            icon="DeleteFilled"
            :style-icon="{
              fontSize: '25px',
              color: 'red',
              marginBottom: '5px',
              marginLeft: '10px',
            }"
          ></tooltip-icon>
        </a-popconfirm>
      </template>
    </a-table>
    <study-details-modal
      :visible="showStudyDetailsModal"
      :selected-study="selectedStudy"
      @close-modal="closeStudyDetailsModalMethod"
    ></study-details-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue';
import { Study as StudyModel } from '@/graphql/modules/study/model.ts';
import { FraseologicStudy } from '@/models/FraseologicStudy';
import TooltipIcon from '@/components/shared/TooltipIcon.vue';
import StudyDetailsModal from './StudyDetailsModal.vue';
import UseStudiesInitData from './UseStudiesInitData';
import UseStudyDetailsModal from './UseStudyDetailsModal';
import UseColumns from './UseColumns';
import UseRoutes from '@/router/UseRoutes';
import { store } from '@/store/store';
import { axiosClientFiles } from '@/plugins/axios';

export default defineComponent({
  components: {
    'tooltip-icon': TooltipIcon,
    'study-details-modal': StudyDetailsModal,
  },
  setup() {
    const { columns } = UseColumns();
    const selectedStudy: Ref<FraseologicStudy> = ref(new FraseologicStudy());
    const studies: Ref<FraseologicStudy[]> = ref(new Array<FraseologicStudy>());
    const { studiesInitData } = UseStudiesInitData(studies);
    onMounted(studiesInitData);
    const {
      showStudyDetailsModal,
      showStudyDetailsModalMethod,
      closeStudyDetailsModalMethod,
    } = UseStudyDetailsModal(selectedStudy);
    const {
      goToDictionariesInfo,
      goToNewStudy,
      goToAuthors,
      goToEditStudy,
      goToEntries,
    } = UseRoutes();
    const deleteStudy = async (id: string) => {
      store.layout.isLoading = true;
      store.layout.loadingTip = 'Eliminando estudio';
      await StudyModel.deleteStudyByID(id);
      let index = 0;
      let found = false;
      for (index; index < studies.value.length && !found; index++) {
        const element = studies.value[index];
        if (element.id === id) {
          studies.value = studies.value.filter((item) => item.id !== id);
          found = true;
        }
      }
      store.layout.isLoading = false;
      store.layout.loadingTip = '';
    };
    const downloadExcel = async (id: string) => {
      store.layout.isLoading = true;
      store.layout.loadingTip = 'Exportando estudio';
      const response = await axiosClientFiles.get('/generateStudy/' + id);
      let blob = await new Blob([response.data]);
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = window.URL.createObjectURL(blob);
      // eslint-disable-next-line prettier/prettier
      const fileName = response.headers["content-disposition"].match(
        /filename="(.*)"/
      )[1];
      store.layout.isLoading = false;
      store.layout.loadingTip = '';
      link.download = fileName;
      link.click();
      link.remove();
      // window.URL.revokeObjectURL(link.href);
    };
    return {
      studies,
      selectedStudy,
      studiesInitData,
      columns,
      showStudyDetailsModal,
      showStudyDetailsModalMethod,
      closeStudyDetailsModalMethod,
      goToNewStudy,
      goToDictionariesInfo,
      goToAuthors,
      goToEditStudy,
      goToEntries,
      deleteStudy,
      downloadExcel,
    };
  },
});
</script>
