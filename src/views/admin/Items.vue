<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>S.no</th>
            <th class="text-left">Name</th>
            <th class="text-left">Author</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in desserts" :key="item.name">
            <td>{{index+1}}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.author }}</td>
            <td>
              <v-btn color="teal darken-1" text>Edit</v-btn>
            </td>
            <td>
              <v-btn color="red darken-4" text>Delete</v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
export default {
  data: () => ({
    show: false,
    desserts: [
      {
        name: 'Kafka on the shore',
        author: 'Haruki Murakami'
      },
      {
        name: 'The Catcher in the Rye',
        author: 'J.D. Salinger'
      },
      {
        name: 'A Walk to Remember',
        author: 'Nicholas Sparks'
      },
      {
        name: 'Adultery',
        author: 'Paulo Coelho'
      }
    ]
  })

}
</script>
<style scoped>
</style>
