<template>
  <div class="row bg-white card card-sales row-sm mg-b-20">
    <div class="bg-white border-bottom">
      <h6 class="card-title">Crear nuevo proyecto</h6>
    </div>
    <div class="col-8 mt-4">
      <v-form ref="form" :validations="validations" :state="{ dictionary }">
        <v-input
          v-model="dictionary.name"
          :show-required="false"
          size="large"
          label="Nombre del proyecto"
          placeholder="Nombre del proyecto"
          name="name"
        />
      </v-form>
    </div>
    <div class="col-8 mt-4">
      <label class="fw-500">Seleccionar letras asociadas al proyecto</label>
      <a-transfer
        :titles="['Todas las letras', 'Letras seleccionadas']"
        :data-source="letters"
        :render="(letter) => letter.title"
        :filter-option="filterOption"
        show-search
        :target-keys="selectedLetters"
        @change="handleChange"
      />
    </div>

    <div class="border-top mt-4 py-3">
      <a-button size="large" type="primary" @click="createDictionary">
        Crear proyecto
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { required } from '@vuelidate/validators';
import {
  Dictionary,
  letters,
} from '@/graphql/modules/dictionary/dictionary.model';

export default defineComponent({
  components: {},
  props: {},
  setup() {
    return {};
  },
  data: () => ({
    letters,
    selectedLetters: [],
    dictionary: { name: '' },
    validations: {
      dictionary: {
        name: { required },
      },
    },
  }),
  computed: {},
  methods: {
    async createDictionary() {
      let form: any = this.$refs.form;
      if (await form.validate())
        if (!this.selectedLetters.length) {
          this.$error({
            title: 'Debe seleccionar al menos una letra',
          });
        } else {
          const input = {
            letters: this.selectedLetters,
            name: this.dictionary.name,
          };
          const { data } = await Dictionary.createDictionary(input);
          if (data?.createDictionary?._id) {
            this.$success({
              title: 'Se creó el proyecto correctamente',
            });
            this.dictionary.name = '';
            this.selectedLetters = [];
            form.clear();
          } else {
            this.$error({
              title: 'Upss, ocurrió un error al crear el proyecto',
            });
          }
        }
    },
    filterOption(inputValue, option) {
      return option.title.indexOf(inputValue) > -1;
    },
    handleChange(targetKeys, direction, moveKeys) {
      this.selectedLetters = targetKeys;
    },
  },
});
</script>
<style lang="scss" scoped>
::v-deep(.ant-transfer-list) {
  width: 314px;
}
</style>
