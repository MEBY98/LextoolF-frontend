<template>
  <h2>Estudios Fraseologicos</h2>
  <br />
  <a-tooltip title="Crear nuevo estudio fraseologico" placement="right">
    <PlusSquareFilled
      :style="{ fontSize: '25px', color: '#08c', margin: '5px' }"
      @click="onAdd"
    />
  </a-tooltip>
  <a-table
    :data-source="studies"
    :columns="columns"
    :row-key="(record) => record.id"
    bordered
  >
    <template #period="{ record }">
      <a :style="{ color: 'black' }">{{ record.period }}</a>
    </template>
    <template #name="{ record }">
      <span>{{ record.name }}</span>
    </template>
    <template #operation="{ record }">
      <a-tooltip
        title="Seleccionar del estudio fraseologico"
        placement="bottom"
      >
        <a @click="selectStudyToWork(record)">
          <CarryOutFilled
            :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
          />
        </a>
      </a-tooltip>
      <a-tooltip title="Detalles del estudio fraseologico" placement="bottom">
        <a @click="showDetailsModalMethod(record)">
          <EyeFilled
            :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
          />
        </a>
      </a-tooltip>

      <a-tooltip title="Editar del estudio fraseologico" placement="bottom">
        <router-link :to="{ name: 'editStudy', params: { id: record.id } }">
          <a>
            <EditFilled
              :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
            />
          </a>
        </router-link>
      </a-tooltip>

      <a-popconfirm
        v-if="studies.length"
        title="Seguro de Eliminar?"
        @confirm="deleteStudy(record.id)"
      >
        <a-tooltip title="Eliminar del estudio fraseologico" placement="bottom">
          <a>
            <DeleteFilled
              :style="{ fontSize: '20px', color: 'red', margin: '5px' }"
            />
          </a>
        </a-tooltip>
      </a-popconfirm>
    </template>
  </a-table>
  <study-details-modal
    v-model:visible="showDetailsModal"
    :selected-study="selectedStudy"
  ></study-details-modal>
</template>
<script lang="ts">
import {
  EyeFilled,
  EditFilled,
  DeleteFilled,
  PlusSquareFilled,
  CarryOutFilled,
} from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
import { Study } from '@/graphql/modules/study/model.ts';
import Table from 'ant-design-vue/lib/table';
import StudyDetailsModal from './studyDetailsModal.vue';

export default defineComponent({
  components: {
    'a-table': Table,
    EyeFilled,
    EditFilled,
    DeleteFilled,
    CarryOutFilled,
    PlusSquareFilled,
    StudyDetailsModal,
  },
  data() {
    const showDetailsModal = false;
    const selectedStudy = {};
    return {
      selectedStudy,
      showDetailsModal,
      columns: [
        {
          title: 'Periodo',
          dataIndex: 'period',
          width: 200,
          sorter: true,
          slots: { customRender: 'period' },
        },
        {
          title: 'Nombre del Estudio',
          key: 'name',
          dataIndex: 'name',
          width: 300,
          slots: { customRender: 'name' },
        },
        {
          title: 'Operación',
          key: 'operation',
          width: 150,
          slots: { customRender: 'operation' },
        },
      ],
      studies: [],
    };
  },
  async mounted() {
    const { data } = await Study.getAllStudies();
    this.studies = data.getAllStudies;
  },
  methods: {
    async deleteStudy(id) {
      const deletedStudy = await Study.deleteStudyByID(id);
      let index = 0;
      let found = false;
      for (index; index < this.studies.length && !found; index++) {
        const element = this.studies[index];
        if (element.id === id) {
          found = true;
        }
      }
      this.studies = this.studies.filter((item) => item.id !== id);
    },
    onAdd() {
      this.$router.push('newStudy');
    },
    showDetailsModalMethod(study) {
      this.showDetailsModal = !this.showDetailsModal;
      this.selectedStudy = study;
      console.log('selectedStudy:', this.selectedStudy);
    },
    editStudy(study) {
      console.log(this.$route.path);
      this.$router.push('studies/' + study.id);
    },
    selectStudyToWork(record) {
      this.$store.study = record;
      console.log('storeStudy:', this.$store.study);
      this.$router.push('dictionaries');
    },
  },
});
</script>
