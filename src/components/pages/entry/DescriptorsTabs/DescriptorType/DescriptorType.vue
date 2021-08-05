<template>
  <div>
    <div v-if="type === 'comboBox' && multiInput === false" class="mb-1">
      <tr class="row w-100">
        <td class="col-6 p-1">
          <span style="width: 100px; font-weight: 500; margin-right: 8px">
            {{ label }}
          </span>
        </td>
        <td class="col-6 p-1">
          <a-select
            :value="value"
            show-search
            placeholder="Seleccione"
            style="width: 200px; margin-right: 8px"
            option-filter-prop="label"
            :filter-option="filterOption"
            @change="handleChangeSelect"
          >
            <a-select-option
              v-for="d in descriptors"
              :key="d.description"
              :value="d.id"
            >
              {{ d.description }}
            </a-select-option>
          </a-select>
        </td>
      </tr>
    </div>
    <div v-if="type === 'comboBox' && multiInput === true" class="mb-1">
      <tr class="row w-100">
        <td class="d-flex align-items-center col-6 p-1">
          <span style="width: 100px; font-weight: 500; margin-right: 8px">
            {{ label }}
          </span>
        </td>
        <td class="col-6 p-1">
          <a-select
            :value="value"
            mode="multiple"
            show-search
            placeholder="Seleccione"
            style="width: 200px; margin-right: 8px"
            option-filter-prop="label"
            :filter-option="filterOption"
            @change="handleChangeSelect"
          >
            <a-select-option
              v-for="d in descriptors"
              :key="d.description"
              :value="d.id"
            >
              {{ d.description }}
            </a-select-option>
          </a-select>
        </td>
      </tr>
    </div>
    <div v-if="type === 'textInput'">
      <tr class="row w-100">
        <td class="col-6 p-1">
          <span
            class="d-none d-sm-inline"
            style="font-weight: 500; margin-right: 4px"
          >
            {{ label }}
          </span>
        </td>
        <td class="col-6 p-1">
          <a-input
            :value="value"
            placeholder="Escriba la Descripcion"
            style="width: 200px; margin-right: 8px"
            @change="handleChangeInput($event.target.value)"
          ></a-input>
        </td>
      </tr>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    type: {
      type: String,
      default: () => {
        return 'inputText';
      },
    },
    descriptors: {
      type: [Object],
      default: () => {
        return null;
      },
    },
    value: {
      type: [String],
    },
    label: {
      type: String,
    },
    multiInput: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  emits: ['input-change', 'select-change'],
  setup() {
    const filterOption = (input: string, option: any) => {
      return option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    return {
      filterOption,
    };
  },
  methods: {
    handleChangeInput(value) {
      this.$emit('input-change', value);
    },
    handleChangeSelect(value) {
      this.$emit('select-change', value);
    },
  },
});
</script>
