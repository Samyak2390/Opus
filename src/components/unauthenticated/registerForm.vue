<template>
  <div class="register-form-wrapper">
    <v-form class="register-form" v-model="valid" ref="form">
      <v-text-field
        v-model="data.username"
        label="Username"
        :rules="[v => !!v || 'Username is required']"
      ></v-text-field>
      <v-text-field v-model="data.email" label="Email" :rules="[v => !!v || 'Email is required']"></v-text-field>

      <v-text-field
        :type="!showPassword ? 'password' : 'text'"
        v-model="data.password"
        label="Password"
        :rules="[v => !!v || 'Password is required']"
      >
        <template slot="append">
          <div v-if="showPassword">
            <v-icon @click="_=>toggleShowPassword()">mdi-eye</v-icon>
          </div>
          <div v-else>
            <v-icon @click="_=>toggleShowPassword()">mdi-eye-off</v-icon>
          </div>
        </template>
      </v-text-field>

      <v-text-field
        :type="!showPassword ? 'password' : 'text'"
        v-model="data.confirmPassword"
        label="Confirm Password"
        :rules="[ v => (!!v && v) === this.data.password || 'Passwords do not match', v => !!v || 'You must confirm password!']"
      >
        <template slot="append">
          <div v-if="showPassword">
            <v-icon @click="_=>toggleShowPassword()">mdi-eye</v-icon>
          </div>
          <div v-else>
            <v-icon @click="_=>toggleShowPassword()">mdi-eye-off</v-icon>
          </div>
        </template>
      </v-text-field>

      <v-select
        v-model="data.age"
        :items="['0-10', '10-15', '15-20', 'Above 20']"
        label="Age"
        :rules="[v => !!v || 'Age is required']"
      ></v-select>

      <v-checkbox
        v-if="page==='/register'"
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Agree Terms and Conditions?"
        required
      ></v-checkbox>
    </v-form>
    <div class="custom-button-wrapper">
      <v-btn
        depressed
        class="custom-button"
        :disabled="!valid"
        @click="_=>submit()"
        :style="'background-color: #ec7063;color: white;'"
      >{{page==='/register'?'Sign Up': 'Update'}}</v-btn>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'registerForm',
  data() {
    return {
      valid: true,
      showPassword: false,
      checkbox: false
    }
  },

  props: {
    data: Object
  },
  computed: {
    ...mapGetters({ page: 'currentPage' })
  },

  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword
    },
    validate() {
      if (this.data.username.length > 0 && this.data.password.length > 0 && this.data.email.length > 0 && this.data.confirmPassword.length > 0 && this.data.age.length > 0) {
        return true
      }
      return false
    },

    submit() {
      this.$emit('submit', this.data)
    }
  }
}
</script>

<style scoped>
.register-form-wrapper {
  padding: 30px 0;
}
@media screen and (min-width: 992px) {
  .register-form {
    width: 40%;
    margin: 0 auto;
  }
}

@media screen and (max-width: 992px) {
  .register-form {
    width: 70%;
    margin: 0 auto;
  }
}

.custom-button-wrapper {
  display: flex;
  justify-content: center;
}

.custom-button {
  width: 140px;
  border-radius: 15px;
  margin: 0 auto;
}
/*
.validated {
  color: white;
  background-color: #ec7063;
} */
</style>
