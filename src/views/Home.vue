<template>
  <div class="main-container-home">
    <div class="carousel">Carousel here</div>
    <ISlider :data="this.highestRated" />
    <ISlider :data="this.bestsellers" />
    <ISlider :data="this.newReleases" />
    <Footer />
  </div>
</template>

<script>
import apiService from '@/apiConfig/itemService'
import ISlider from '../components/commons/items-slider.vue'
import Footer from '../components/commons/footer'

export default {
  data() {
    return {
      highestRated: {
        title: 'Top Rated',
        data: []
      },
      bestsellers: {
        title: 'Best Sellers',
        data: []
      },
      newReleases: {
        title: 'New Releases',
        data: []
      }
    }
  },
  components: {
    ISlider, Footer
  },
  methods: {
    getHighestRated() {
      apiService.fetchHighestRated()
        .then(response => {
          this.highestRated.data = response.data
        })
        .catch(error => {
          if (error && error.response !== 'undefined') {
            console.log('error>>>', error.response.data)
          }
        })
    },
    getBestSellers() {
      apiService.fetchBestSellers()
        .then(response => {
          this.bestsellers.data = response.data
        })
        .catch(error => {
          if (error && error.response !== 'undefined') {
            console.log('error>>>', error.response.data)
          }
        })
    },
    getNewReleases() {
      apiService.fetchNewReleases()
        .then(response => {
          this.newReleases.data = response.data
        })
        .catch(error => {
          if (error && error.response !== 'undefined') {
            console.log('error>>>', error.response.data)
          }
        })
    }

  },
  created() {
    this.getHighestRated()
    this.getBestSellers()
    this.getNewReleases()
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
