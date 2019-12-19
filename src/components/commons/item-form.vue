<template>
  <div class="item-form-wrapper">
    <v-form class="item-form" v-model="valid" ref="form">
      <v-text-field
        v-model="bookname"
        label="Book Name"
        :rules="[v => !!v || 'Book name is required']"
      ></v-text-field>
      <v-text-field v-model="author" label="Author" :rules="[v => !!v || 'Author is required']"></v-text-field>
      <v-text-field v-model="year" label="Year" :rules="[v => !!v || 'Year is required']"></v-text-field>
      <v-text-field v-model="pages" label="Pages" :rules="[v => !!v || 'Page is required']"></v-text-field>
      <v-text-field
        v-model="publisher"
        label="Publisher"
        :rules="[v => !!v || 'Publisher is required']"
      ></v-text-field>
      <v-select
        v-model="image"
        :items="['img1', 'img2', 'img3', 'img4']"
        label="Choose From existing images."
        :rules="[v => !!v || 'Image is required']"
      ></v-select>
      <v-file-input v-model="image" show-size accept="image/*" label="Choose a new Image"></v-file-input>
      <v-textarea v-model="description" name="input-7-1" label="Description" value></v-textarea>
    </v-form>
    <div class="custom-button-wrapper">
      <v-btn
        depressed
        class="custom-button"
        :disabled="!valid"
        @click="_=>submit()"
        :style="'background-color: #ec7063;color: white;'"
      >Add Item</v-btn>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      valid: true
    }
  }

}
</script>
<style scoped>
@media screen and (min-width: 992px) {
  .item-form {
    width: 40%;
    margin: 0 auto;
  }
}

@media screen and (max-width: 992px) {
  .item-form {
    width: 70%;
    margin: 0 auto;
  }
}

.custom-button-wrapper {
  display: flex;
  justify-content: center;
}

.custom-button {
  width: 140px;
  border-radius: 15px;
  margin: 0 auto;
}
</style>
