<template>
  <a-modal
    :visible="visible"
    title="Detalles de la Fuente"
    width="500px"
    :footer="null"
    @cancel="closeModal"
  >
    <a-form :model="selectedSourceData">
      <a-form-item :colon="false">
        <template #label>
          <span style="font-weight: 700">
            Nombre de la Fuente:
            <span style="font-weight: 500">{{ selectedSource.name }}</span>
          </span>
        </template>
      </a-form-item>
      <a-form-item :colon="false">
        <template #label>
          <span style="font-weight: 700">
            Referencia:
            <span style="font-weight: 500">{{ selectedSource.ref }}</span>
          </span>
        </template>
      </a-form-item>
      <a-form-item :colon="false">
        <template #label>
          <span style="font-weight: 700">
            Tipo:
            <span style="font-weight: 500">{{ selectedSource.type }}</span>
          </span>
        </template>
      </a-form-item>
      <a-form-item :colon="false">
        <template #label>
          <span style="font-weight: 700">
            Medio:
            <span style="font-weight: 500">{{ selectedSource.subType }}</span>
          </span>
        </template>
      </a-form-item>
      <div
        v-show="
          selectedSource.support === 'Libro' ||
          selectedSource.support === 'Prensa'
        "
      >
        <a-form-item :colon="false">
          <template #label>
            <span style="font-weight: 700">
              Soporte:
              <span style="font-weight: 500">{{ selectedSource.support }}</span>
            </span>
          </template>
        </a-form-item>
        <a-form-item :colon="false">
          <template #label>
            <span style="font-weight: 700">
              Bloque:
              <span style="font-weight: 500">{{ selectedSource.bloque }}</span>
            </span>
          </template>
        </a-form-item>
        <a-form-item :colon="false">
          <template #label>
            <span
              style="font-weight: 700"
              v-show="selectedSource.bloque === 'Ficción'"
            >
              Género
              <span style="font-weight: 500">{{ selectedSource.theme }}</span>
            </span>
            <span
              style="font-weight: 700"
              v-show="selectedSource.bloque === 'NoFicción'"
            >
              Tema
              <span style="font-weight: 500">{{ selectedSource.theme }}</span>
            </span>
          </template>
        </a-form-item>
        <a-form-item :colon="false">
          <template #label>
            <span style="font-weight: 700">
              Datos de Publicación:
              <span style="font-weight: 500">
                {{ selectedSource.publication }}
              </span>
            </span>
          </template>
        </a-form-item>
      </div>
      <div
        v-show="
          selectedSource.support === 'Audio' ||
          selectedSource.support === 'Video'
        "
      >
        <a-form-item :colon="false">
          <template #label>
            <span style="font-weight: 700">
              Soporte:
              <span style="font-weight: 500">{{ selectedSource.support }}</span>
            </span>
          </template>
        </a-form-item>
        <a-form-item :colon="false">
          <template #label>
            <span style="font-weight: 700">
              Descripción del Hablante:
              <span style="font-weight: 500">
                {{ selectedSource.speaker }}
              </span>
            </span>
          </template>
        </a-form-item>
        <a-form-item :colon="false">
          <template #label>
            <span style="font-weight: 700">
              Medio de Difusión:
              <span style="font-weight: 500">
                {{ selectedSource.broadcastMedium }}
              </span>
            </span>
          </template>
        </a-form-item>
        <a-form-item :colon="false">
          <template #label>
            <span style="font-weight: 700">
              Tipología:
              <span style="font-weight: 500">
                {{ selectedSource.typology }}
              </span>
            </span>
          </template>
        </a-form-item>
        <a-form-item :colon="false">
          <template #label>
            <span style="font-weight: 700">
              Duración:
              <span style="font-weight: 500">{{ selectedSource.cantMin }}</span>
            </span>
          </template>
        </a-form-item>
      </div>
      <div v-show="selectedSource.support === 'Internet'">
        <a-form-item :colon="false">
          <template #label>
            <span style="font-weight: 700">
              Soporte:
              <span style="font-weight: 500">{{ selectedSource.support }}</span>
            </span>
          </template>
        </a-form-item>
        <a-form-item :colon="false">
          <template #label>
            <span style="font-weight: 700">
              URL:
              <span style="font-weight: 500">{{ selectedSource.URL }}</span>
            </span>
          </template>
        </a-form-item>
      </div>
      <div v-show="selectedSource.subType === 'Diccionario'">
        <a-form-item :colon="false">
          <template #label>
            <span style="font-weight: 700">
              Tipo de Diccionario:
              <span style="font-weight: 500">
                {{ selectedSource.dictionaryType }}
              </span>
            </span>
          </template>
        </a-form-item>
        <a-form-item :colon="false">
          <template #label>
            <span style="font-weight: 700">
              Siglo:
              <span style="font-weight: 500">
                {{ selectedSource.century }}
              </span>
            </span>
          </template>
        </a-form-item>
      </div>
      <a-form-item :colon="false">
        <template #label>
          <span style="font-weight: 700">
            Archivo:
            <span style="font-weight: 500">{{ selectedSource.file }}</span>
          </span>
        </template>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
/* eslint-disable vue/no-mutating-props */
import { defineComponent, h } from 'vue';
import { CheckOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    CheckOutlined,
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['selectedSource', 'visible'],
  emits: ['close-modal'],
  data() {
    const selectedSourceData = {};
    return {
      selectedSourceData,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
  },
});
</script>
