<template>
  <div class="container ml-4">
    <a-transfer
      :titles="['Sin agregar', 'Agregadas']"
      :data-source="letters"
      :render="(letter) => letter.title"
      :filter-option="filterOptionLettersTransfer"
      show-search
      :target-keys="targetKey"
      :locale="transferLocale"
      :list-style="{ height: '400px' }"
      @change="handleChange"
    ></a-transfer>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import UseLetters from './UseLetters';
export default defineComponent({
  props: {
    targetKey: {
      type: Array,
    },
  },
  emits: ['change'],
  setup(props, context) {
    const handleChange = (targetKeys: string[]) => {
      const result = targetKeys.sort((a, b) => a.localeCompare(b));
      context.emit('change', result);
    };
    const {
      letters,
      transferLocale,
      filterOptionLettersTransfer,
    } = UseLetters();
    return {
      filterOptionLettersTransfer,
      handleChange,
      transferLocale,
      letters,
    };
  },
});
</script>
