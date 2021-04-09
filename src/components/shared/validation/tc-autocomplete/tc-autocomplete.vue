<template>
  <div
    v-if="name"
    class="w-100 position-relative form-auto-validation form-select-validation"
  >
    <label class="mb-0 fw-500">
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
      <a-tree-select
        class="w-100"
        v-bind="$attrs"
        :value="modelValue ? modelValue : null"
        :show-search="!loading && !fetching"
        :filter-tree-node="filter"
        dropdown-class-name="tc-autocomplete"
        :dropdown-style="{ maxHeight: '250px', overflow: 'auto' }"
        search-placeholder="Filtrar..."
        allow-clear
        v-on="listeners"
      >
        <template v-if="icon" #prefix>
          <component :is="icon" />
        </template>

        <template v-else-if="feather" #prefix>
          <feather :size="17" stroke="#b5adbe" :type="feather" />
        </template>
        <a-tree-select-node
          v-if="loading || fetching"
          :is-leaf="true"
          :selectable="false"
        >
          <template #title>
            <div class="w-100 h-100 d-flex justify-center py-3">
              <a-spin />
            </div>
          </template>
        </a-tree-select-node>

        <a-tree-select-node
          v-for="opt in reactiveData"
          v-else
          :key="opt[idKey]"
          :selectable="true"
          :value="opt[idKey] + ''"
          :text="opt[textKey]"
          :title="opt[textKey]"
        />
      </a-tree-select>
    </a-form-item>
    <small class="fs-small ant-label-error">
      {{ getText }}
    </small>
  </div>
</template>

<script>
import { TcValidationMixing } from '../tc-validation-mixing';
import { InfoCircleOutlined } from '@ant-design/icons-vue';
import { onMounted } from 'vue';

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
      default: '_id',
    },
    textKey: {
      type: String,
      default: 'text',
    },
    where: {
      type: Object,
      default: () => {
        return {};
      },
    },
    defaultValue: { type: String, default: null },
    dataSource: { type: Array, default: () => null },
    model: { type: Function, default: null },
  },
  emits: ['on-clear', 'update:modelValue'],
  data: () => ({
    self_data: [],
    loading: false,
  }),
  computed: {
    reactiveData() {
      return this.dataSource ? this.dataSource : this.self_data;
    },
    listeners() {
      return {
        ...this.listeners,
        change: this.handleChange,
      };
    },
  },
  watch: {
    value: function (value, old) {
      if (!value && old) {
        this.$emit('on-clear');
      }
    },
    where: 'refresh',
  },
  async mounted() {
    const { model, defaultValue, getData } = this;
    if (model) {
      getData();
      if (defaultValue) {
        this.$emit('update:modelValue', defaultValue);
      }
    }
  },
  methods: {
    refresh(val, old) {
      this.$emit('update:modelValue', null);
      this.getData();
    },
    async getData() {
      this.loading = true;
      const { data, errors } = await this.model.list(this.where);
      this.loading = false;
      if (!errors && data) {
        this.self_data = data;
      }
    },
    filter(input, treeNode) {
      return (
        treeNode.props.text.toUpperCase().indexOf(input.toUpperCase()) >= 0
      );
    },
  },
};
</script>
<style lang="scss">
.loading-autocomplete {
  .ant-select-tree li .ant-select-tree-node-content-wrapper:hover {
    background-color: white;
  }
}

.tc-autocomplete,
.form-auto-validation {
  .ant-select-tree li .ant-select-tree-node-content-wrapper:hover {
    background-color: #e8ffef;
  }

  .ant-select-selection__clear {
    width: 14px !important;
    height: 14px !important;
    font-size: 14px !important;

    svg {
      transform: translateY(-4px);
    }
  }

  .ant-select-tree-switcher.ant-select-tree-switcher-noop {
    display: none;
  }
  .ant-select-tree
    li
    .ant-select-tree-node-content-wrapper.ant-select-tree-node-selected,
  .ant-select-tree li .ant-select-tree-node-content-wrapper {
    width: 100%;
  }
}
</style>
