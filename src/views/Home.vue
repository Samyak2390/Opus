<template>
  <div class="main-container-home">
    <div class="carousel">Carousel here</div>
    <ISlider />
    <ISlider />
    <ISlider />
    <Footer />
  </div>
</template>

<script>
import ISlider from '../components/commons/items-slider.vue'
import Footer from '../components/commons/footer'

export default {
  components: {
    ISlider, Footer
  }

}
</script>
<style scoped>
.carousel {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  height: 400px;
}

.main-container-home {
  padding-bottom: 10rem;
}
</style>
