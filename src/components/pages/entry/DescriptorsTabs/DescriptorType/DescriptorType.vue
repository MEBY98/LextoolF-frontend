<template>
  <div>
    <div v-if="type === 'select'">
      <div
        v-if="label !== ''"
        class="row w-100 d-flex align-items-center align-middle"
      >
        <td class="col-5">
          <span>{{ label }}</span>
        </td>
        <td class="col-5">
          <general-select
            :elements="descriptors"
            :display-attribute="'description'"
            :key-value="'description'"
            :multiple="multiInput"
            :placeholder="
              multiInput
                ? 'Seleccione los descriptores'
                : 'Seleccione el descriptor'
            "
            :value="value"
            :style="style"
            @change="handleChangeSelect"
          ></general-select>
        </td>
      </div>
      <div v-else>
        <span>{{ label }}</span>
        <general-select
          :elements="descriptors"
          :display-attribute="'description'"
          :key-value="'description'"
          :multiple="multiInput"
          :placeholder="
            multiInput
              ? 'Seleccione los descriptores'
              : 'Seleccione el descriptor'
          "
          :value="value"
          :style="style"
          @change="handleChangeSelect"
        ></general-select>
      </div>
    </div>
    <div v-else>
      <a-input
        :value="value"
        :style="style"
        placeholder="Escriba la Descripcion"
        @change="handleChangeInput($event.target.value)"
      ></a-input>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Select from '@/components/shared/Select.vue';
export default defineComponent({
  components: {
    'general-select': Select,
  },
  props: {
    type: {
      type: String,
      default: () => {
        return 'text';
      },
    },
    descriptors: {
      type: Array,
      default: () => {
        return null;
      },
    },
    value: {
      type: [String, Array],
    },
    label: {
      type: String,
      default: () => '',
    },
    multiInput: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    style: {
      type: Object,
      defult: () => {
        return { width: '240px' };
      },
    },
  },
  emits: ['input-change', 'select-change'],
  setup(props, context) {
    const handleChangeInput = (value) => {
      context.emit('input-change', value);
    };
    const handleChangeSelect = (value) => {
      context.emit('select-change', value);
    };
    return {
      handleChangeInput,
      handleChangeSelect,
    };
  },
});
</script>
