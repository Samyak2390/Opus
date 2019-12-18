<template>
  <div>
    <div v-if="true" class="main-container-fav">
      <v-btn text class="remove-button">Remove All</v-btn>
      <div class="fav-gallery">
        <div>
          <Item :isFav="true" />
        </div>
        <div>
          <Item :isFav="true" />
        </div>
        <div>
          <Item :isFav="true" />
        </div>
        <div>
          <Item :isFav="true" />
        </div>
      </div>
    </div>
    <div v-else class="no-fav">
      <div>You have no favourites.</div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Footer from '../components/commons/footer'
import Item from '../components/commons/item'
export default {
  components: {
    Footer, Item
  }

}
</script>
<style scoped>
.remove-button {
  margin: 20px auto;
  color: rgba(236, 112, 99, 1);
  border: 1px solid rgba(236, 112, 99, 1);
  border-radius: 5 px;
  width: 75%;
}
.main-container-fav {
  padding-bottom: 15rem;
  display: flex;
  flex-direction: column;
}

.no-fav {
  height: 92vh;
  display: flex;
  justify-content: center;
  padding-top: 10vh;
}

.fav-gallery {
  width: 85%;
  margin: 25px auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
