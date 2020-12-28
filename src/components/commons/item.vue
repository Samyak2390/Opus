<template>
  <div>
    <div class="card">
      <v-btn
        v-if="!isFav && this.currentUser"
        icon
        style="position: absolute; right:0;margin: 5px 5px 0 0"
      >
        <v-icon @click="_=>addFav(item)" large color="red">mdi-heart-circle</v-icon>
      </v-btn>

      <v-btn
        v-if="isFav && this.currentUser"
        icon
        style="position: absolute; right:0;margin: 5px 5px 0 0"
        @click="_=>removeFav(item)"
      >
        <v-icon large color="red">mdi-delete-circle-outline</v-icon>
      </v-btn>

      <div style="padding-top: 5px;">
        <img
          :src="item.image_url || ''"
          alt="Avatar"
          style="width:100%; min-height: 200px; max-height: 200px;object-fit: contain"
        />
      </div>
      <div class="container">
        <div class="description">
          <p class="book-name">{{item.bookname || ''}}</p>
          <p>{{item.description || ''}}</p>
          <p>{{item.author_name || ''}} {{item.year || ''}}</p>
        </div>
        <div style="margin: 0 auto">
          <v-rating
            :value="parseInt(item.rating)"
            color="amber"
            dense
            half-increments
            readonly
            size="20"
          ></v-rating>
        </div>
        <div class="price-tag">
          <p style="margin-bottom: 2px">${{item.price || ''}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import apiService from '@/apiConfig/favService'
export default {
  data: _ => ({

  }),
  props: {
    isFav: Boolean,
    item: Object
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser', page: 'currentPage' })
  },
  methods: {
    addFav(item) {
      // call api to add to favorites
      apiService.addToFav({ book_id: item.book_id })
        .then(response => {
          this.$store.dispatch('showSnackbar', { show: true, color: 'success', text: response.message || 'Book Added to favourite.' })
        })
        .catch(error => {
          if (error && error.response !== 'undefined') {
            this.$store.dispatch('showSnackbar', { show: true, color: 'error', text: error.response.data.message || 'Something went wrong!' })
          }
        })
    },
    removeFav(item) {
      // call api to add to favorites
      apiService.deleteFav({ book_id: item.book_id })
        .then(response => {
          this.$emit('remove', { book_id: item.book_id })
          this.$store.dispatch('showSnackbar', { show: true, color: 'success', text: response.message || 'Book Removed from favourites.' })
        })
        .catch(error => {
          if (error && error.response !== 'undefined') {
            this.$store.dispatch('showSnackbar', { show: true, color: 'error', text: error.response.data.message || 'Something went wrong!' })
          }
        })
    }
  }
}
</script>

<style scoped>
.book-name {
  font-weight: bold;
  text-transform: capitalize;
}

.description > p {
  font-size: 0.8em;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
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
