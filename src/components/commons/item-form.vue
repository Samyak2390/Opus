<template>
  <div class="item-form-wrapper">
    <v-form class="item-form" v-model="valid" ref="form">
      <v-text-field
        v-model="data.bookname"
        label="Book Name"
        :rules="[v => !!v || 'Book name is required']"
      ></v-text-field>
      <v-text-field
        v-model="data.author"
        label="Author"
        :rules="[v => !!v || 'Author is required']"
      ></v-text-field>
      <v-text-field v-model="data.year" label="Year" :rules="[v => !!v || 'Year is required']"></v-text-field>
      <v-text-field v-model="data.pages" label="Pages" :rules="[v => !!v || 'Page is required']"></v-text-field>
      <v-text-field
        v-model="data.publisher"
        label="Publisher"
        :rules="[v => !!v || 'Publisher is required']"
      ></v-text-field>
      <v-text-field v-model="data.price" label="Price" :rules="[v => !!v || 'Price is required']"></v-text-field>
      <v-text-field
        v-model="data.rating"
        label="Rating"
        :rules="[v => !!v || 'Rating is required']"
      ></v-text-field>
      <v-text-field
        v-model="data.bestseller"
        label="Is Best Seller?"
        :rules="[v => !!v || 'Best Seller is required', v=> (v == '1' || v == '0') || 'Only 1 (true) or 0 (false)' ]"
      ></v-text-field>
      <v-select
        v-model="data.category"
        :items="['Fiction', 'Historical', 'Psychology', 'Nonfiction']"
        label="Category"
        :rules="[v => !!v || 'Category is required']"
      ></v-select>
      <v-select
        v-model="data.image"
        :items="['img1', 'img2', 'img3', 'img4']"
        label="Choose From existing images."
      ></v-select>
      <div id="preview">
        <img v-if="url" :src="url" />
      </div>
      <v-file-input @change="onFileChange" show-size label="Choose a new Image"></v-file-input>
      <v-textarea v-model="data.description" name="input-7-1" label="Description"></v-textarea>
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
      data: {}
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
      this.$store.dispatch('loader', { show: true, message: 'Adding Item' })
      // const { bookname, author, year, pages, publisher, price, rating, bestseller, category, image, imageFile, description } = this.data
      let allData = this.data
      allData = JSON.stringify(allData)
      const fd = new FormData()
      fd.append('imageFile', this.imageFile, this.imageFile.name)
      fd.append('data', allData)
      apiService.addItem(fd)
        .then(response => {
          this.$store.dispatch('loader', { show: false, message: '' })
          this.data = {}
          this.imageFile = ''
          this.url = ''
          // this.$router.push({ path: '/login' })
          // this.$store.dispatch('changePage', '/login')
          this.$store.dispatch('showSnackbar', { show: true, color: 'success', text: 'Item added Successfully.' })
        })
        .catch(error => {
          this.$store.dispatch('loader', { show: false, message: '' })
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
