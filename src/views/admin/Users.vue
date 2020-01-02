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
  </div>
</template>
<script>
import apiService from '@/apiConfig/userService'
export default {
  data: () => ({
    items: [],
    currentItem: {},
    dialog2: false

  }),
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
