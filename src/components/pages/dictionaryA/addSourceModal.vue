<template>
  <a-modal title="Asociar Fuente:" @ok="submit">
    <a-form :model="source">
      <a-form-item
        ref="name"
        label="Nombre de la Fuente"
        name="name"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <select v-model="key" @change="selectSource($event)">
          <option
            v-for="sourceSelect in selectList"
            :key="sourceSelect.id"
            :value="sourceSelect.id"
          >
            {{ sourceSelect.name }}
          </option>
        </select>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button key="back" @click="closeModal">Cerrar</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="submit">
        Asociar
      </a-button>
    </template>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { MinusCircleFilled, PlusOutlined } from '@ant-design/icons-vue';
import { Sources } from '@/graphql/modules/sourcesA/model';

export default defineComponent({
  components: {
    MinusCircleFilled,
    PlusOutlined,
  },
  props: ['selectList'],
  emits: ['close-modal', 'add-source'],
  data() {
    const transferLocale = {
      itemUnit: '',
      itemsUnit: '',
    };
    const source = {
      name: '',
      ref: '',
      file: '',
    };
    const sources = [];
    const sourcesSelect = [];
    const formItemLayoutWithOutLabelModal = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    const modalShow = false;
    const loading = false;
    const formItemLayoutModal = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const newSource = {
      id: '',
      name: '',
      file: '',
      ref: '',
    };
    return {
      transferLocale,
      formItemLayoutWithOutLabelModal,
      source,
      sources,
      loading,
      sourcesSelect,
      modalShow,
      labelColModal: { span: 8 },
      wrapperColModal: { span: 14 },
      newSource,
    };
  },
  methods: {
    async findAllSources() {
      const s = await Sources.findAllSources();
      this.sources = s;
      this.sourcesSelect = s;
    },
    async selectSource(event) {
      for (const item of this.selectList) {
        if (item.id === event.target.value) {
          this.newSource = item;
        }
      }
    },
    submit() {
      this.$emit('add-source', this.newSource); /// Aqui se inserta en la tabla de source de newDictionaryA esto esta funcionando
      this.resetForm();
    },
    closeModal(event) {
      this.$emit('close-modal');
      this.resetForm();
    },
    resetForm() {
      this.source = {
        name: '',
        ref: '',
        file: '',
      };
    },
  },
});
</script>
