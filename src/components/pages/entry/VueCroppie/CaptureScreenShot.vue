<template></template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import UseAddPasteEvent from './UseAddPasteEvent';
export default defineComponent({
  emits: ['paste'],
  setup(props, context) {
    const { addPasteEvent } = UseAddPasteEvent(context);
    onMounted(addPasteEvent);
  },
});
</script>
