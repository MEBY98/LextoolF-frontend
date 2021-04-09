<template>
  <div>
    <v-form
      ref="form"
      class="w-50"
      :validations="validations"
      :state="{ data }"
    >
      <v-autocomplete
        v-model="data.excelHash"
        :data-source="availableExcels"
        text-key="name"
        id-key="hashPath"
        label="Nombre del excel"
        name="excelHash"
      ></v-autocomplete>

      <v-autocomplete
        v-model="data.sheetName"
        :disabled="!data.excelHash"
        :data-source="availableSheets"
        text-key="name"
        id-key="name"
        label="Hoja del excel que desea generar"
        name="sheetName"
      ></v-autocomplete>
    </v-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { required } from '@vuelidate/validators';
import { Source } from '@/graphql/modules/source/source.model';
import { Dictionary } from '@/graphql/modules/dictionary/dictionary.model';
import { excelData } from '../AutomaticEntry.vue';

export default defineComponent({
  components: {},
  props: {},
  emits: ['clear-generated'],
  setup() {
    return {};
  },
  data: () => ({
    availableExcels: [],
    availableTemplates: [],
    data: excelData,
    validations: {
      data: {
        excelHash: { required },
        sheetName: { required },
      },
    },
  }),
  computed: {
    availableSheets(): object[] {
      if (!this.data.excelHash) {
        return [];
      }
      const i = this.availableExcels.findIndex(
        (excel) => excel.hashPath === this.data.excelHash
      );

      return this.availableExcels[i].sheets;
    },
  },
  watch: {
    'data.excelHash': 'handleChange',
    'data.sheetName': 'handleChange',
  },
  async mounted() {
    const { data, errors } = await Source.getManyExcels();
    if (data) {
      this.availableExcels = data.getManyExcels.elements;
    }
  },
  methods: {
    handleChange() {
      this.$emit('clear-generated');
    },
  },
});
</script>
