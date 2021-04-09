<template>
  <div class="d-flex justify-center">
    <component
      :is="'automatic-table'"
      v-if="isGenerated"
      class="w-100"
      :entries-str="generatedEntriesStr"
      :excel-hash="excelData.excelHash"
      :activator="activator"
    />

    <div v-else class="w-25 mt-4 flexC">
      <a-space size="middle" class="text-center" direction="vertical">
        <SpreadsheetIcon class="icon-generate" />
        <a-button class="w-100" type="primary" @click="generate">
          Generar entradas
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
import SpreadsheetIcon from '@/components/shared/icons/SpreadsheetIcon.vue';
import { computed, defineComponent, inject, ref } from 'vue';
import { Source } from '@/graphql/modules/source/source.model';
import { excelData } from '../AutomaticEntry.vue';

export default defineComponent({
  components: {
    SpreadsheetIcon,
  },

  inject: ['clearGenerated', 'setEntries'],
  props: { template: Object },
  setup(props) {
    const generatedEntries = ref([]);
    const generatedEntriesStr = computed(() => {
      return JSON.stringify(generatedEntries.value);
    });

    return {
      generatedEntries,
      generatedEntriesStr,
    };
  },
  data: () => ({
    isGenerated: false,
    excelData,
    activator: false,
  }),
  computed: {},
  watch: {
    clearGenerated: function (val) {
      if (val) {
        this.isGenerated = false;
        this.generatedEntries = [];
      }
    },
  },
  mounted() {
    window.addEventListener('setEntries', this.genData);
  },
  methods: {
    getEntries() {
      let event = new CustomEvent('getEntries');
      window.dispatchEvent(event);
    },
    genData(event) {
      return this['setEntries'](event.detail);
    },
    async generate() {
      this.$store.layout.loading('Generando entradas');
      const { data, errors } = await Source.generateEntries(excelData);
      this.$store.layout.toggleLoading();
      if (data && data.generateEntries) {
        this.isGenerated = true;
        this.generatedEntries = data.generateEntries;
      } else if (errors) {
        this.$error({
          title: 'Upss, parece que hubo un error generando las entradas.',
          // content:errors.
        });
      }
    },
    clear() {
      this.isGenerated = false;
      this.generatedEntries = [];
    },
  },
});
</script>
<style lang="scss" scoped>
.icon-generate {
  width: 200px;
  height: auto;
}
</style>
