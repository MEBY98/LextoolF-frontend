<template>
  <div v-bind="$attrs">
    <slot :$v="vobject"></slot>
  </div>
</template>

<script lang="ts">
/* eslint-disable vue/no-setup-props-destructure */
import { defineComponent, provide, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { delay } from '../../../utils/utils';
import _ from 'lodash';

export default defineComponent({
  props: {
    feedbacks: {
      type: Object,
      default: () => {
        return { value: null };
      },
    },
    state: { type: Object, required: true },
    validations: { type: Object, required: true },
    specific: {
      type: Array,
      default: () => null,
    },
    nested: {
      type: [Boolean, String],
      default: true,
    },
  },
  setup(props) {
    const validateKey = ref(false);
    const clearKey = ref(false);
    provide('validateKey', validateKey);
    provide('clearKey', clearKey);

    let feedbacks = props.feedbacks;
    provide('feedbacks', feedbacks);

    let vobject = useVuelidate(props.validations, { ...props.state });
    provide('vue_object', vobject);

    let nestedKey;
    if (typeof props.nested == 'boolean') {
      nestedKey = props.nested ? Object.keys(props.validations)[0] : null;
    } else {
      nestedKey = props.nested;
    }

    provide('nested', nestedKey);

    const restore = () => {
      vobject.value.$reset();
    };

    const validate = async (): Promise<boolean> => {
      vobject.value.$touch();
      validateKey.value = true;
      await delay(20);
      validateKey.value = false;

      if (!props.specific) {
        return await vobject.value.$validate();
      } else {
        let valid = true;
        for (let i = 0; i < vobject.value.$errors.length && valid; i++) {
          const error = vobject.value.$errors[i];
          if (props.specific.includes(error.$property)) {
            valid = false;
          }
        }
        return valid;
      }
    };

    const clear = async () => {
      vobject.value.$reset();
      clearKey.value = true;
      await delay(20);
      clearKey.value = false;
    };
    return { vobject, validate, clear, restore };
  },
});
</script>
