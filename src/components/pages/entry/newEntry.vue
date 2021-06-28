<template>
  <h4>Crear Nueva Unidad Fraseologica</h4>
  <br />
  <a-form ref="formRef" :model="newEntry">
    <a-form-item
      ref="context"
      label="Contexto"
      name="name"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-radio-group v-model:value="contextType">
        <a-radio-button value="Texto">Texto</a-radio-button>
        <a-radio-button value="Imagen">Imagen</a-radio-button>
      </a-radio-group>
      <a-textarea
        v-if="contextType === 'Texto'"
        v-model:value="newEntry.context"
      ></a-textarea>
      <span v-else>Aqui la Imagen</span>
    </a-form-item>
    <a-form-item
      ref="lemma"
      label="Lema"
      name="lemma"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-input v-model:value="newEntry.lemma"></a-input>
    </a-form-item>

    <a-form-item
      v-for="(UF, index) in newEntry.UFs"
      :key="index"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :label="'UF ' + (index + 1)"
    >
      <a-input
        v-model:value="newEntry.UFs[index].UF"
        placeholder="Unidad Fraseologica"
      ></a-input>
      <PlusOutlined
        v-if="newEntry.UFs.length - 1 === index"
        class="dynamic-add-button"
        :disabled="newEntry.UFs.length === 1"
        :style="{ color: '#1890ff' }"
        @click="addUF"
      />
      <a-tree-select
        v-model:value="newEntry.UFs[index].clasifications"
        show-search
        style="width: 100%"
        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
        :tree-data="descriptors"
        placeholder="Please select"
        allow-clear
        multiple
        tree-default-expand-all
      ></a-tree-select>
      <MinusCircleFilled
        v-if="newEntry.UFs.length > 1"
        class="dynamic-delete-button"
        :disabled="newEntry.UFs.length === 1"
        :style="{ color: 'red' }"
        @click="removeAuthor(author)"
      />
    </a-form-item>

    <div style="text-align: right">
      <a-button
        key="submit"
        type="primary"
        style="margin-right: 5px"
        @click="createStudy"
      >
        Crear
      </a-button>
      <a-button key="back" @click="goStudies">Cancelar</a-button>
    </div>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, UnwrapRef, h } from 'vue';
import { PlusOutlined, MinusCircleFilled } from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    PlusOutlined,
    MinusCircleFilled,
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['letter'],
  data() {
    const contextType = 'Texto';
    const formRef = ref();
    const newEntry: UnwrapRef<any> = reactive({
      context: '',
      lemma: '',
      letter: '',
      UFs: [],
    });
    return {
      contextType,
      formRef,
      newEntry,
      labelCol: { span: 7 },
      wrapperCol: { span: 14 },
    };
  },
  methods: {
    createStudy() {
      this.newEntry.letter = this.$route.params.letter.toString();

      console.log(this.newEntry);
      //   this.$router.push('dictionaries');
    },
    goStudies() {
      this.$router.push('studies');
    },
  },
});
</script>
