<template>
  <a-table
    :row-key="(record, i) => record.hashPath"
    :loading="loading"
    bordered
    :columns="columns"
    :data-source="excels"
  >
    <template #action="{ record }">
      <span>
        <!-- <a-divider type="vertical" /> -->
        <!-- v-if="dataSource.length" -->
        <a-popconfirm
          title="¿Desea eliminar este excel?"
          @confirm="deleteExcel(record.hashPath)"
        >
          <a class="text-danger">Eliminar</a>
        </a-popconfirm>
      </span>
    </template>
  </a-table>
</template>
<script>
import { Source } from '@/graphql/modules/source/source.model';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  props: {},
  data() {
    return {
      excels: [],
      pagination: null,
      loading: false,
      columns: [
        {
          title: 'Nombre',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Referencia',
          dataIndex: 'reference',
          key: 'reference',
        },
        {
          title: 'Acción',
          key: 'action',
          slots: { customRender: 'action' },
        },
      ],
    };
  },
  async mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      const { data } = await Source.getManyExcels();
      this.loading = false;

      if (data) {
        this.excels = data.getManyExcels.elements;
        this.pagination = data.getManyExcels.pagination;
      } else {
        this.$error({
          title: 'Ocurrió un error al cargar los excels',
        });
      }
    },
    async deleteExcel(hash) {
      this.loading = true;
      const { data } = await Source.deleteExcel(hash);
      if (data?.deleteExcel?.status == 200) {
        this.$success({
          title: 'Se eliminó el excel correctamente',
        });
        this.getData();
      } else {
        this.loading = false;
        this.$error({
          title: 'No se pudo eliminar el excel',
        });
      }
    },
  },
});
</script>
<style lang="scss" scoped></style>
