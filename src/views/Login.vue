<template>
  <div class="login">
    <Banner :for="className" />
    <LoginForm />
    <div class="login-page-links">
      <a
        href="#"
        class="login-page-link"
        style="color: #ec7063;text-decoration: none;"
      >Forgot Password</a>
      <a href="#" class="login-page-link" style="color: #ec7063;text-decoration: none;">Sign Up</a>
    </div>
  </div>
</template>

<script>
import Banner from '../components/unauthenticated/banner.vue'
import LoginForm from '../components/unauthenticated/loginForm.vue'
export default {
  name: 'login',
  data() {
    return {
      className: 'login-page'
    }
  },
  components: {
    Banner,
    LoginForm
  }

}
</script>

<style>
.login-page-links {
  margin-top: 5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
