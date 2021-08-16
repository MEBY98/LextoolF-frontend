<template>
  <h4>Nueva Unidad Fraseológica Candidata</h4>
  <br />
  <a-form ref="formRef" :model="entryA" :rules="rules">
    <a-form-item
      ref="UF"
      label="Unidad Fraseológica"
      name="UF"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-input v-model:value="entryA.UF"></a-input>
    </a-form-item>
    <a-form-item
      ref="lemma"
      label="Lema"
      name="lemma"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-input v-model:value="entryA.lemma"></a-input>
    </a-form-item>
    <div style="text-align: right">
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        style="margin-right: 5px"
        @click="createEntryA"
      >
        Crear
      </a-button>
      <a-button key="back" @click="goBack">Cancelar</a-button>
    </div>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  EyeFilled,
  EditFilled,
  DeleteFilled,
  PlusSquareFilled,
} from '@ant-design/icons-vue';
import { EntryA } from '@/graphql/modules/entryA/model';

export default defineComponent({
  components: {
    EyeFilled,
    EditFilled,
    DeleteFilled,
    PlusSquareFilled,
  },
  data() {
    const rules = {
      UF: [
        {
          required: true,
          message: 'Por favor escriba la UF',
          trigger: 'blur',
        },
      ],
    };
    const formRef = ref();
    const loading = false;
    const entryA = {
      UF: '',
      lemma: '',
      source: '',
      letter: '',
      context: '',
    };
    return {
      loading,
      entryA,
      formRef,
      rules,
      labelCol: { span: 7 },
      wrapperCol: { span: 14 },
    };
  },
  methods: {
    createEntryA() {
      console.log(this.entryA);
      this.loading = true;
      this.entryA.source = this.$route.params.source.toString();
      EntryA.createEntry(this.entryA);
      this.$router.push({ name: 'extractionTask' });
    },
    goBack() {
      this.$router.push({ name: 'extractionTask' });
    },
  },
});
</script>
