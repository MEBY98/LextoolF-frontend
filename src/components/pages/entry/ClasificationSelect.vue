<template>
  <a-select
    :value="selected"
    show-search
    placeholder="Clasifique el Lema"
    option-filter-prop="label"
    :filter-option="filterOption"
    :disabled="disabled"
    @change="handleChange"
  >
    <a-select-option
      v-for="c in clasifications"
      :key="c.clasification"
      :value="c.id"
    >
      {{ c.clasification }}
    </a-select-option>
  </a-select>
</template>
<script lang="ts">
import { ClasificationStore } from '@/store/modules/entry';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: () => false,
    },
    selected: {
      type: String,
    },
    clasifications: {
      type: [Object],
    },
  },
  emits: ['clasification-change'],
  setup() {
    const filterOption = (input: string, option: any) => {
      console.log('option:', option);
      return option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    return {
      filterOption,
    };
  },
  methods: {
    handleChange(value) {
      this.$emit('clasification-change', value);
      console.log(`selected`, value);
    },
  },
});
</script>
