<template>
  <div class="register-form-wrapper">
    <v-form class="register-form" v-model="valid" ref="form">
      <v-text-field
        v-model="username"
        label="Username"
        :rules="[v => !!v || 'Username is required']"
      ></v-text-field>
      <v-text-field v-model="email" label="Email" :rules="[v => !!v || 'Email is required']"></v-text-field>

      <v-text-field
        :type="!showPassword ? 'password' : 'text'"
        v-model="password"
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
        v-model="confirmPassword"
        label="Confirm Password"
        :rules="addRules"
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
        v-model="age"
        :items="['0-10', '10-15', '15-20', 'Above 20']"
        label="Age"
        :rules="[v => !!v || 'Age is required']"
      ></v-select>

      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
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
      >Sign Up</v-btn>
    </div>
  </div>
</template>
<script>
import apiService from '@/apiConfig/authService'

export default {
  name: 'registerForm',
  data() {
    return {
      valid: true,
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: '',
      showPassword: false,
      checkbox: false
    }
  },

  computed: {
    addRules() {
      const rules = []
      if (this.confirmPassword && this.password) {
        const rule = v => (!!v && v) === this.password ||
          'Passwords do not match'
        rules.push(rule)
      }

      if (this.confirmPassword === '') {
        const rule = v => !!v || 'You must confirm password!'
        rules.push(rule)
      }
      return rules
    }
  },

  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword
    },
    validate() {
      if (this.username.length > 0 && this.password.length > 0 && this.email.length > 0 && this.confirmPassword.length > 0 && this.age.length > 0) {
        return true
      }
      return false
    },

    submit() {
      this.$store.dispatch('loader', { show: true, message: 'Registering' })
      const { username, password, email, age } = this
      apiService.userRegister({ username, password, email, age })
        .then(response => {
          // console.log('res>>>>', response)
          this.$store.dispatch('loader', { show: false, message: '' })
          this.$router.push({ path: '/login' })
          this.$store.dispatch('changePage', '/login')
          this.$store.dispatch('showSnackbar', { show: true, color: 'success', text: 'You are Successfully Registered.' })
        }).catch(error => {
          this.$store.dispatch('loader', { show: false, message: '' })
          if (error.response !== 'undefined') {
            let errorMessage = ''
            const errors = error.response.data.message
            errors.forEach(error => {
              errorMessage += error + '\n'
            })
            console.log('emsg>>>>>', errorMessage)
            this.$store.dispatch('showSnackbar', { show: true, color: 'error', text: errorMessage || 'Something went wrong while registering.' })
          }
        })
    }
  }
}
</script>

<style scoped>
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
