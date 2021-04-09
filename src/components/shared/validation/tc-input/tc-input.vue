<template>
  <div v-if="name" class="w-100 position-relative">
    <label
      v-if="$attrs.label"
      :style="{ 'margin-bottom': '2px' }"
      class="fw-500"
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
      :has-feedback="htmlType != 'password'"
      :validate-status="validateStatus"
    >
      <a-input-password
        v-if="htmlType == 'password'"
        v-bind="$attrs"
        :value="modelValue"
        v-on="listeners"
      >
        <template v-if="icon" #prefix>
          <component :is="icon" />
        </template>

        <template v-else-if="feather" #prefix>
          <feather :size="17" stroke="#b5adbe" :type="feather" />
        </template>
      </a-input-password>

      <component
        :is="component"
        v-else
        ref="input"
        class="w-100"
        v-bind="$attrs"
        :value="modelValue"
        :maxlength="maxLength"
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

      <span
        v-if="maxLength && showCharCount"
        :style="$attrs.size == 'large' ? { bottom: '-4px' } : {}"
        :class="{ 'text-danger': invalidLength }"
        class="limit-length"
      >
        {{ length }}/{{ maxLength }}
      </span>
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

  <div v-else class="w-100 position-relative">
    <label
      v-if="$attrs.label"
      :style="{ 'margin-bottom': '1px' }"
      class="flex-center fw-500"
    >
      {{ $attrs.label }}

      <a-tooltip v-if="extraInfo" :title="extraInfo">
        <info-circle-outlined class="ml-2" style="color: rgba(0, 0, 0, 0.45)" />
      </a-tooltip>
    </label>
    <a-form-item class="mb-0 w-100">
      <a-input class="w-100" v-bind="$attrs" :value="modelValue">
        <template v-if="icon" #prefix>
          <component :is="icon" />
        </template>

        <template v-else-if="feather" #prefix>
          <feather :size="17" stroke="#b5adbe" :type="feather" />
        </template>
      </a-input>
    </a-form-item>
  </div>
</template>

<script>
import { InfoCircleOutlined } from '@ant-design/icons-vue';
import { TcValidationMixing } from '../tc-validation-mixing';
import './tc-input.scss';
import { validateLetters, validateNumbers } from '../../../../utils/utils';
import { toRaw } from 'vue';

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
    htmlType: {
      type: String,
      default: 'text',
    },
    showCharCount: {
      type: Boolean,
      default: false,
    },
    numeric: {
      type: Boolean,
      default: false,
    },
    characters: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      toRaw,
    };
  },
  computed: {
    length() {
      return this.modelValue?.length ?? 0;
    },
    component() {
      return this.htmlType == 'textarea' ? 'a-textarea' : 'a-input';
    },
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
    maxLength() {
      return this.object.maxLength?.$params?.max;
    },
    invalidLength() {
      let invalid = this.object.maxLength === false;
      if (invalid) {
        this.object.$touch();
      }
      return invalid;
    },
  },
  methods: {
    handleKeypress(e) {
      if (this.numeric) {
        validateNumbers(e);
      } else if (this.characters) {
        validateLetters(e);
      }
    },
  },
};
</script>
<style lang="scss">
@import '../sharedStyles';
</style>
