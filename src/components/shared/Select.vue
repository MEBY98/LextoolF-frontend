<template>
  <a-select
    :value="value"
    show-search
    :style="style"
    :mode="multiple ? 'multiple' : null"
    option-filter-prop="label"
    :filter-option="filterOption"
    :placeholder="placeholder"
    @change="handleSelectChange"
  >
    <a-select-option
      v-for="(e, index) in elements"
      :key="fetchAttributeFromObject(e, keyValue)"
      :value="indexValue ? index : e.id"
    >
      {{ fetchAttributeFromObject(e, displayAttribute) }}
    </a-select-option>
  </a-select>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import UseFetchAttributeFromObject from '@/utils/FetchAttributeFromObject/UseFetchAttributeFromObject';
export default defineComponent({
  props: {
    style: {
      type: Object,
      default: () => {
        return {
          width: '200px',
          marginRight: '8px',
        };
      },
    },
    elements: {
      type: Array,
    },
    value: {
      type: [Number, String, Array],
    },
    indexValue: {
      type: Boolean,
      default: () => false,
    },
    displayAttribute: {
      type: String,
    },
    keyValue: {
      type: String,
    },
    multiple: {
      type: Boolean,
      default: () => false,
    },
    placeholder: {
      type: String,
      default: () => '',
    },
  },
  emits: ['change'],
  setup(props, context) {
    const filterOption = (input: string, option: any) => {
      return option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const handleSelectChange = (value) => {
      console.log('value', value);
      context.emit('change', value);
    };
    const { fetchAttributeFromObject } = UseFetchAttributeFromObject();
    return {
      filterOption,
      handleSelectChange,
      fetchAttributeFromObject,
    };
  },
});
</script>
