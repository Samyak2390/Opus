<template>
  <div class="home">
    <input type="button" value="select all users" @click="allRecords()" />
    <br />
    <br />
    <input type="text" placeholder="Enter user Id" v-model="userid" />
    <input type="button" value="Select user by ID" @click="allRecords()" />

    <table border="1" width="80%" style="border-collapse: collapse ">
      <tr>
        <th>FirstName</th>
        <th>LastName</th>
        <th>Email</th>
      </tr>

      <tr v-for="(user, index) in users" :key="index">
        <td>{{user.FirstName}}</td>
        <td>{{user.LastName}}</td>
        <td>{{user.Email}}</td>
      </tr>
    </table>
    <!-- <div v-for="(user, index) in users" :key="index">
      <p>{{user}}</p>
    </div>-->
  </div>
</template>

<script>
// import axios from 'axios'
import { testapi } from '../apiConfig/testApiService'
export default {
  data() {
    return {
      users: [],
      userid: 0
    }
  },
  methods: {
    allRecords() {
      // axios
      //   .get('http://localhost/WAT/wat2019/api-opus/ajaxfile.php')
      //   .then(response => {
      //     console.log('res>>>>>', response)
      //     this.users = response.data
      //     console.log(this.users)
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })

      const callback = result => {
        this.users = result
      }
      let params
      if (this.userid === 0) {
        params = ''
      } else {
        params = { params: { userid: this.userid } }
      }

      testapi(callback, params)
      console.log('from home>>>', this.users)
    }
    // recordById() {
    //   if (this.userid > 0) {
    //     axios
    //       .get('http://localhost/WAT/wat2019/api-opus/ajaxfile.php', {
    //         params: {
    //           userid: this.userid
    //         }
    //       })
    //       .then(response => {
    //         console.log('res>>>>>', response)
    //         this.users = response.data
    //         console.log(this.users)
    //       })
    //       .catch(error => {
    //         console.log(error)
    //       })
    //   }
    // }
  }
}
</script>
