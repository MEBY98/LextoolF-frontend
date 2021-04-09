<template>
  <div v-if="name" class="w-100 position-relative form-select-validation">
    <label class="mb-0 flex-center fw-500">
      <small v-if="object.required" class="required-mark"></small>
      {{ $attrs.label }}

      <a-tooltip v-if="extraInfo" :title="extraInfo">
        <info-circle-outlined class="ml-2" style="color: rgba(0, 0, 0, 0.45)" />
      </a-tooltip>
    </label>
    <a-form-item
      ref="formItem"
      class="mb-0"
      :has-feedback="true"
      :validate-status="validateStatus"
    >
      <a-select
        class="w-100"
        v-bind="$attrs"
        :value="modelValue"
        :default-value="defaultValue"
        v-on="listeners"
      >
        <a-select-option v-for="item in reactiveData" :key="item[idKey]">
          {{ item[textKey] }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <small>
      <small class="fs-small ant-label-error">
        {{ getText }}
      </small>
    </small>
  </div>
</template>

<script>
import { TcValidationMixing } from '../tc-validation-mixing';
import { InfoCircleOutlined } from '@ant-design/icons-vue';

export default {
  components: { InfoCircleOutlined },
  mixins: [TcValidationMixing],
  props: {
    extraInfo: {
      type: String,
      default: null,
    },
    fetching: Boolean,
    idKey: {
      type: String,
      default: 'id',
    },
    textKey: {
      type: String,
      default: 'text',
    },
    defaultValue: { type: String, default: null },
    dataSource: { type: Array, default: () => [] },
  },
  emits: ['on-clear'],
  data: () => ({
    self_data: [],
    loading: false,
  }),
  computed: {
    reactiveData() {
      return this.dataSource ? this.dataSource : this.self_data;
    },
    secondSufix() {
      let suffix = this.extraInfo !== null && this.name !== null;

      return { 'second-sufix': suffix };
    },
    listeners() {
      return {
        ...this.listeners,
        change: this.handleChange,
        blur: this.blurInput,
      };
    },
    maxLength() {
      return this.object.$params?.maxLength?.max;
    },
    invalidLength() {
      let invalid = this.object['maxLength'] === false;
      if (invalid) {
        this.object.$touch();
      }
      return invalid;
    },
  },
  watch: {
    value: function (value, old) {
      if (!value && old) {
        this.$emit('on-clear');
      }
    },
  },
  methods: {},
};
</script>
<style lang="scss">
.form-select-validation {
  .ant-form-item-children-icon {
    right: 24px !important;
  }
}
</style>
