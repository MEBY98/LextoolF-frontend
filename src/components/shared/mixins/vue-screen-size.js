export const VueScreenSize = {
  computed: {
    $w() {
      return this.__w || this.getScreenWidth();
    },
    $h() {
      return this.__h || this.getScreenHeight();
    },
  },
  data() {
    return {
      __w: null,
      __h: null,
    };
  },
  methods: {
    getScreenWidth() {
      return (
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      );
    },
    getScreenHeight() {
      return (
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
      );
    },
    handleResize(event) {
      this.__w = this.getScreenWidth();
      this.__h = this.getScreenHeight();
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
};
