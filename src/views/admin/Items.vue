<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>S.no</th>
            <th class="text-left">Name</th>
            <th class="text-left">Author</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="item.name">
            <td>{{index+1}}</td>
            <td>{{ item.bookname }}</td>
            <td>{{ item.author_name }}</td>
            <td>
              <v-btn color="teal darken-1" icon>
                <v-icon>mdi-database-edit</v-icon>
              </v-btn>
            </td>
            <td>
              <v-btn color="red darken-4" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
import apiService from '@/apiConfig/itemService'
export default {
  data: () => ({
    show: false,
    items: []
  }),
  methods: {
    getAllItems() {
      apiService.fetchAllItems()
        .then(response => {
          this.items = response.data
        })
        .catch(error => {
          if (error && error.response !== 'undefined') {
            console.log('error>>>', error.response.data)
          }
        })
    }
  },
  created() {
    this.getAllItems()
  },
  updated() {
    this.getAllItems()
  }

}
</script>
<style scoped>
td {
  text-transform: capitalize;
}
</style>
