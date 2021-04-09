<template>
  <component
    :is="component"
    ref="input"
    v-bind="$attrs"
    :value="modelValue"
    v-on="listeners"
  >
    <template #addonBefore>
      <slot name="addonBefore" />
    </template>

    <template v-if="icon" #prefix>
      <component :is="icon" />
    </template>
    <template v-else-if="feather" #prefix>
      <feather :size="17" stroke="#b5adbe" :type="feather" />
    </template>
  </component>
</template>

<script lang="ts">
import { validateLetters, validateNumbers } from '@/utils/utils';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  props: {
    modelModifiers: {
      type: Object,
      default: () => ({}),
    },
    icon: {
      type: Function,
    },
    modelValue: {
      type: [String, Object, Number],
      default: '',
    },
    feather: {
      type: String,
      default: '',
    },
    htmlType: {
      type: String,
      default: 'text',
    },
  },
  emits: ['update:modelValue', 'after-clear'],
  setup() {
    return {};
  },
  data: () => ({}),
  computed: {
    component(): string {
      return this.htmlType == 'textarea' ? 'a-textarea' : 'a-input';
    },
    listeners(): object {
      return {
        ...this.listeners,
        input: this.handleChange,
        keypress: this.handleKeypress,
      };
    },
  },
  methods: {
    handleKeypress(e) {
      if (this.$attrs.numeric) {
        validateNumbers(e);
      } else if (this.$attrs.characters) {
        validateLetters(e);
      }
    },

    handleChange(e) {
      let value = e?.target?.value ?? e;
      if (this.modelModifiers.trim) {
        value = value.trim();
      }
      this.$emit('update:modelValue', value);
    },
    emitEmpty() {
      this.$emit('update:modelValue', '');
      (this.$refs.input as any).focus();
      this.$emit('after-clear');
    },
    clear() {
      this.$emit('update:modelValue', null);
    },
  },
});
</script>
