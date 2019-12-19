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
          <!-- <v-card-title v-text="card.title"></v-card-title> -->
          <p class="display-4 text-center font-weight-bold">0</p>
          <p class="display-1 text--white text-center">{{card.title}}</p>
        </v-img>
      </v-card>
    </v-col>
  </div>
</template>
<script>
export default {
  data: () => ({
    cards: [
      { title: 'Users', src: require('../../assets/test/people.jpeg'), flex: 12 },
      { title: 'Items', src: require('../../assets/test/books.jpeg'), flex: 12 },
      { title: 'Admins', src: require('../../assets/test/admin.jpeg'), flex: 12 }
    ]
  })

}
</script>
<style scoped>
.admin-text {
  color: white;
  font-size: 5em;
}
</style>
