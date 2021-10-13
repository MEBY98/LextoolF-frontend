<template>
  <tr class="row w-100">
    <th :class="`col-${columnWidth[0]}`">
      <h6>Unidad fraseológica</h6>
    </th>
    <th :class="`col-${columnWidth[1]}`">
      <h6>Ubicación</h6>
    </th>
    <th
      v-for="descriptorType in descriptorTypes"
      :key="descriptorType.id"
      :class="`col-${columnWidth[2]}`"
    >
      <h6>{{ descriptorType.name }}</h6>
    </th>
  </tr>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    descriptorTypes: {
      type: Array,
      default: () => [],
    },
    columnWidth: {
      type: Array,
      default: () => [],
    },
  },
});
</script>
