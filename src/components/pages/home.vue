<template>
  <h1>Lextool F</h1>
  <h4>Herramienta para la ayuda en el contexto de la Lexicográfia Digital</h4>
  <a-space direction="horizontal" align="start">
    <a-card
      hoverable
      title="Módulo Fraseológico"
      style="width: 400px; height: 200px"
    >
      <p>Módulo de estudio de las Unidades Fraseológicas</p>
      <br />
      <a-button @click="onStudies">Estudios</a-button>
    </a-card>
    <a-card
      hoverable
      title="Módulo Lexicográfico"
      style="width: 400px; height: 200px"
    >
      <p>
        Módulo de gestión del lemario como parte de la confección de un
        diccionario de fraseologismos
      </p>
      <a-button @click="onSources">Fuentes</a-button>
    </a-card>
  </a-space>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  methods: {
    onStudies() {
      this.$router.push('studies');
    },
    onSources() {
      this.$router.push('sources');
    },
  },
});
</script>
