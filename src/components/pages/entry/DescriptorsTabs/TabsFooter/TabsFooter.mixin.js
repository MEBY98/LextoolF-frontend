export default {
  emits: ['save', 'go-next-tab', 'go-preview-tab', 'go-dictionaries'],
  methods: {
    save() {
      this.$emit('save');
    },
    goNextTab() {
      this.$emit('go-next-tab');
    },
    goPreviewTab() {
      this.$emit('go-preview-tab');
    },
    goDictionaries() {
      this.$emit('go-dictionaries');
    },
  },
};
