<template>
  <a-modal title="Crear Nueva Fuente" @ok="submit">
    <a-form :model="source">
      <a-form-item
        ref="name"
        label="Nombre de la Fuente"
        name="name"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-input
          v-model:value="source.name"
          placeholde="Nombre del Diccionario"
        ></a-input>
      </a-form-item>
      <a-form-item
        ref="ref"
        label="Referencia"
        name="ref"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-textarea
          v-model:value="source.ref"
          placeholder="Referencia de la Fuente"
          allow-clear
        />
      </a-form-item>
      <a-form-item
        ref="file"
        label="Archivo"
        name="file"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-textarea
          v-model:value="source.file"
          placeholder="Archivo"
          allow-clear
        />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button key="back" @click="closeModal">Cerrar</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="submit">
        Agregar
      </a-button>
    </template>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { MinusCircleFilled, PlusOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    MinusCircleFilled,
    PlusOutlined,
  },
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
    return {
      transferLocale,
      formItemLayoutWithOutLabelModal,
      source,
      loading,
      modalShow,
      labelColModal: { span: 8 },
      wrapperColModal: { span: 14 },
    };
  },
  methods: {
    submit() {
      this.$emit('add-source', this.source);
      this.resetForm();
    },
    closeModal(event) {
      this.$emit('close-modal');
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
