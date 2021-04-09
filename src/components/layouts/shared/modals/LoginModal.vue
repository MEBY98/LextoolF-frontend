<template>
  <a-modal
    :visible="visible"
    title="Iniciar Sesión"
    :mask-closable="false"
    wrap-class-name="login-modal"
    :footer="null"
    :width="445"
    @cancel="$emit('update:visible', false)"
  >
    <LoginForm @login="$emit('update:visible', false)" />
  </a-modal>
</template>

<script lang="ts">
import LoginForm from '@/components/pages/auth/LoginForm.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    LoginForm,
  },
  props: {
    visible: Boolean,
  },
  emits: ['update:visible'],
  setup() {
    return {};
  },
  data: () => ({}),
  computed: {},
  methods: {
    cancel() {
      this.$emit('update:visible', false);
    },
  },
});
</script>
<style lang="scss">
.login-modal {
  .login-box {
    margin-bottom: 0 !important;
  }
  .ant-modal-header {
    display: none !important;
  }
  .ant-modal-body {
    padding: 0 !important;
  }
}
</style>
