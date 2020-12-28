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
                  <v-btn color="teal darken-1" icon @click="e=>{editItem(e,item)}" v-on="on">
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
              <v-btn color="red darken-4" icon @click="_=>deleteItem(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-dialog v-model="dialog2" width="30rem">
      <v-card>
        <p class="text-center title">Are you sure you want to delete</p>
        <p class="text-center text-capitalize">{{currentItem.bookname}} by {{currentItem.author}} ?</p>
        <div style="display:flex; justify-content: space-evenly">
          <v-btn color="green darken-1" text @click="_=>confirmDelete(this.currentItem)">Yes</v-btn>
          <v-btn color="red darken-1" text @click="dialog2 = false">No</v-btn>
        </div>
      </v-card>
    </v-dialog>
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
    dialog: false,
    dialog2: false
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
            this.$store.dispatch('showSnackbar', { show: true, color: 'error', text: error.response.data.message || 'Something went wrong!' })
          }
        })
    },

    editItem(e, item) {
      this.currentItem = item
      e.stopPropagation()
    },

    deleteItem(item) {
      this.dialog2 = true
      this.currentItem = item
    },

    confirmDelete(curr) {
      this.dialog2 = false
      this.$store.dispatch('loader', { show: true, message: 'Deleting Item' })
      apiService.deleteItem({ book_id: curr.book_id })
        .then(response => {
          this.$store.dispatch('loader', { show: false, message: '' })
          const filtered = this.items.filter(item => {
            return item.book_id !== curr.book_id
          })
          this.items = filtered
          this.$store.dispatch('showSnackbar', { show: true, color: 'success', text: 'Item deleted Successfully.' })
        })
        .catch(error => {
          this.$store.dispatch('loader', { show: false, message: '' })
          if (error && error.response !== 'undefined') {
            this.$store.dispatch('showSnackbar', { show: true, color: 'error', text: error.response.data.message || 'Something went wrong while deleting Item.' })
          }
        })
    },

    submit(data) {
      apiService.updateItem(data)
        .then(response => {
          this.getAllItems()
          this.$store.dispatch('showSnackbar', { show: true, color: 'success', text: 'Item Updated Successfully.' })
          this.dialog = false
        })
        .catch(error => {
          if (error && error.response !== 'undefined') {
            this.$store.dispatch('showSnackbar', { show: true, color: 'error', text: error.response.data.message || 'Something went wrong while deleting Item.' })
          }
        })
    }

  },
  created() {
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
