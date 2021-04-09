<template>
  <div
    class="d-flex align-items-center justify-content-center bg-primary ht-100v"
  >
    <div
      class="login-wrapper wd-300 wd-xs-400 pd-25 pd-xs-40 bg-white rounded shadow-base"
    >
      <div class="signin-logo tx-center tx-28 tx-bold tx-inverse">
        <h2>
          <span class="text-primary">Lex</span>
          <span class="fw-500">tool 2.0</span>
        </h2>
      </div>
      <div class="tx-center mg-b-40">
        La aplicación perfecta para crear diccionarios
      </div>
      <v-form ref="form" :validations="validations" :state="{ credentials }">
        <a-space class="w-100" direction="vertical" :size="10">
          <v-input
            v-model="credentials.email"
            feather="mail"
            size="large"
            :success-feed="false"
            placeholder="Correo"
            name="email"
            type="email"
          />

          <v-input
            v-model="credentials.password"
            feather="lock"
            size="large"
            placeholder="Contraseña"
            :success-feed="false"
            name="password"
            html-type="password"
            @keypress.stop.enter="login"
          />
        </a-space>
      </v-form>

      <button
        type="submit"
        class="btn btn-primary bg-primary btn-block waves-effect waves-light"
        @click="login"
      >
        Iniciar sesión
      </button>
      <div class="mg-t-40 tx-center text-dark">
        No tienes una cuenta?
        <router-link class="tx-info" to="/signup">Crear cuenta</router-link>
      </div>
    </div>
    <!-- login-wrapper -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { email, required } from '@vuelidate/validators';
import { AuthService } from '@/graphql/modules/auth/auth.service';

export default defineComponent({
  components: {},
  props: {},
  setup() {
    return {};
  },
  data: () => ({
    validations: {
      credentials: {
        email: { required, email },
        password: { required },
      },
    },
    credentials: {
      email: 'dalfonsogcia@gmail.com',
      password: 'aaaaaaaaA',
    },
    loginLoading: false,
  }),
  computed: {},
  methods: {
    async login() {
      if (await (this.$refs.form as any).validate()) {
        this.loginLoading = true;
        const result = await AuthService.login(this.credentials);
        this.loginLoading = false;
        if (result.data?.login?.token) {
          this.$store.site.saveUserData(result.data.login);
        } else {
          this.$error({
            title: 'Usuario o contraseña incorrectos',
          });
        }
      }
    },
  },
});
</script>
