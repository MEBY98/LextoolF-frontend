<!-- <template>
  <div>
    <a-table
      size="small"
      :scroll="{ x: '130%', y: 370 }"
      :pagination="false"
      :columns="columns"
      :data-source="data"
      bordered
    >
      <template #source="{ text }">
        <img width="270" :src="getSrc(text)" alt="" />
      </template>
      <template
        v-for="(col,i) in columns"
        #[col.dataIndex]="{ text, record }"
        :key="col.dataIndex"
      >
        <div>
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="
              (e) => handleChange(e.target.value, record.key, col.dataIndex)
            "
          />
          <template v-else>
            <template v-for="(desc, i) in text" :key="i">
              <span
                :class="{
                  'border-bottom pb-2 mb-2':
                    text.length > 1 && i != text.length - 1,
                }"
                class="w-100 d-block"
              >
                {{ `${desc}` }}
              </span>
            </template>
          </template>
        </div>
      </template>
      <template #operation="{ record }">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a class="mr-3" @click="() => save(record.key)">Guardar</a>
            <a-popconfirm
              title="Desea cancelar?"
              @confirm="() => cancel(record.key)"
            >
              <a>Cancelar</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record.key)">Editar</a>
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import Table from 'ant-design-vue/lib/table';
import Input from 'ant-design-vue/lib/input';
import Popconfirm from 'ant-design-vue/lib/popconfirm';
import { defineComponent } from 'vue';

const columnsWidth = {
  Lemas: 250,
  'Unidad Fraseológica': 320,
  ubicación: 250,
  clasificación: 200,
  'Información gramatical': 200,
  estilístico: 200,
  frecuencia: 200,
  diatópico: 200,
  'transición semántica': 200,
  pragmática: 200,
  diatécnica: 200,
  DEFINICIÓN: 500,
  Ejemplo: 500,
  sublemas_UF: 250,
  'lematización / sublematización': 250,
  gramatical: 250,
};

export default defineComponent({
  components: {
    'a-table': Table,
    'a-input': Input,
    'a-popconfirm': Popconfirm,
  },

  props: {
    entriesStr: { type: String },
    excelHash: { type: String },
  },
  data() {
    return {
      // entries
      // sheetName
      data: [],
      cacheData: [],
      columns: [
        {
          title: 'Fuente',
          dataIndex: 'source',
          width: 300,
          scopedSlots: { customRender: 'source' },
        },
        {
          title: 'Lemas',
          dataIndex: 'headword',
          width: 300,
          scopedSlots: { customRender: 'headword' },
        },
        {
          title: 'UF',
          dataIndex: 'UF',
          width: 300,
          scopedSlots: { customRender: 'UF' },
        },
        {
          title: 'Operación',
          dataIndex: 'operation',
          width: 250,
          scopedSlots: { customRender: 'operation' },
        },
      ],
    };
  },
  methods: {
    getSrc(text) {
      const hash = this.excelHash.slice(0, this.excelHash.length - 5);
      return `http://localhost:12000/excels/${hash}/${this.sheetName}/${text}.png`;
    },
    // handleChange(value, key, column) {
    //   const newData = [...this.data];
    //   const target = newData.filter((item) => key === item.key)[0];
    //   if (target) {
    //     target[column] = value;
    //     this.data = newData;
    //   }
    // },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      if (target) {
        delete target.editable;
        this.data = newData;
        this.cacheData = newData.map((item) => ({ ...item }));
      }
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter((item) => key === item.key)[0]
        );
        delete target.editable;
        this.data = newData;
      }
    },
  },
});
</script>
<style lang="css" scoped>
.ant-table td {
  white-space: nowrap;
}
.editable-row-operations a {
  font-weight: 400;
  color: #2098fe;
}
</style> -->
