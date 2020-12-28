<template>
  <div>
    <div v-if="items.length > 0" class="main-container-fav">
      <v-btn text class="remove-button" @click="_=>removeAll()">Remove All</v-btn>
      <div class="fav-gallery">
        <div v-for="(item, index) in items" :key="index">
          <Item :item="item" :isFav="true" @remove="remove($event)" />
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
import apiService from '@/apiConfig/favService'
import Footer from '../components/commons/footer'
import Item from '../components/commons/item'
export default {
  data() {
    return {
      items: []
    }
  },
  components: {
    Footer, Item
  },
  methods: {
    getFav() {
      apiService.fetchFav()
        .then(response => {
          this.items = response.data
        })
        .catch(error => {
          if (error && error.response !== 'undefined') {
            this.$store.dispatch('showSnackbar', { show: true, color: 'error', text: error.response.data.message || 'Something went wrong!' })
          }
        })
    },
    remove(payload) {
      const filtered = this.items.filter(item => {
        return item.book_id !== payload.book_id
      })
      this.items = filtered
    },
    removeAll() {
      apiService.deleteAll()
        .then(response => {
          this.items = []
          this.$store.dispatch('showSnackbar', { show: true, color: 'success', text: response.message || 'All books removed.' })
        })
        .catch(error => {
          if (error && error.response !== 'undefined') {
            this.$store.dispatch('showSnackbar', { show: true, color: 'error', text: error.response.data.message || 'Something went wrong!' })
          }
        })
    }

  },
  created() {
    this.getFav()
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
