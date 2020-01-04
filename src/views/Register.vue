<template>
  <div class="register">
    <Banner :for="className" />
    <RegisterForm @submit="submit($event)" :data="{}" />
  </div>
</template>

<script>
import apiService from '@/apiConfig/authService'
import Banner from '../components/unauthenticated/banner.vue'
import RegisterForm from '../components/unauthenticated/registerForm.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'register',
  data() {
    return {
      className: 'register-page'
    }
  },
  components: {
    Banner,
    RegisterForm
  },
  methods: {
    checkCurrentLogin() {
      if (this.currentUser) {
        this.$router.push('/')
        this.$store.dispatch('changePage', '/')
      }
    },

    submit(data) {
      this.$store.dispatch('loader', { show: true, message: 'Registering' })
      const { username, password, email, age, checkbox } = data
      apiService.userRegister({ username, password, email, age, checkbox })
        .then(response => {
          this.$store.dispatch('loader', { show: false, message: '' })
          this.$router.push({ path: '/login' })
          this.$store.dispatch('changePage', '/login')
          this.$store.dispatch('showSnackbar', { show: true, color: 'success', text: 'You are Successfully Registered.' })
        }).catch(error => {
          this.$store.dispatch('loader', { show: false, message: '' })
          if (error.response !== 'undefined') {
            let errorMessage = ''
            // check if errors always come as array
            const errors = error.response.data.message
            if (Array.isArray(errors)) {
              errors.forEach(error => {
                errorMessage += error + '\n'
              })
            } else {
              errorMessage = errors
            }

            this.$store.dispatch('showSnackbar', { show: true, color: 'error', text: errorMessage || 'Something went wrong while registering.' })
          }
        })
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

<style>
custom-button {
  color: red;
  text-decoration: underline;
}
</style>
