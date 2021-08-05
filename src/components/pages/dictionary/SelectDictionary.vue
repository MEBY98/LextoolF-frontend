<template>
  <a-select
    :value="$store.dictionary.id"
    show-search
    placeholder="Seleccione el Diccionario"
    style="width: 500px; margin-top: 5px"
    option-filter-prop="label"
    :filter-option="selectFilterOption"
    @change="selectHandleChange"
  >
    <a-select-option
      v-for="d in $store.study.dictionaries"
      :key="d.name"
      :value="d.id"
    >
      {{ d.name }}
    </a-select-option>
  </a-select>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Dictionary } from '@/graphql/modules/dictionary/model.ts';

export default defineComponent({
  //   props: {
  //     dictionaries: { type: [Object] },
  //     selected: { type: String },
  //   },
  emits: ['change-selected-dictionary'],
  setup(props, context) {
    const selectFilterOption = (input: string, option: any) => {
      return option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const selectHandleChange = async (value) => {
      const dataSelectedDictionary = await Dictionary.getDictionaryByID(value);
      const selectedDictionary = dataSelectedDictionary.data.getDictionaryByID;
      console.log(selectedDictionary);
      context.emit('change-selected-dictionary', selectedDictionary);
    };
    return {
      selectHandleChange,
      selectFilterOption,
    };
  },
});
</script>
