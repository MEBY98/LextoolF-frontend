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
      <div class="tx-center">
        La aplicación perfecta para crear diccionarios
      </div>
      <v-form ref="form" :validations="validations" :state="{ credentials }">
        <a-space class="w-100" direction="vertical" :size="10">
          <v-input
            v-model="credentials.name"
            feather="user"
            size="large"
            :success-feed="false"
            placeholder="Nombre"
            name="name"
            type="name"
          />
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
            @keypress.stop.enter="register"
          />
        </a-space>
      </v-form>
      <button
        type="submit"
        class="btn btn-primary bg-primary btn-block waves-effect waves-light"
      >
        Crear cuenta
      </button>
      <div class="mg-t-40 tx-center text-dark">
        Ya tienes una cuenta?
        <router-link class="tx-info" to="/login">Iniciar sesión</router-link>
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
    registerLoading: false,
    validations: {
      credentials: {
        email: { required, email },
        password: { required },
        name: { required },
      },
    },
    credentials: {
      email: '',
      password: '',
      name: '',
    },
  }),
  computed: {},
  methods: {
    async register() {
      this.registerLoading = true;
      const result = await AuthService.register(this.credentials);
      if (result.data?.registerUser?.status == 200) {
        this.$router.push('/login');
      } else {
        this.$error({
          title: 'Ha ocurrido un error',
          content:
            'Ha ocurrido un error mientras se creaba su cuenta. Intente otra vez',
        });
      }

      this.registerLoading = false;
    },
  },
});
</script>
