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
            <td>{{ item.author }}</td>
            <td>
              <v-dialog v-model="dialog" width="600px">
                <template v-slot:activator="{ on }">
                  <v-btn color="teal darken-1" icon @click="_=>{editItem(item)}" v-on="on">
                    <v-icon>mdi-database-edit</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-btn icon style="position: fixed">
                    <v-icon @click="dialog = false">mdi-close</v-icon>
                  </v-btn>
                  <Form :data="currentItem" @submit="submit($event)" />
                </v-card>
              </v-dialog>
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
import Form from '@/components/commons/item-form'
export default {
  data: () => ({
    show: false,
    items: [],
    currentItem: {},
    dialog: false
  }),
  components: {
    Form
  },
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
    },

    editItem(item) {
      this.currentItem = item
    },

    submit(data) {
      console.log('submit to update called')
      apiService.updateItem(data)
        .then(response => {
          console.log(response)
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

.form-wrapper {
  width: 100%;
  margin: 5vh auto;
  background-color: white;
  overflow: auto;
}
</style>
