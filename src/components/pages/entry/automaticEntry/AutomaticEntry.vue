<template>
  <div class="py-3">
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <keep-alive>
        <component
          :is="steps[current].component"
          ref="actualStep"
          @clear-generated="clearGenerated = true"
          @save="save"
        />
      </keep-alive>
    </div>
    <div class="steps-action d-flex justify-content-end">
      <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">
        Anterior
      </a-button>
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">
        Siguiente
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import StepGeneratedData from './steps/StepGeneratedData.vue';
import StepSelectExcel from './steps/StepSelectExcel.vue';
import StepFinish from './steps/StepFinish.vue';
import { Dictionary } from '@/graphql/modules/dictionary/dictionary.model';

export const excelData = {
  excelHash: '',
  sheetName: '',
};

export default defineComponent({
  components: {
    StepGeneratedData,
    StepSelectExcel,
    StepFinish,
  },
  provide() {
    return {
      clearGenerated: this.clearGenerated,
      elementsMap: this.elementsMap,
      setEntries: this.setEntries,
    };
  },
  props: {},
  setup() {
    return {};
  },
  data: () => ({
    excelData,
    elementsMap: {},
    clearGenerated: true,
    current: 0,
    entriesGen: [],
    steps: [
      {
        title: 'Seleccione el excel',
        component: 'StepSelectExcel',
      },
      {
        title: 'Verifique los datos generados',
        component: 'StepGeneratedData',
      },
      {
        title: 'Crear entradas',
        component: 'StepFinish',
      },
    ],
  }),
  computed: {},
  methods: {
    getEntriesMapped() {
      const { entriesGen } = this;
      return entriesGen.map((entry) => {
        const { source, letter, headword, UF } = entry;
        return {
          source,
          letter,
          elements: [
            {
              elementId: '5fc5aa80e18bcc26b8424b3b',
              descriptions: headword,
            },
            {
              elementId: '5fc5abb8bd353411405cadbd',
              descriptions: UF,
            },
          ],
        };
      });
    },
    async save() {
      console.log(this.entriesGen);
      this.$store.layout.loading('Guardando entradas generadas');

      const { data, errors } = await Dictionary.createManyEntries(
        this.getEntriesMapped()
      );
      this.$store.layout.toggleLoading();
      if (data?.createManyEntries) {
        this.$success({
          title: 'Se guardaron las entradas correctamente',
        });
      } else {
        this.$error({
          title: 'Upss, ocurrió un error al guardar las entradas',
        });
      }
    },
    setEntries(entriesGen) {
      this.entriesGen = entriesGen;
    },
    next() {
      this.current++;
      nextTick((this.$refs.actualStep as any).getEntries);
    },
    prev() {
      this.current--;
    },
  },
});
</script>
<style lang="scss" scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 300px;
  padding: 22px;
}

.steps-action {
  margin-top: 24px;
}
</style>
