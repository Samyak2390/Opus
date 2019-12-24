<template>
  <div>
    <p class="title font-weight-light text-center">Fill the form below to add an item.</p>
    <ItemForm />
  </div>
</template>
<script>
import ItemForm from '@/components/commons/item-form'
export default {
  components: {
    ItemForm
  }

}
</script>
<style scoped>
div > p {
  margin-top: 20px;
}
</style>
