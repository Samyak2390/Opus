<template>
  <div :class="className + ' banner'">
    <a href="/">Opus</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      className: ''
    }
  },

  props: {
    for: String
  },

  methods: {
    bannerClass() {
      this.for === 'login-page' ? this.className = 'login-page' : this.className = 'register-page'
    }
  },

  mounted: function () {
    this.bannerClass()
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

a:visited,
a:active {
  color: white;
}

.banner {
  font-family: "Aclonica", sans-serif;
  width: 100%;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.8em;
  font-weight: bold;
}

.login-page {
  background: url("../../assets/unauthenticated/images/loginBackground.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  color: white;
}

.register-page a {
  background: url("../../assets/unauthenticated/images/loginBackground.jpg");
  background-size: cover;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
</style>
