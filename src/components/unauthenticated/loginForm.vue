<template>
  <div class="login-form-wrapper">
    <v-form class="login-form">
      <v-text-field v-model="username" label="Username" required></v-text-field>
      <v-text-field
        :type="!showPassword ? 'password' : 'text'"
        v-model="password"
        label="Password"
        required
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
    </v-form>
    <div class="custom-button-wrapper">
      <v-btn
        depressed
        class="custom-button"
        :disabled="!validate()"
        @click="_=>submit()"
        :class="{validated: validate()}"
        :style="'background-color: #ec7063'"
      >Sign in</v-btn>
    </div>
  </div>
</template>
<script>
import apiService from '@/apiConfig/eventService'
export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
      showPassword: false
    }
  },

  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword
    },
    validate() {
      if (this.username.length > 0 && this.password.length > 0) {
        return true
      }
      return false
    },

    submit() {
      // console.log('username: ', this.username, ' password: ', this.password)
      const { username, password } = this
      apiService.userLogin({ username, password })
        .then(response => {
          console.log('res>>>>', response)
        }).catch(error => {
          console.log(error.response.data)
        })
    }
  }

}
</script>

<style scoped>
@media screen and (min-width: 992px) {
  .login-form {
    width: 40%;
    margin: 0 auto;
  }
}

@media screen and (max-width: 992px) {
  .login-form {
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

.validated {
  color: white;
  background-color: #ec7063;
}
</style>
