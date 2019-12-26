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
      <v-text-field v-model="price" label="Price" :rules="[v => !!v || 'Price is required']"></v-text-field>
      <v-text-field v-model="rating" label="Rating" :rules="[v => !!v || 'Rating is required']"></v-text-field>
      <v-select
        v-model="category"
        :items="['one', 'two', 'three', 'four']"
        label="Category"
        :rules="[v => !!v || 'Category is required']"
      ></v-select>
      <v-select
        v-model="image"
        :items="['img1', 'img2', 'img3', 'img4']"
        label="Choose From existing images."
      ></v-select>
      <div id="preview">
        <img v-if="url" :src="url" />
      </div>
      <v-file-input @change="onFileChange" show-size label="Choose a new Image"></v-file-input>
      <v-textarea v-model="description" name="input-7-1" label="Description"></v-textarea>
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
import apiService from '@/apiConfig/itemService'
export default {
  data() {
    return {
      url: '',
      valid: true,
      bookname: '',
      author: '',
      year: '',
      pages: '',
      publisher: '',
      price: '',
      rating: '',
      category: '',
      image: '',
      imageFile: '',
      description: ''
    }
  },
  methods: {
    onFileChange(file) {
      if (file) {
        this.imageFile = file
        this.url = URL.createObjectURL(file)
      } else {
        this.url = ''
        this.imageFile = ''
      }
    },
    submit() {
      const { bookname, author, year, pages, publisher, price, rating, category, image, imageFile, description } = this
      let allData = { bookname, author, year, pages, publisher, price, rating, category, image, description }
      allData = JSON.stringify(allData)
      const fd = new FormData()
      fd.append('imageFile', imageFile, imageFile.name)
      fd.append('data', allData)
      apiService.addItem(fd)
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          if (error && error.response !== 'undefined') {
            console.log(error.reponse.data)
          }
        })
    }
  }

}
</script>
<style scoped>
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 300px;
}

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

.item-form-wrapper {
  padding: 20px 0;
}
</style>
