<template>
  <a-form-item :colon="false">
    <template #label>
      <span style="font-weight: 500">{{ label }}</span>
    </template>
    <a-input
      v-model:value="valueRef"
      :style="style"
      :placeholder="placeholder"
      @input="handleInput"
      @change="handleChange"
    ></a-input>
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
export default defineComponent({
  props: {
    label: {
      type: String,
      default: () => '',
    },
    value: {
      type: String,
    },
    style: {
      type: Object,
      default: () => {
        return {};
      },
    },
    placeholder: {
      type: String,
      default: () => '',
    },
  },
  emits: ['input', 'press-enter', 'change'],
  setup(props, context) {
    const valueRef = ref();
    watch(
      () => props.value,
      (newValue) => {
        console.log('newValue:', newValue);
        valueRef.value = newValue;
      }
    );
    const handleInput = (input) => {
      console.log(input);
      context.emit('input', input.data);
    };
    const handleChange = (input) => {
      console.log(input);
      context.emit('change', input.data);
    };
    const handlePressEnter = (input) => {
      context.emit('press-enter', input.data);
    };
    return {
      handleChange,
      handlePressEnter,
      handleInput,
      valueRef,
    };
  },
});
</script>
