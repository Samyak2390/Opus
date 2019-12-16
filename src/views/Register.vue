<template>
  <div class="register">
    <Banner :for="className" />
    <RegisterForm />
  </div>
</template>

<script>
import Banner from '../components/unauthenticated/banner.vue'
import RegisterForm from '../components/unauthenticated/registerForm.vue'
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
  }

}
</script>

<style>
custom-button {
  color: red;
  text-decoration: underline;
}
</style>
