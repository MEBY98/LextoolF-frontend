<template>
  <a-modal title="Crear Nuevo Diccionario" @ok="submit">
    <a-form :model="newDictionary">
      <a-form-item
        ref="name"
        label="Nombre del Diccionario"
        name="name"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-input
          v-model:value="newDictionary.name"
          placeholde="Nombre del Diccionario"
        ></a-input>
      </a-form-item>
      <a-form-item
        ref="shortName"
        label="Siglas del Diccionario"
        name="ShortName"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-input
          v-model:value="newDictionary.shortName"
          placeholder="Siglas del Diccionario"
        ></a-input>
      </a-form-item>
      <a-form-item
        ref="reference"
        label="Referencia"
        name="reference"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-textarea
          v-model:value="newDictionary.reference"
          placeholder="Referencia del Diccionario"
          allow-clear
        />
      </a-form-item>
      <a-form-item
        v-for="(author, index) in newDictionary.author"
        :key="index"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
        :label="'Autor ' + (index + 1)"
      >
        <a-input
          v-model:value="newDictionary.author[index].name"
          placeholder="Nombre del Autor"
          style="width: 90%; margin-right: 8px"
        ></a-input>
        <PlusOutlined
          v-if="newDictionary.author.length - 1 === index"
          class="dynamic-add-button"
          :disabled="newDictionary.author.length === 1"
          :style="{ color: '#1890ff' }"
          @click="addAuthor"
        />
        <a-input
          v-model:value="newDictionary.author[index].siglas"
          placeholder="Siglas del Autor"
          style="width: 90%; margin-right: 8px"
        />
        <MinusCircleFilled
          v-if="newDictionary.author.length > 1"
          class="dynamic-delete-button"
          :disabled="newDictionary.author.length === 1"
          :style="{ color: 'red' }"
          @click="removeAuthor(author)"
        />
      </a-form-item>
      <a-form-item
        ref="annoOfPublication"
        label="Año de Publicacion"
        name="annoOfPublication"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-input-number
          v-model:value="newDictionary.annoOfPublication"
          :max="currentYear"
          :min="1"
        ></a-input-number>
      </a-form-item>

      <div class="p-3">
        <span style="font-weight: 500">Letras</span>
      </div>
      <div class="container ml-4 w-100">
        <a-transfer
          :titles="['Sin agregar', 'Agregadas']"
          :data-source="letters"
          :render="(letter) => letter.title"
          :filter-option="filterOptionLettersTransfer"
          show-search
          :target-keys="newDictionary.letters"
          :locale="transferLocale"
          class="w-100"
          @change="handleChangeLettersTransfer"
        ></a-transfer>
      </div>
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
  emits: ['close-modal', 'add-dictionary'],
  data() {
    const transferLocale = {
      itemUnit: '',
      itemsUnit: '',
      notFoundContent: 'No hay letras',
      searchPlaceholder: 'Buscar Letra',
    };
    const letters = [
      { title: 'A', key: 'A' },
      { title: 'B', key: 'B' },
      { title: 'C', key: 'C' },
      { title: 'D', key: 'D' },
      { title: 'E', key: 'E' },
      { title: 'F', key: 'F' },
      { title: 'G', key: 'G' },
      { title: 'H', key: 'H' },
      { title: 'I', key: 'I' },
      { title: 'J', key: 'J' },
      { title: 'K', key: 'K' },
      { title: 'L', key: 'L' },
      { title: 'M', key: 'M' },
      { title: 'N', key: 'N' },
      { title: 'Ñ', key: 'Ñ' },
      { title: 'O', key: 'O' },
      { title: 'P', key: 'P' },
      { title: 'Q', key: 'Q' },
      { title: 'R', key: 'R' },
      { title: 'S', key: 'S' },
      { title: 'T', key: 'T' },
      { title: 'U', key: 'U' },
      { title: 'V', key: 'V' },
      { title: 'W', key: 'W' },
      { title: 'X', key: 'X' },
      { title: 'Y', key: 'Y' },
      { title: 'Z', key: 'Z' },
    ];
    const selectedLetters = [];
    const newDictionary = {
      name: '',
      shortName: '',
      author: [{ name: '', siglas: '' }],
      reference: '',
      annoOfPublication: 0,
      letters: [],
    };
    const formItemLayoutWithOutLabelModal = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    const modalShow = false;
    const loading = false;
    const currentYear = new Date().getFullYear();
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
      letters,
      selectedLetters,
      formItemLayoutWithOutLabelModal,
      currentYear,
      newDictionary,
      loading,
      modalShow,
      labelColModal: { span: 8 },
      wrapperColModal: { span: 14 },
    };
  },
  methods: {
    submit() {
      this.$emit('add-dictionary', this.newDictionary);
      this.resetForm();
    },
    removeAuthor(author) {
      let index = this.newDictionary.author.indexOf(author);
      if (index !== -1) {
        this.newDictionary.author.splice(index, 1);
      }
    },
    addAuthor() {
      this.newDictionary.author.push({ name: '', siglas: '' });
    },
    closeModal(event) {
      this.$emit('close-modal');
    },
    resetForm() {
      this.newDictionary = {
        name: '',
        shortName: '',
        author: [{ name: '', siglas: '' }],
        reference: '',
        annoOfPublication: 0,
        letters: [],
      };
    },
    handleChangeLettersTransfer(targetKeys, direction, moveKeys) {
      this.newDictionary.letters = targetKeys;
    },
    filterOptionLettersTransfer(inputValue, option) {
      return option.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
    },
  },
});
</script>
