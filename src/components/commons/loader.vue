<template>
  <div v-if="show" class="loaderWrapper1">
    <div class="loaderWrapper2">
      <div class="loader">
        <p>{{message}}...</p>
        <v-progress-linear color="white" indeterminate rounded height="6"></v-progress-linear>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'loader',
  data() {
    return {
      show: false,
      message: ''
    }
  },
  created() {
    this.$store.watch(_ => this.$store.getters['loaderSettings'], value => {
      this.show = value.show
      this.message = value.message
    })
  }
}
</script>
<style scoped>
.loaderWrapper1 {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
  overflow: hidden;
}

.loaderWrapper2 {
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
}

.loader {
  max-width: 30%;
  margin: 0 auto;
}

.loader p {
  text-align: center;
  color: white;
}
</style>
