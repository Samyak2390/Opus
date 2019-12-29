<template>
  <div>
    <div v-if=" items && items.length > 0" class="main-container-cat">
      <v-select
        :items="sortingOption"
        label="Sort by"
        dense
        style="width:200px;margin:20px auto; font-size: 14px"
        v-model="sort"
        @change="sorted"
      ></v-select>
      <div class="cat-gallery">
        <div v-for="(item, index) in items" :key="index">
          <Item :item="item" :isFav="false" />
        </div>
      </div>
    </div>
    <div v-else class="no-cat">
      <div>No Books found.</div>
    </div>

    <Footer />
  </div>
</template>

<script>
import apiService from '@/apiConfig/itemService'
import Footer from '../components/commons/footer'
import Item from '../components/commons/item'
export default {
  data() {
    return {
      sort: '',
      items: [],
      sortingOption: ['High Rating to Low', 'Low Rating to High', 'High Price to Low', 'Low Price to High', 'Newest to Oldest', 'Oldest to Newest'],
      searchText: '',
      category: ''
    }
  },
  components: {
    Footer, Item
  },
  methods: {
    sorted() {
      if (this.items.length > 1) {
        switch (this.sort.toLowerCase()) {
          case 'high rating to low':
            this.items = this.items.sort((a, b) => {
              return b.rating - a.rating
            })
            break

          case 'low rating to high':
            this.items = this.items.sort((a, b) => {
              return a.rating - b.rating
            })
            break

          case 'high price to low':
            this.items = this.items.sort((a, b) => {
              return b.price - a.price
            })
            break

          case 'low price to high':
            this.items = this.items.sort((a, b) => {
              return a.price - b.price
            })
            break

          case 'newest to oldest':
            this.items = this.items.sort((a, b) => {
              return b.year - a.year
            })
            break

          case 'oldest to newest':
            this.items = this.items.sort((a, b) => {
              return a.year - b.year
            })
            break
        }
      }
    },
    search() {
      this.searchText = this.$route.query.searchText
      this.category = this.$route.query.category
      apiService.searchData({ category: this.category, searchText: this.searchText })
        .then(response => {
          this.items = response.data
        })
        .catch(error => {
          if (error && error.response !== 'undefined') {
            console.log('error>>>>', error.response.data)
          }
        })
    }

  },
  beforeCreate() {
    this.$store.dispatch('changePage', '/search')
  },
  created() {
    this.search()
  },
  watch: {
    '$route.fullPath': function () {
      this.search()
      this.sorted()
    }
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
