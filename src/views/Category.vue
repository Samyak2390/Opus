<template>
  <div>
    <div v-if="items.length > 0" class="main-container-cat">
      <v-btn text class="remove-button">Remove All</v-btn>
      <div class="cat-gallery">
        <div v-for="(item, index) in items" :key="index">
          <Item :item="item" :isFav="false" />
        </div>
      </div>
    </div>
    <div v-else class="no-cat">
      <div>No Books found for that category.</div>
    </div>

    <Footer />
  </div>
</template>

<script>
import apiService from '@/apiConfig/itemService'
import Footer from '../components/commons/footer'
import Item from '../components/commons/item'
export default {
  props: ['category'],
  data() {
    return {
      items: []
    }
  },
  components: {
    Footer, Item
  },
  methods: {
    getCategoryData() {
      apiService.fetchCategoryData({ category: this.category })
        .then(response => {
          this.items = response.data
        })
        .catch(error => {
          if (error && error.response !== 'undefined') {
            this.$store.dispatch('showSnackbar', { show: true, color: 'error', text: error.response.data.message || 'Something went wrong!' })
          }
        })
    }

  },
  beforeCreate() {
    this.$store.dispatch('changePage', '/category')
  },
  created() {

  },
  mounted() {
    this.getCategoryData()
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
.main-container-cat {
  padding-bottom: 15rem;
  display: flex;
  flex-direction: column;
}

.no-cat {
  height: 92vh;
  display: flex;
  justify-content: center;
  padding-top: 10vh;
}

.cat-gallery {
  width: 85%;
  margin: 25px auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
