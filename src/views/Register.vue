<template>
  <div class="register">
    <Banner :for="className" />
    <RegisterForm />
  </div>
</template>

<script>
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
