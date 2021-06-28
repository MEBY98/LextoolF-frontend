<template>
  <a-modal title="Editar Diccionario" @ok="submit">
    <a-form :model="$store.dictionary" :rules="rules">
      <a-form-item
        ref="name"
        label="Nombre del Diccionario"
        name="name"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-input
          v-model:value="$store.dictionary.name"
          placeholde="Nombre del Diccionario"
        ></a-input>
      </a-form-item>
      <a-form-item
        ref="shortName"
        label="Siglas del Diccionario"
        name="shortName"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-input
          v-model:value="$store.dictionary.shortName"
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
          v-model:value="$store.dictionary.reference"
          placeholder="Referencia del Diccionario"
          allow-clear
        />
      </a-form-item>
      <a-form-item
        v-for="(author, index) in $store.dictionary.author"
        :key="index"
        name="author"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
        :label="'Autor ' + (index + 1)"
      >
        <a-input
          v-model:value="$store.dictionary.author[index].name"
          placeholder="Nombre del Autor"
          style="width: 90%; margin-right: 8px"
        ></a-input>
        <PlusOutlined
          v-if="$store.dictionary.author.length - 1 === index"
          class="dynamic-add-button"
          :disabled="$store.dictionary.author.length === 1"
          :style="{ color: '#1890ff' }"
          @click="addAuthor"
        />
        <a-input
          v-model:value="$store.dictionary.author[index].siglas"
          placeholder="Siglas del Autor"
          style="width: 90%; margin-right: 8px"
        />
        <MinusCircleFilled
          v-if="$store.dictionary.author.length > 1"
          class="dynamic-delete-button"
          :disabled="$store.dictionary.author.length === 1"
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
          v-model:value="$store.dictionary.annoOfPublication"
          :max="currentYear"
          :min="1"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="Letras del Diccionario">
        <a-transfer
          :titles="['Sin agregar', 'Agregadas']"
          :data-source="letters"
          :render="(letter) => letter.title"
          :filter-option="filterOptionLettersTransfer"
          show-search
          :target-keys="$store.dictionary.letters"
          :locale="transferLocale"
          @change="handleChangeLettersTransfer"
        ></a-transfer>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button key="back" @click="closeModal">Cerrar</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="submit">
        Guardar
      </a-button>
    </template>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { MinusCircleFilled, PlusOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    MinusCircleFilled,
    PlusOutlined,
  },
  // eslint-disable-next-line vue/require-prop-types
  //   props: ['selectedDictionary'],
  emits: ['close-modal', 'edit-dictionary'],
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
    const validateAuthor = async (rule, value) => {
      console.log('validatorvalue:', value);
      if (value.length === 1) {
        if (value[0].name === '') {
          if (value[0].siglas === '') {
            return Promise.reject('Por favor agregue el autor');
          } else {
            return Promise.reject('Por favor agregue el nombre');
          }
        } else if (value[0].siglas === '') {
          return Promise.reject('Por favor agregue las siglas');
        }
      } else {
        return Promise.resolve();
      }
    };
    const rules = {
      name: [
        {
          required: true,
          message: 'Por favor escriba el nombre',
          trigger: 'change',
        },
      ],
      shortName: [
        {
          required: true,
          message: 'Por favor escriba las siglas',
          trigger: 'change',
        },
      ],
      reference: [
        {
          required: true,
          message: 'Por favor escriba la referencia del diccionario',
          trigger: 'blur',
        },
      ],
      author: [
        {
          validator: validateAuthor,
          trigger: 'blur',
        },
      ],
      annoOfPublication: [
        {
          type: 'number',
          message: 'Debe ser un numero',
          trigger: 'change',
        },
        {
          required: true,
          message: 'Por favor escriba el Año',
          trigger: 'change',
        },
      ],
    };
    return {
      rules,
      transferLocale,
      letters,
      selectedLetters,
      formItemLayoutWithOutLabelModal,
      currentYear,
      loading,
      modalShow,
      labelColModal: { span: 8 },
      wrapperColModal: { span: 14 },
    };
  },
  methods: {
    submit() {
      this.$emit('edit-dictionary', this.$store.dictionary);
    },
    removeAuthor(author) {
      let index = this.$store.dictionary.author.indexOf(author);
      if (index !== -1) {
        this.$store.dictionary.author.splice(index, 1);
      }
    },
    addAuthor() {
      this.$store.dictionary.author.push({ name: '', siglas: '' });
    },
    closeModal(event) {
      this.$emit('close-modal');
    },
    handleChangeLettersTransfer(targetKeys, direction, moveKeys) {
      this.$store.dictionary.letters = targetKeys;
    },
    filterOptionLettersTransfer(inputValue, option) {
      return option.title.indexOf(inputValue) > -1;
    },
  },
});
</script>
