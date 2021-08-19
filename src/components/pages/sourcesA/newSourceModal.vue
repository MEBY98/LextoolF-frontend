<template>
  <a-modal title="Crear Nueva Fuente" @ok="submit">
    <a-form :model="espesifications">
      <a-form-item
        ref="bloque"
        label="Nombre de la Fuente"
        name="bloque"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-input
          v-model:value="espesifications.bloque"
          placeholde="Nombre de la Fuente"
        ></a-input>
      </a-form-item>
      <a-form-item
        ref="author"
        label="Referencia"
        name="author"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-textarea
          v-model:value="espesifications.author"
          placeholder="Referencia de la Fuente"
          allow-clear
        />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button key="back" @click="closeModal">Cerrar</a-button>
      <a-button key="submit" type="primary" @click="submit">Agregar</a-button>
    </template>
  </a-modal>
</template>
<script lang="ts">
import 'ant-design-vue/lib/upload/style';
import { MinusCircleFilled, PlusOutlined } from '@ant-design/icons-vue';
import { Sources } from '@/graphql/modules/sourcesA/model';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
    PlusOutlined,
    MinusCircleFilled,
  },
  emits: ['close-modal', 'add-source'],
  data() {
    const espesifications = {
      bloque: '',
      author: '',
    };
    const formItemLayoutWithOutLabelModal = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
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
    const modalShow = false;
    return {
      formItemLayoutModal,
      formItemLayoutWithOutLabelModal,
      espesifications,
      modalShow,
      labelColModal: { span: 8 },
      wrapperColModal: { span: 14 },
    };
  },
  methods: {
    submit() {
      console.log(this.espesifications);
      console.log('sourceeeeeee', this.espesifications);
      this.$emit('add-source', this.espesifications);
    },
    closeModal(event) {
      this.$emit('close-modal');
    },
  },
});
</script>
