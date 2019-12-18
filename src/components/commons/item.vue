<template>
  <div class="card">
    <v-icon
      large
      color="red"
      style="position: absolute; right:0;margin: 5px 5px 0 0"
    >{{isFav?'mdi-heart-broken':'mdi-heart-circle'}}</v-icon>
    <div style="padding-top: 5px;">
      <img
        src="@/assets/test/a.jpg"
        alt="Avatar"
        style="width:100%; min-height: 200px; max-height: 200px;object-fit: contain"
      />
    </div>
    <div class="container">
      <div class="description">
        <p class="book-name">Kafka on the shore</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>By Murakami</p>
      </div>
      <div style="margin: 0 auto">
        <v-rating :value="4.5" color="amber" dense half-increments readonly size="20"></v-rating>
      </div>
      <div class="price-tag">
        <p style="margin-bottom: 2px">$7.99</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: _ => ({

  }),
  props: {
    isFav: Boolean
  }
}
</script>

<style scoped>
.book-name {
  font-weight: bold;
}

.description > p {
  font-size: 0.8em;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.price-tag {
  text-align: center;
}

.card {
  position: relative;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  max-width: 200px;
  min-width: 200px;
  max-height: 320px;
  min-height: 320px;
  margin: 0 10px 20px 10px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.container {
  padding: 0px 16px;
  display: flex;
  flex-direction: column;
}
</style>
