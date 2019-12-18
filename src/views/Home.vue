<template>
  <div>
    <div class="carousel">Carousel here</div>
    <!-- <div style="max-width: 85%; margin: 0 auto">
      <div class="slider-group-title">
        <p>Top Rated</p>
      </div>
      <v-slide-group
        :multiple="false"
        :mandatory="false"
        :show-arrows="false"
        :center-active="false"
      >
        <v-slide-item v-for="n in 15" :key="n" v-slot:default="{ active, toggle }">
          <Item class="ma-4" />
        </v-slide-item>
      </v-slide-group>
    </div>-->
    <ISlider />
    <ISlider />
    <ISlider />
  </div>
</template>

<script>
import ISlider from '../components/commons/items-slider.vue'
export default {
  components: {
    ISlider
  }

}
</script>
<style scoped>
.carousel {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  height: 400px;
}
</style>
