/* eslint-disable vue/require-default-prop */
import Croppie from 'croppie';
import { h, defineComponent } from 'vue';

export default defineComponent({
  name: 'VueCroppie',
  props: {
    boundary: Object,
    customClass: String,
    enableExif: Boolean,
    enableOrientation: {
      type: Boolean,
      default: true,
    },
    enableResize: {
      type: Boolean,
      default: true,
    },
    enableZoom: {
      type: Boolean,
      default: true,
    },
    enforceBoundary: {
      type: Boolean,
      default: true,
    },
    mouseWheelZoom: {
      type: [Boolean, String],
      default: true,
    },
    showZoomer: {
      type: Boolean,
      default: true,
    },
    croppieInitialized: {
      type: Function,
      default: function () {
        return {};
      },
    },
    viewport: {
      type: Object,
      default: function () {
        return {
          width: 200,
          height: 200,
          type: 'square',
        };
      },
    },
    minZoom: Number,
    maxZoom: Number,
  },
  emits: ['update', 'result', 'cropped'],
  data() {
    return {
      croppie: null,
    };
  },
  mounted() {
    this.initCroppie();
  },
  methods: {
    initCroppie() {
      let el = this.$refs.croppieContainer;

      let options = {
        enableExif: this.enableExif,
        enableOrientation: this.enableOrientation,
        enableZoom: this.enableZoom,
        enableResize: this.enableResize,
        enforceBoundary: this.enforceBoundary,
        mouseWheelZoom: this.mouseWheelZoom,
        viewport: this.viewport,
        showZoomer: this.showZoomer,
        minZoom: this.minZoom,
        maxZoom: this.maxZoom,
      };

      if (this.boundary) {
        options.boundary = this.boundary;
      }

      el.addEventListener('update', (ev) => {
        this.$emit('update', ev.detail);
      });

      this.croppie = new Croppie(el, options);

      this.croppieInitialized();
    },
    bind(options) {
      return this.croppie.bind(options);
    },
    destroy() {
      this.croppie.destroy();
    },
    get(cb) {
      if (cb) {
        cb(this.croppie.get());
      } else {
        return this.croppie.get();
      }
    },
    rotate(angle) {
      this.croppie.rotate(angle);
    },
    setZoom(value) {
      this.croppie.setZoom(value);
    },
    result(options, cb) {
      if (!options) options = { type: 'base64' };
      return this.croppie.result(options).then((output) => {
        if (!cb) {
          this.$emit('result', output);
        } else {
          cb(output);
        }
        return output;
      });
    },
    refresh() {
      this.croppie.destroy();
      this.initCroppie();
    },
  },
  render() {
    return h('div', {
      class: this.customClass,
      ref: 'croppieContainer',
      id: 'croppieContainer',
    });
  },
});
