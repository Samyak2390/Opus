<template>
  <div>
    <div class="carousel">Carousel here</div>
    <Item />
  </div>
</template>

<script>
import Item from '../components/commons/item.vue'
export default {
  components: {
    Item
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
