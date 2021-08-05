<template>
  <a-modal
    :visible="visible"
    title="Seleccione la Ubicacion de la UF"
    :footer="null"
    @cancel="closeModal"
    @ok="addUF"
  >
    <a-radio-group
      v-model:value="selectedUbication"
      @change="handleRadioChange"
    >
      <a-radio
        v-for="(u, index) in $store.ubications"
        :key="index"
        :style="radioStyle"
        :value="u"
      >
        {{ u.ubication }}
      </a-radio>
    </a-radio-group>
    <div class="d-flex flex-row-reverse">
      <a-button type="primary" @click="addUF">Agregar</a-button>
      <a-button class="mr-2" @click="closeModal">Cancelar</a-button>
    </div>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
export default defineComponent({
  props: {
    visible: {
      type: Boolean,
    },
  },
  emits: ['add-uf', 'close'],
  setup() {
    const radioStyle = reactive({
      display: 'block',
      height: '30px',
      lineHeight: '30px',
      fontWeight: '500',
    });
    return {
      radioStyle,
    };
  },
  data() {
    const selectedUbication = {
      id: '',
      clasifications: [
        {
          id: '',
          clasification: '',
        },
      ],
      ubication: '',
    };
    return {
      selectedUbication,
    };
  },
  methods: {
    addUF() {
      this.$emit('add-uf', this.selectedUbication);
      this.selectedUbication = {
        id: '',
        clasifications: [
          {
            id: '',
            clasification: '',
          },
        ],
        ubication: '',
      };
    },
    closeModal() {
      this.selectedUbication = {
        id: '',
        clasifications: [
          {
            id: '',
            clasification: '',
          },
        ],
        ubication: '',
      };
      this.$emit('close');
    },
    handleRadioChange(event) {
      console.log('element', event);
      this.selectedUbication = event.target.value;
      console.log('this.selectedUbication', this.selectedUbication);
    },
  },
});
</script>
