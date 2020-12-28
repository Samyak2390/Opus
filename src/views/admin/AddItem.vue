<template>
  <div>
    <p class="title font-weight-light text-center">Fill the form below to add an item.</p>
    <ItemForm :data="{}" @submit="submit($event)" />
  </div>
</template>
<script>
import ItemForm from '@/components/commons/item-form'
import apiService from '@/apiConfig/itemService'
export default {
  components: {
    ItemForm
  },
  methods: {
    submit(data) {
      apiService.addItem(data)
        .then(response => {
          this.$router.push({ path: '/admin/items' })
          this.$store.dispatch('changePage', '/admin/items')
          this.$store.dispatch('showSnackbar', { show: true, color: 'success', text: 'Item added Successfully.' })
        })
        .catch(error => {
          if (error && error.response !== 'undefined') {
            let errorMessage = ''
            const errors = error.response.data.message
            if (Array.isArray(errors)) {
              errors.forEach(error => {
                errorMessage += error + '\n'
              })
            } else {
              errorMessage = errors
            }
            this.$store.dispatch('showSnackbar', { show: true, color: 'error', text: errorMessage || 'Something went wrong while adding Item.' })
          }
        })
    }
  }

}
</script>
<style scoped>
div > p {
  margin-top: 20px;
}
</style>
