<template>
  <h1>Lextool F</h1>
  <h4>Herramienta para la ayuda al estudio de unidades fraseologicas</h4>
  <a-button @click="onStudies">Estudios</a-button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  methods: {
    onStudies() {
      this.$router.push('studies');
    },
  },
});
</script>
