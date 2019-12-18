<template>
  <div style="max-width: 85%; margin: 0 auto">
    <div class="slider-group-title">
      <p>Top Rated</p>
    </div>
    <v-slide-group :show-arrows="false" center-active>
      <v-slide-item v-for="n in 10" :key="n" v-slot:default="{ active, toggle }">
        <Item class="ma-4" />
      </v-slide-item>
    </v-slide-group>
  </div>
</template>
<script>
import Item from './item'
export default {
  components: {
    Item
  }

}
</script>

<style scoped>
.slider-group-title {
  font-size: 1.5rem;
  text-decoration: underline;
  font-weight: bold;
  font-family: "Advent Pro", sans-serif;
  letter-spacing: 1.3px;
}
</style>
