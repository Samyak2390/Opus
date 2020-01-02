<template>
  <div class="main-container-home">
    <div class="carousel">
      <div class="text">
        <p>Discover</p>
        <p>your favourite book.</p>
      </div>
    </div>
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
      },
      model: 0,
      showArrows: false,
      hideDelimiters: true,
      cycle: false
    }
  },
  components: {
    ISlider,
    Footer
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
  height: 400px;
  background-image: url("../assets/unauthenticated/images/girl.jpg");
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px;
}

@media screen and (max-width: 992px) {
  .text {
    background: rgba(0, 0, 0, 0.4);
    padding: 4px;
  }
}

@media screen and (min-width: 992px) {
  .text {
    background: rgba(0, 0, 0, 0.4);
    margin-right: 100px;
    padding: 4px;
  }
}

.carousel p {
  font-weight: bold;
  color: white;
  letter-spacing: 3px;
}

.carousel p:first-child {
  font-size: 4.3rem;
}
.carousel p:last-child {
  font-size: 2.3rem;
}

.main-container-home {
  padding-bottom: 10rem;
}
</style>
