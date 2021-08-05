<template>
  <tr class="row w-100">
    <th class="col-3">
      <h5>Unidad Fraseologica</h5>
    </th>
    <th class="col-3">
      <h5>Ubicacion</h5>
    </th>
    <th class="col-6">
      <h5>Descriptores</h5>
    </th>
  </tr>
  <tr
    v-for="(element, indexUFS) in ufs"
    :key="indexUFS"
    class="row w-100 align-middle"
  >
    <td class="col-3 d-flex align-items-center">
      <span v-if="ufs[indexUFS].UF" style="font-weight: 500">
        {{ ufs[indexUFS].UF }}
      </span>
    </td>
    <td class="col-3 d-flex align-items-center align-middle">
      <span v-if="ufs[indexUFS].UF" style="font-weight: 500">
        {{ ufsUbications[indexUFS] }}
      </span>
    </td>
    <td class="d-table-cell">
      <!-- <descriptor-type
        v-for="(descriptorType, indexDT) in descriptorsTypes"
        :key="indexDT"
        class="col-6"
        :type="descriptorType.inputType"
        :descriptors="descriptorType.descriptors"
        :value="ufs[indexUFS].descriptors[indexDT]"
        :label="descriptorType.name"
        @input-change="updateUFDescriptor($event, indexDT, indexUFS)"
        @select-change="updateUFDescriptor($event, indexDT, indexUFS)"
      ></descriptor-type> -->
    </td>
  </tr>

  <div class="d-flex flex-row-reverse">
    <a-button
      type="primary"
      class="m-2 d-flex align-items-center justify-center"
      @click="save"
    >
      Guardar
      <PlusOutlined />
    </a-button>
    <a-button
      v-if="!lastTab"
      class="m-2 d-flex align-items-center justify-center"
      type="primary"
      @click="goNextTab"
    >
      <DoubleRightOutlined />
      Siguiente
    </a-button>
    <a-button class="m-2" @click="goDictionaries">Cancelar</a-button>
    <a-button
      v-if="!firsTab"
      class="m-2 d-flex align-items-center justify-center"
      type="primary"
      @click="goPreviewTab"
    >
      <DoubleLeftOutlined />
      Anterior
    </a-button>
  </div>
</template>

<script lang="ts">
import {
  PlusOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
} from '@ant-design/icons-vue';

import { defineComponent } from 'vue';
// import DescriptorType from './DescriptorType.vue';
export default defineComponent({
  components: {
    PlusOutlined,
    DoubleRightOutlined,
    DoubleLeftOutlined,
    // 'descriptor-type': DescriptorType,
  },
  props: {
    ufs: {
      type: [Object],
      default: () => {
        return null;
      },
    },
    ufsUbications: {
      type: [String],
      default: () => {
        return null;
      },
    },
    // sl: {
    //   type: [Object],
    //   default: () => {
    //     return null;
    //   },
    // },
    // slufs: {
    //   type: [Object],
    //   default: () => {
    //     return null;
    //   },
    // },
    descriptorsTypes: {
      type: [Object],
      default: () => {
        return null;
      },
    },
    fistTab: {
      type: Boolean,
    },
    lastTab: {
      type: Boolean,
    },
  },
  emits: [
    'update-descriptor',
    'next-tab',
    'preview-tab',
    'go-dictionaries',
    'save',
  ],
  methods: {
    updateUFDescriptor(descriptor, indexDT, indexUFS) {
      const valueToUpdate = {
        descriptor,
        indexDT,
        indexUFS,
      };
      this.$emit('update-descriptor', valueToUpdate);
    },
    goNextTab() {
      this.$emit('next-tab');
    },
    goPreviewTab() {
      this.$emit('preview-tab');
    },
    goDictionaries() {
      this.$emit('go-dictionaries');
    },
    save() {
      this.$emit('save');
    },
  },
});
</script>
