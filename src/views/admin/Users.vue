<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>S.no</th>
            <th class="text-left">Username</th>
            <th class="text-left">Email</th>
            <th class="text-left">Role</th>
            <th class="text-left">Change Role</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="item.name">
            <td>{{index+1}}</td>
            <td>{{ item.username }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.role === '1' ? 'Admin' : 'Normal user' }}</td>
            <td>
              <v-btn color="teal darken-1" icon @click="changeRole(item)">
                <v-icon>mdi-autorenew</v-icon>
              </v-btn>
            </td>
            <td>
              <v-dialog v-model="dialog" width="600px">
                <template v-slot:activator="{ on }">
                  <v-btn color="teal darken-1" icon @click="_=>{editUser(item)}" v-on="on">
                    <v-icon>mdi-database-edit</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-btn icon style="position: fixed">
                    <v-icon @click="dialog = false">mdi-close</v-icon>
                  </v-btn>
                  <RegisterForm :data="currentItem" @submit="submit($event)" />
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
        <p
          class="text-center title"
        >Are you sure you want to change role of {{currentItem.username}}?</p>
        <div style="display:flex; justify-content: space-evenly">
          <v-btn color="green darken-1" text @click="_=>confirmChange(this.currentItem)">Yes</v-btn>
          <v-btn color="red darken-1" text @click="dialog2 = false">No</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog3" width="30rem">
      <v-card>
        <p class="text-center title">Are you sure you want to delete</p>
        <p class="text-center">{{currentItem.username}}?</p>
        <div style="display:flex; justify-content: space-evenly">
          <v-btn color="green darken-1" text @click="_=>confirmDelete(this.currentItem)">Yes</v-btn>
          <v-btn color="red darken-1" text @click="dialog3 = false">No</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import apiService from '@/apiConfig/userService'
import RegisterForm from '@/components/unauthenticated/registerForm.vue'

export default {
  data: () => ({
    items: [],
    currentItem: {},
    dialog: false,
    dialog2: false,
    dialog3: false

  }),
  components: {
    RegisterForm
  },
  methods: {
    getAllUsers() {
      apiService.getUsers()
        .then(response => {
          this.items = response.data
        })
        .catch(error => {
          if (error && error.response) {
            this.$store.dispatch('showSnackbar', { show: true, color: 'error', text: error.response.data || 'Something went wrong!' })
          }
        })
    },
    changeRole(item) {
      this.currentItem = item
      this.dialog2 = true
    },
    confirmChange(item) {
      apiService.changeRole({ id: item.id })
        .then(response => {
          this.dialog2 = false
          if (item.role === '1') {
            item.role = '0'
          } else {
            item.role = '1'
          }
          this.$store.dispatch('showSnackbar', { show: true, color: 'success', text: 'Role changed Successfully.' })
        })
        .catch(error => {
          this.dialog2 = false
          if (error && error.response) {
            this.$store.dispatch('showSnackbar', { show: true, color: 'error', text: error.response.data || 'Something went wrong while deleting Item.' })
          }
        })
    },

    editUser(item) {
      this.currentItem = item
    },

    deleteItem(item) {
      this.dialog3 = true
      this.currentItem = item
    },

    confirmDelete(curr) {
      this.dialog3 = false
      console.log('deleteing>>>>', curr)
      // this.$store.dispatch('loader', { show: true, message: 'Deleting User' })
      apiService.deleteUser({ id: curr.id })
        .then(response => {
          this.$store.dispatch('loader', { show: false, message: '' })
          const filtered = this.items.filter(item => {
            return item.id !== curr.id
          })
          this.items = filtered
          this.$store.dispatch('showSnackbar', { show: true, color: 'success', text: 'Item deleted Successfully.' })
        })
        .catch(error => {
          this.$store.dispatch('loader', { show: false, message: '' })
          if (error && error.response !== 'undefined') {
            this.$store.dispatch('showSnackbar', { show: true, color: 'error', text: error.response.data || 'Something went wrong while deleting Item.' })
          }
        })
    },

    submit(data) {
      this.$store.dispatch('loader', { show: true, message: 'Updating user' })

      apiService.updateUser(data)
        .then(response => {
          this.$store.dispatch('loader', { show: false, message: '' })
          this.dialog = false
          this.getAllUsers()
          this.$store.dispatch('showSnackbar', { show: true, color: 'success', text: 'User updated Successfully.' })
        })
        .catch(error => {
          if (error && error.response !== 'undefined') {
          }
        })
    }
  },
  created() {
    this.getAllUsers()
  }
}
</script>
<style scoped>
.form-wrapper {
  width: 100%;
  margin: 5vh auto;
  background-color: white;
  overflow: auto;
}
</style>
