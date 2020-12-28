<template>
  <div>
    <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
      <v-card class="mx-auto" max-width="900">
        <!-- <v-card-text>Total Users: 10</v-card-text> -->
        <v-img
          :src="card.src"
          class="white--text align-end"
          gradient="to bottom, rgba(246, 112, 99, 0.6), rgba(246, 112, 99, 0.4)"
          height="200px"
        >
          <p class="display-4 text-center font-weight-bold">{{card.data}}</p>
          <p class="display-1 text--white text-center">{{card.title}}</p>
        </v-img>
      </v-card>
    </v-col>
  </div>
</template>
<script>
import apiService from '@/apiConfig/itemService'
export default {
  data: () => ({
    cards: [
      { title: 'Users', src: require('../../assets/test/people.jpeg'), flex: 12, data: '' },
      { title: 'Items', src: require('../../assets/test/books.jpeg'), flex: 12, data: '' },
      { title: 'Admins', src: require('../../assets/test/admin.jpeg'), flex: 12, data: '' }
    ]
  }),
  methods: {
    getDashboardData() {
      apiService.fetchDashboardData()
        .then(response => {
          this.cards[0].data = response.data.users
          this.cards[1].data = response.data.items
          this.cards[2].data = response.data.admins
        }).catch(error => {
          if (error && error.response !== 'undefined') {
            this.$store.dispatch('showSnackbar', { show: true, color: 'error', text: error.response.data.message || 'Something went wrong!' })
          }
        })
    }
  },
  created() {
    this.getDashboardData()
    this.$store.dispatch('changePage', '/admin/dashboard')
  }

}
</script>
<style scoped>
.admin-text {
  color: white;
  font-size: 5em;
}
</style>
