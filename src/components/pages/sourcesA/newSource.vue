<template>
  <h4>Agregar Nueva Fuente al Proyecto de Lemario</h4>
  <br />
  <div>
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="General">
        <a-form ref="formRef" :model="source" :rules="rules">
          <a-form-item
            ref="name"
            label="Nombre de la Fuente"
            name="name"
            :label-col="labelColModal"
            :wrapper-col="wrapperColModal"
          >
            <a-input
              v-model:value="source.name"
              placeholde="Nombre de la Fuente"
            ></a-input>
          </a-form-item>
          <a-form-item
            ref="ref"
            label="Referencia"
            name="ref"
            :label-col="labelColModal"
            :wrapper-col="wrapperColModal"
          >
            <a-textarea
              v-model:value="source.ref"
              placeholder="Referencia de la Fuente"
              allow-clear
            />
          </a-form-item>
          <a-form-item
            ref="type"
            label="Datos de clasificación"
            name="type"
            :label-col="labelColModal"
            :wrapper-col="wrapperColModal"
          >
            <a-cascader
              :options="options"
              placeholder="Seleccione una Tipo"
              @change="handleOptionsChange"
            />
          </a-form-item>
          <a-form-item
            ref="URL"
            label="URL de la Fuente"
            name="URL"
            :label-col="labelColModal"
            :wrapper-col="wrapperColModal"
          >
            <a-input
              v-model:value="source.URL"
              placeholde="URL de la Fuente"
            ></a-input>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Especificaciones" force-render>
        <a-form :model="source">
          <div v-show="source.type === ''">
            <h4>
              Debe seleccionar un tipo de fuente para poder especificar otros
              datos
            </h4>
          </div>
          <div v-show="source.type === 'Metalinguística'">
            <a-form-item
              ref="dictionaryType"
              label="Tipo de diccionario"
              name="dictionaryType"
              :label-col="labelColModal"
              :wrapper-col="wrapperColModal"
            >
              <a-select v-model:value="source.dictionaryType">
                <a-select-option
                  v-for="dictionaryType in dictionariesTypes"
                  :key="dictionaryType"
                >
                  {{ dictionaryType }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              ref="century"
              label="Siglo"
              name="century"
              :label-col="labelColModal"
              :wrapper-col="wrapperColModal"
            >
              <a-input
                v-model:value="source.century"
                placeholde="Siglo"
              ></a-input>
            </a-form-item>
            <div
              v-show="
                source.support === 'Internet' &&
                source.type === 'Metalinguística'
              "
            >
              <a-form-item
                ref="library_name"
                label="Biblioteca Virtual"
                name="library_name"
                :label-col="labelColModal"
                :wrapper-col="wrapperColModal"
              >
                <a-input
                  v-model:value="source.library_name"
                  placeholde="Nombre de la biblioteca Virtual"
                ></a-input>
              </a-form-item>
              <a-form-item
                ref="url_location"
                label="Localización URL"
                name="url_location"
                :label-col="labelColModal"
                :wrapper-col="wrapperColModal"
              >
                <a-input
                  v-model:value="source.url_location"
                  placeholde="Localización URL"
                ></a-input>
              </a-form-item>
            </div>
          </div>
          <div v-show="source.type === 'Linguística'">
            <a-form-item
              ref="bloque"
              label="Bloque de la Fuente"
              name="bloque"
              :label-col="labelColModal"
              :wrapper-col="wrapperColModal"
            >
              <a-select
                v-model:value="source.bloque"
                @change="handleBloqueChange"
              >
                <a-select-option v-for="bloque in bloques" :key="bloque">
                  {{ bloque }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              ref="theme"
              label="Clasificación temática"
              name="theme"
              :label-col="labelColModal"
              :wrapper-col="wrapperColModal"
            >
              <a-select v-model:value="source.theme">
                <a-select-option v-for="tema in temas" :key="tema">
                  {{ tema }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              v-show="source.support === 'Publicación Periódica'"
              ref="session_p"
              label="Sección del Periódico"
              name="session_p"
              :label-col="labelColModal"
              :wrapper-col="wrapperColModal"
            >
              <a-select v-model:value="source.session_p">
                <a-select-option v-for="sp in session_p" :key="sp">
                  {{ sp }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              v-show="source.support === 'Publicación Periódica'"
              ref="magazine_type_p"
              label="Tipo de revista"
              name="magazine_type_p"
              :label-col="labelColModal"
              :wrapper-col="wrapperColModal"
            >
              <a-select v-model:value="source.magazine_type_p">
                <a-select-option v-for="mtp in magazine_type_p" :key="mtp">
                  {{ mtp }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </div>
          <div
            v-show="source.support === 'Audio' || source.support === 'Video'"
          >
            <a-form-item
              ref="speaker"
              label="Descripción del Hablante"
              name="speaker"
              :label-col="labelColModal"
              :wrapper-col="wrapperColModal"
            >
              <a-textarea
                v-model:value="source.speaker"
                placeholder="Tenga en cuenta los datos nombre, sexo, grupo etario, nivel educacional, profesión, ciudad de origen, provincia."
                allow-clear
              />
            </a-form-item>
            <a-form-item
              ref="typology"
              label="Tipología"
              name="typology"
              :label-col="labelColModal"
              :wrapper-col="wrapperColModal"
            >
              <a-select v-model:value="source.typology">
                <a-select-option v-for="typology in typologies" :key="typology">
                  {{ typology }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              ref="broadcastMedium"
              label="Medio de Difusión"
              name="broadcastMedium"
              :label-col="labelColModal"
              :wrapper-col="wrapperColModal"
            >
              <a-select v-model:value="source.broadcastMedium">
                <a-select-option
                  v-for="broadcastMedium in broadcastMediums"
                  :key="broadcastMedium"
                >
                  {{ broadcastMedium }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              ref="recording_date"
              label="Fecha de grabación"
              name="recording_date"
              :label-col="labelColModal"
              :wrapper-col="wrapperColModal"
            >
              <a-date-picker
                style="width: 300px"
                placeholder="Seleccione la Fecha de grabación"
                :default-open-value="moment('YYYY-MM-DD')"
                @change="onChangeRecording_date"
              />
            </a-form-item>
            <a-form-item
              ref="broadcast_date"
              label="Fecha de emisión"
              name="broadcast_date"
              :label-col="labelColModal"
              :wrapper-col="wrapperColModal"
            >
              <a-date-picker
                style="width: 300px"
                placeholder="Seleccione la Fecha de emisión"
                :default-open-value="moment('YYYY-MM-DD')"
                @change="onChangeBroadcast_date"
              />
            </a-form-item>
            <a-form-item
              ref="cantMin"
              label="Tiempo de duración"
              name="cantMin"
              :label-col="labelColModal"
              :wrapper-col="wrapperColModal"
            >
              <a-time-picker
                style="width: 300px"
                placeholder="Seleccione el Tiempo de duración"
                :default-open-value="moment('00:00:00', 'HH:mm:ss')"
                @change="setCantMin"
              />
            </a-form-item>
          </div>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
  <div style="text-align: right">
    <a-button
      key="submit"
      type="primary"
      style="margin-right: 5px"
      @click="submit"
    >
      Crear
    </a-button>
    <a-button key="back" @click="goBack">Cancelar</a-button>
  </div>
</template>
<script lang="ts">
import 'ant-design-vue/lib/upload/style';
import {
  MinusCircleFilled,
  PlusOutlined,
  PlusSquareFilled,
} from '@ant-design/icons-vue';
import { Sources } from '@/graphql/modules/sourcesA/model';
import VueDocPreview from 'vue-doc-preview';
import { InboxOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';
import { axiosClientPostImage } from '@/plugins/axios';
import moment from 'moment';

export default defineComponent({
  components: {
    InboxOutlined,
    MinusCircleFilled,
    PlusOutlined,
    PlusSquareFilled,
    VueDocPreview,
  },
  data() {
    const rules = {
      name: [
        {
          required: true,
          message: 'Por favor escriba el nombre de la fuente',
          trigger: 'blur',
        },
      ],
      ref: [
        {
          required: true,
          message: 'Por favor escriba la referencia de la fuente',
          trigger: 'blur',
        },
      ],
      type: [
        {
          required: true,
          message: 'Por favor seleccione el tipo de la fuente',
          trigger: 'blur',
        },
      ],
    };
    const options = [
      {
        value: 'Linguística',
        label: 'Linguística',
        children: [
          {
            value: 'Escrita',
            label: 'Escrita',
            children: [
              {
                value: 'Libro',
                label: 'Libro',
              },
              {
                value: 'Publicación Periódica',
                label: 'Publicación Periódica',
              },
              {
                value: 'Internet',
                label: 'Internet',
              },
            ],
          },
          {
            value: 'Oral',
            label: 'Oral',
            children: [
              {
                value: 'Audio',
                label: 'Audio',
              },
              {
                value: 'Video',
                label: 'Video',
              },
            ],
          },
        ],
      },
      {
        value: 'Metalinguística',
        label: 'Metalinguística',
        children: [
          {
            value: 'Escrita',
            label: 'Escrita',
            children: [
              {
                value: 'Libro',
                label: 'Libro',
              },
              {
                value: 'Internet',
                label: 'Internet',
              },
            ],
          },
        ],
      },
    ];
    const bloques = ['Ficción', 'NoFicción'];
    const theme = {
      Ficción: ['Novela', 'Relato', 'Teatro'],
      NoFicción: [
        'Ocio y vida cotidiana',
        'Artes y cultura',
        'Ciencias sociales, creencias y pensamiento',
        'Ciencias exactas, tecnología y Salud',
        'Política, economía y justicia',
      ],
    };
    const broadcastMediums = ['Cadena de radio', 'Cadena de TV', 'Internet'];
    const session_p = [
      'Nacionales',
      'Internacionales',
      'Culturales',
      'Deportes',
      'Economía',
      'Otra',
    ];
    const magazine_type_p = ['Especializada', 'No especializada'];
    const typologies = [
      'Conversación',
      'Debate',
      'Discurso',
      'Entrevista',
      'Entrevista semidirigida',
      'Magacines y variedades',
      'Noticia',
      'Publicidad',
      'Reportajes y documentales',
      'Retransmisiones deportivas',
      'Sorteos y concursos',
      'Tertulia',
      'Otros',
    ];
    const dictionariesTypes = [
      'Normativo',
      'De uso práctico',
      'Monolingües',
      'Bilingües',
      'De aprendizaje',
      'Etimológicos',
      'De sinónimos y antónimos',
      'Especializado',
      'Inverso o de rimas',
      'De gramática',
      'De dudas',
      'Tesauro',
      'Ideológico o de ideas afines',
      'Diccionario analógico conceptual',
      'Visual o de imágenes',
      'Enciclopédico',
    ];
    const source = {
      name: '',
      ref: '',
      file: '',
      type: '',
      subType: '',
      support: '',

      // linguisticas libro o prensa
      bloque: '',
      theme: '',
      provice_p: '',
      session_p: '',
      magazine_type_p: '',

      //linguisticas internet
      URL: '',

      //linguisticas audio o video
      cantMin: '',
      broadcastMedium: '',
      typology: '',
      speaker: '',
      recording_date: '',
      broadcast_date: '',

      //metalinguisticas
      dictionaryType: '',
      century: '',
      library_name: '',
      url_location: '',
    };
    const formItemLayoutWithOutLabelModal = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    const formItemLayoutModal = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    return {
      options,
      rules,
      bloques,
      theme,
      session_p,
      magazine_type_p,
      temas: theme[bloques[0]],
      secondTema: theme[bloques[0]][0],
      broadcastMediums,
      typologies,
      dictionariesTypes,
      selectedFile: null,
      formItemLayoutWithOutLabelModal,
      source,
      labelColModal: { span: 8 },
      wrapperColModal: { span: 14 },
      file: null,
    };
  },
  methods: {
    moment,
    setCantMin(time) {
      let t = new Date(time);
      let h = t.getHours();
      let m = t.getMinutes();
      let s = t.getSeconds();
      let duracion = h + 'horas : ' + m + 'minutos : ' + s + 'segundos';
      this.source.cantMin = duracion;
      console.log('cantMin', this.source.cantMin);
    },
    onChangeRecording_date(date) {
      let d = new Date(date);
      let month = date.format('M');
      let day = date.format('D');
      let year = date.format('YYYY');
      let fecha = day + '-' + month + '-' + year;
      this.source.recording_date = fecha;
      console.log('date', fecha);
    },
    onChangeBroadcast_date(date, dateString) {
      let d = new Date(date);
      let month = date.format('M');
      let day = date.format('D');
      let year = date.format('YYYY');
      let fecha = day + '-' + month + '-' + year;
      this.source.broadcast_date = fecha;
      console.log('date', fecha);
    },
    handleBloqueChange(value) {
      this.temas = this.theme[value];
      this.secondTema = this.theme[value][0];
    },
    callback(key) {
      console.log(key);
    },
    submit() {
      console.log(this.source);

      if (!(this.selectedFile === null)) {
        const element = this.selectedFile;
        const extensionFile = '.' + element.name.split('.')[1];
        const date = Date.now();
        this.source.file = 'source_' + date + extensionFile;
        console.log('file name', this.source.file);

        const formData = new FormData();
        console.log(this.selectedFile);
        formData.append('file', this.selectedFile);
        axiosClientPostImage
          .post(`/${this.source.file}`, formData)
          .then(function () {
            console.log('SUCCESS!!');
          })
          .catch(function () {
            console.log('FAILURE!!');
          });
      }

      Sources.createSource(this.source);
      this.$router.push({ name: 'sources' });
    },
    goBack() {
      this.$router.push({ name: 'sources' });
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    handleOptionsChange(value) {
      console.log('valueeeeeeeeeeee', value);

      if (value[0] === 'Linguística') {
        this.source.type = value[0];
        this.source.subType = value[1];
        this.source.support = value[2];
      }
      if (value[0] === 'Metalinguística') {
        this.source.type = value[0];
        this.source.subType = value[1];
        this.source.support = value[2];
      }
      console.log('source', this.source);
    },
  },
});
</script>
