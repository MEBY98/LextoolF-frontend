<template>
  <div
    class="row py-0 upload-excel-page m-0 bg-white card card-sales row-sm mg-b-20"
  >
    <v-form ref="form" :validations="validations" :state="{ data }">
      <v-input
        v-model="data.excelName"
        label="Nombre del excel"
        size="large"
        name="excelName"
      />

      <div class="mb-4">
        <label for="" class="fw-500">Referencia</label>
        <a-textarea v-model:value="data.reference" :rows="4"></a-textarea>
      </div>

      <div class="flexR border-bottom pb-4">
        <div
          :style="{ cursor: file ? 'not-allowed !important' : '' }"
          class="upload-excel rounded px-3 flex-column flex-center justify-center align-center u-pointer"
          @click="!file ? $refs.inputFile.click() : () => {}"
        >
          <input
            ref="inputFile"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            type="file"
            style="display: none"
            @change="handleChange"
          />
          <p class="mb-3">
            <inbox-outlined />
          </p>
          <h6 class="text-center">
            Arrastre hasta aquí o haga click para subir archivo
          </h6>
        </div>

        <div
          v-if="file"
          class="h-fit-content position-relative border p-2 align-center rounded hoverable flexC ml-4"
        >
          <ExcelIcon class="mb-3" style="height: auto; width: 100px" />
          {{ file.name }}

          <span
            class="span-close border cursor-pointer flex-center justify-center rounded-circle shadow-sm"
            @click="deleteFile"
          >
            <feather size="15" type="x" />
          </span>
        </div>
      </div>
    </v-form>

    <div class="flex mt-4">
      <a-button
        type="primary"
        :disabled="!file || !data.excelName"
        @click="upload"
      >
        Subir
      </a-button>
    </div>
  </div>

  <modal-excel-description
    v-if="result"
    v-model:visible="showModalExcelDescription"
    :excel-data="result"
  />
</template>

<script lang="ts">
// import Upload from 'ant-design-vue/lib/upload';
import 'ant-design-vue/lib/upload/style';
import { defineComponent } from 'vue';
import { required } from '@vuelidate/validators';
import { app } from '@/main';
import { InboxOutlined } from '@ant-design/icons-vue';
import ExcelIcon from '@/components/shared/icons/ExcelIcon.vue';
import { sourceAxiosClient } from '@/plugins/axios';
import ModalExcelDescription from './ModalExcelDescription.vue';

// app.use(Upload);
export default defineComponent({
  components: {
    InboxOutlined,
    ExcelIcon,
    ModalExcelDescription,
  },
  props: {},
  setup() {
    return {};
  },
  data: () => ({
    file: null,
    result: null,
    showModalExcelDescription: false,
    validations: {
      data: {
        excelName: { required },
      },
    },
    data: {
      excelName: '',
      reference: '',
    },
  }),
  computed: {},
  methods: {
    clear() {
      (this.$refs.inputFile as any).value = null;
      this.file = null;
      this.data.reference = '';
      (this.$refs.form as any).clear();
    },
    deleteFile() {
      (this.$refs.inputFile as any).value = null;
      this.file = null;
    },
    handleChange(e) {
      this.file = e.target.files[0];
    },
    async upload() {
      const fd = new FormData();
      fd.append('excel', this.file, this.file.name);
      fd.append('name', this.data.excelName);
      fd.append('reference', this.data.reference);
      this.$store.layout.loading('Espere mientras se procesa el excel');
      const { data } = await sourceAxiosClient.post('excels', fd);
      this.$store.layout.toggleLoading();
      if (data?.status === 200) {
        this.result = data.excel;
        this.clear();
        this.showModalExcelDescription = true;
      } else {
        this.$error({
          title: 'Upss, ocurrió un error al subir el excel. Intente otra vez',
        });
      }
    },
  },
});
</script>
<style lang="scss">
.upload-excel-page {
  .upload-excel {
    background: #d3d3d34a;
    width: 200px;
    border: 1px dashed #b9b9b9;
    height: 200px;
    transition: all 0.2s;

    .anticon {
      svg {
        font-size: 40px;
        color: #2196f3;
      }
    }

    &:hover {
      border: 1px dashed #2196f3;
    }
  }
  .span-close {
    position: absolute;
    top: -7px;
    right: -7px;
    cursor: pointer;
    width: 26px;
    height: 26px;

    background: red;
    position: absolute;
    svg {
      color: white;
    }
  }
}
</style>
