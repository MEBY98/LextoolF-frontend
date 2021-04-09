import { getTextValidation } from './validationsTexts';

export const TcValidationMixing = {
  props: {
    // If show icon success on valid input
    successFeed: {
      type: Boolean,
      default: true,
    },
    modelModifiers: {
      default: () => ({}),
    },
    showHelp: {
      type: Boolean,
      default: true,
    },
    // The name of the property in the vuelidate object
    name: String,
    // // Icon suffix name. Should be antd icon
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
    async: {
      type: Boolean,
      default: false,
    },
    showRequired: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue', 'onblur'],
  inject: ['vue_object', 'nested', 'feedbacks', 'validateKey', 'clearKey'],
  watch: {
    'validateKey.value': function (val) {
      if (val == true) {
        this.validate();
      }
    },
    'clearKey.value': function (val) {
      if (val == true) {
        this.clear();
      }
    },
  },
  computed: {
    vobject() {
      return this.vue_object.value;
    },
    vfeedback() {
      return this.feedbacks;
    },
    object() {
      if (!this.nested) {
        return this.vobject[this.name];
      } else {
        return this.vobject[this.nested][this.name];
      }
    },
    validateStatus() {
      if ((!this.object.$error && this.object.$pending) || !this.isBlur) {
        return '';
      }
      return this.object.$error
        ? 'error'
        : !this.object.$invalid && this.successFeed && this.object.$dirty
        ? 'success'
        : '';
    },
    getText() {
      const { object, isBlur, showHelp, vfeedback, nested, name } = this;
      if (object.$pending || !isBlur || !showHelp) {
        return '';
      }
      for (const error of this.object.$errors) {
        let validator = error.$validator;

        if (
          vfeedback &&
          vfeedback[nested] &&
          vfeedback[nested][name] &&
          vfeedback[nested][name][validator]
        ) {
          return vfeedback[nested][name][validator];
        }
        return getTextValidation(validator, error.$params);
      }
      return '';
    },
  },
  methods: {
    handleChange(e) {
      let value = e?.target?.value ?? e;
      if (this.modelModifiers.trim) {
        value = value.trim();
      }
      this.$emit('update:modelValue', value);
    },
    shake() {
      let ref = this.$refs.formItem;
      ref.$el.classList.add('animated', 'vshake');
      setTimeout(() => {
        ref.$el.classList.remove('animated', 'vshake');
      }, 500);
    },
    emitEmpty() {
      this.$emit('update:modelValue', '');
      this.$refs.input.focus();
      this.$emit('after-clear');
    },
    clear() {
      this.$emit('update:modelValue', null);
    },
    blurInput() {
      if (this.name) {
        this.isBlur = true;
        this.object.$touch();
        this.$emit('onblur');
      }
    },
    validate() {
      if (this.name) {
        this.isBlur = true;
        this.object.$touch();
        if (this.object.$invalid) {
          this.shake();
          return false;
        }
      }
      return true;
    },
  },
  mounted() {
    if (this.async && this.name) {
      this.object.$touch();
    }
  },
  data() {
    return {
      isBlur: false,
    };
  },
};
