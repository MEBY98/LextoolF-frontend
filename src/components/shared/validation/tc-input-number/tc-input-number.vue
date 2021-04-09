<template>
  <div v-if="name" class="w-100 position-relative">
    <label
      v-if="$attrs.label"
      :style="{ 'margin-bottom': '1px' }"
      class="flex-center fw-500"
    >
      <small
        v-if="object.required && showRequired"
        class="required-mark"
      ></small>
      {{ $attrs.label }}

      <a-tooltip v-if="extraInfo" :title="extraInfo">
        <info-circle-outlined class="ml-2" style="color: rgba(0, 0, 0, 0.45)" />
      </a-tooltip>
    </label>

    <a-form-item
      ref="formItem"
      class="mb-0 w-100"
      :has-feedback="false"
      :validate-status="validateStatus"
    >
      <a-input-number
        ref="input"
        class="w-100"
        v-bind="$attrs"
        :value="modelValue"
        v-on="listeners"
      ></a-input-number>
    </a-form-item>
    <small>
      <small
        :class="{ 'ant-label-error__large': $attrs.size == 'large' }"
        class="fs-small ant-label-error"
      >
        {{ getText }}
      </small>
    </small>
  </div>
</template>

<script>
import { InfoCircleOutlined } from '@ant-design/icons-vue';
import { TcValidationMixing } from '../tc-validation-mixing';
import '../tc-input/tc-input.scss';

export default {
  components: {
    InfoCircleOutlined,
  },
  mixins: [TcValidationMixing],
  props: {
    extraInfo: {
      type: String,
      default: null,
    },
  },
  computed: {
    listeners() {
      return {
        // TODO:
        ...this.listeners,
        // ...this.$attrs.listeners,
        input: this.handleChange,
        keypress: this.handleKeypress,
        blur: this.blurInput,
      };
    },
  },
  methods: {
    handleKeypress(e) {
      let key = window.event ? e.which : e.keyCode;
      if (key < 48 || key > 57) {
        e.preventDefault();
      }
    },
  },
};
</script>
<style lang="scss">
@import '../sharedStyles';
</style>
