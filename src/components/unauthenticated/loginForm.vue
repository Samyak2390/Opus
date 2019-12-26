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
import apiService from '@/apiConfig/authService'
// import router from '@/router'
import { mapGetters } from 'vuex'
export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      error: false // fix --> have to put error in state
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
      this.$store.dispatch('loader', { show: true, message: 'Signing in' })
      const { username, password } = this
      apiService.userLogin({ username, password })
        .then(response => {
          this.loginSuccessful(response)
        }).catch(error => {
          this.loginFailed(error.response.data.message)
        })
    },

    loginSuccessful(req) {
      this.$store.dispatch('loader', { show: false, message: '' })
      if (!req.token) {
        this.loginFailed()
        return
      }
      localStorage.token = req.token
      localStorage.setItem('user', JSON.stringify({ id: req.id, username: req.username, email: req.email, role: req.role }))
      this.error = false
      this.$store.dispatch('login')
      this.$router.push({ path: '/' })
      this.$store.dispatch('changePage', '/')
      this.$store.dispatch('showSnackbar', { show: true, color: 'success', text: 'You are logged in Successfully.' })
    },

    loginFailed(errorMessage) {
      this.$store.dispatch('loader', { show: false, message: '' })
      this.$store.dispatch('logout')
      delete localStorage.token
      this.$store.dispatch('showSnackbar', { show: true, color: 'error', text: errorMessage || 'Something went wrong while logging in.' })
    },

    // if logged in, redirect to home page **************** fix: have to put it in register form as well
    checkCurrentLogin() {
      if (this.currentUser) {
        this.$router.replace(this.$route.query.redirect || '/')
        this.$store.dispatch('changePage', '/')
      }
    }

  },

  updated() {
    this.checkCurrentLogin()
  },
  created() {
    this.checkCurrentLogin()
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
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
