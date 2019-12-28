<template>
  <!-- Put a snack bar to show error, success which is handled from the store -->
  <div>
    <v-app>
      <loader />
      <snackbar />
      <div v-if="window.width<992">
        <v-app-bar
          absolute
          temporary
          :color="page=='/login' || page=='/register' ? color2 : color1"
          :elevate-on-scroll="elevateOnScroll"
          :hide-on-scroll="hideOnScroll"
          :fade-on-scroll="fadeOnScroll"
          :fade-img-on-scroll="fadeImgOnScroll"
          :inverted-scroll="invertedScroll"
          :collapse="collapse"
          :collapse-on-scroll="collapseOnScroll"
          :shrink-on-scroll="shrinkOnScroll"
          :extended="extended"
          :flat="true"
        >
          <v-app-bar-nav-icon
            :color="page=='/register' ? 'rgba(236, 112, 99, 1)': 'white'"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>

          <!-- <v-toolbar-title></v-toolbar-title> -->
          <div
            :class="page == '/login' || page =='/register' ? 'hide' :'search-bar'"
            style="width: 95%; margin: 0 auto"
          >
            <div class="item1">
              <v-select
                dark
                color="white"
                :items="['All', 'Comics', 'History', 'Biography']"
                placeholder="Choose"
              ></v-select>
            </div>
            <div class="item2">
              <v-text-field dark placeholder="Search">
                <template slot="append">
                  <v-icon>mdi-magnify</v-icon>
                </template>
              </v-text-field>
            </div>
          </div>

          <!-- <v-spacer></v-spacer> -->
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" absolute temporary>
          <v-list nav dense>
            <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
              <v-list-item href="/" :disabled="page=='/' ? true : false">
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>

              <v-list-item href="/about" :disabled="page=='/about' ? true : false">
                <v-list-item-title>About</v-list-item-title>
              </v-list-item>

              <v-list-item href="/login" :disabled="page=='/login' ? true : false">
                <v-list-item-title>Login</v-list-item-title>
              </v-list-item>

              <v-list-item href="/register" :disabled="page=='/register' ? true : false">
                <v-list-item-title>Register</v-list-item-title>
              </v-list-item>
              <v-list-item href="/admin" :disabled="page=='/admin' ? true : false">
                <v-list-item-title>Admin Panel</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </div>
      <div v-else>
        <div
          class="nav-head"
          :class="page == '/login' || page =='/register' ? 'f-center no-background' :'f-space-between'"
        >
          <div :class="page == '/login' || page =='/register' ? 'logo hide' :'logo'">Opus</div>
          <div :class="page == '/login' || page =='/register' ? 'hide' :'search-bar'">
            <div class="item1">
              <v-select
                height="40"
                v-model="searchCategory"
                dark
                color="white"
                :items="categories"
                placeholder="Choose"
              ></v-select>
            </div>
            <div class="item2">
              <v-text-field dark placeholder="Search" v-model="searchText" @keypress="e=>search(e)">
                <template slot="append">
                  <v-btn icon @click="e=>search(e)">
                    <v-icon>mdi-magnify</v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </div>
          </div>
          <nav :class="page=='/login'?'black-background':''">
            <ul :class="page =='/register' ? 'ul-color-change' : ''">
              <li>
                <a href="/" :class="{'page-selected':page=='/'}">Home</a>
              </li>
              <li>
                <!-- <a href="#">Categories</a> -->
                <v-menu open-on-hover>
                  <template v-slot:activator="{ on }">
                    <span v-on="on">
                      Categories
                      <v-icon :color="page==='/register' ?'black':'white'">mdi-chevron-down</v-icon>
                    </span>
                  </template>

                  <v-list v-for="(category, index) in categories" :key="index">
                    <router-link :to="{ name: 'category', params: { category } }">
                      <v-list-item>
                        <v-list-item-title style="text-transform: capitalize">{{category}}</v-list-item-title>
                      </v-list-item>
                    </router-link>
                  </v-list>
                </v-menu>
              </li>
              <li v-if="currentUser">
                <a href="/favourites" :class="{'page-selected':page=='/favourites'}">Wishlist</a>
              </li>
              <li>
                <v-menu open-on-hover>
                  <template v-slot:activator="{ on }">
                    <span v-on="on">
                      <span
                        :class="{'page-selected':page=='/login' || page=='/register' || page=='/admin/*'}"
                      >Account</span>
                      <v-icon :color="page==='/register' ?'black':'white'">mdi-chevron-down</v-icon>
                    </span>
                  </template>

                  <v-list>
                    <v-list-item
                      v-if="!currentUser"
                      href="/login"
                      :class="{'page-selected':page=='/login'}"
                    >
                      <v-list-item-title>Login</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-else>
                      <v-list-item-title @click="_=>logout()">Logout</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      v-if="!currentUser"
                      href="/register"
                      :class="{'page-selected':page=='/register'}"
                    >
                      <v-list-item-title>Register</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      v-if="isAdmin()"
                      href="/admin"
                      :class="{'page-selected':page=='/admin'}"
                    >
                      <v-list-item-title>Admin Panel</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <router-view :class="page == '/login' || page =='/register' ? '' :'align'" />
    </v-app>
  </div>
</template>

<script>
// import apiService from '@/apiConfig/eventService'
import snackbar from '@/components/commons/snackbar'
import loader from '@/components/commons/loader'
import apiService from '@/apiConfig/itemService'
import { mapGetters } from 'vuex'
export default {
  name: 'App',

  components: {
    snackbar, loader
  },

  data: () => ({
    window: {
      width: 0
    },
    drawer: false,
    group: null,

    elevateOnScroll: false,
    hideOnScroll: false,
    fadeOnScroll: false,
    fadeImgOnScroll: false,
    invertedScroll: false,
    collapse: false,
    collapseOnScroll: false,
    shrinkOnScroll: false,
    extended: false,
    color1: 'rgba(236, 112, 99, 1)',
    color2: 'transparent',
    categories: [],
    searchCategory: '',
    searchText: ''
  }),

  computed: {
    ...mapGetters({ currentUser: 'currentUser', page: 'currentPage' })

  },

  created() {
    this.checkCurrentLogin()
    this.getCategory()
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    handleResize() {
      this.window.width = window.innerWidth
    },
    getCategory() {
      apiService.fetchCategory()
        .then(response => {
          this.categories = ['All', ...response.data]
        })
        .catch(error => {
          if (error && error.response !== 'undefined') {
            console.log('error>>>>', error.response.data)
          }
        })
    },
    checkCurrentLogin() {
      if (!this.currentUser && this.$route.path === '/favourites') {
        this.$router.push('/')
      }
    },
    logout() {
      this.$store.dispatch('logout')
    },
    isAdmin() {
      if (this.currentUser) {
        if (this.currentUser.role === '1') {
          return true
        }
        return false
      }
    },
    search(e) {
      if (e.keyCode === 13 || e.type === 'click') {
        this.$router.push({ path: '/search', query: { searchText: this.searchText, category: this.searchCategory } })
      }
    }
  },

  watch: {
    group() {
      this.drawer = false
    }
  },
  // redirect from favourites page to login page when not logged in*********** fix: not sure need to look at this part
  updated() {
    this.checkCurrentLogin()
  }

}
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Aclonica&display=swap");
@import url("https://fonts.googleapis.com/css?family=Advent+Pro&display=swap");

.align {
  position: absolute;
  top: 8%;
  left: 0;
  right: 0;
}

.search-bar {
  display: flex;
}

.item1 {
  width: 30%;
}
.item2 {
  width: 70%;
}

.logo {
  margin-left: 1em;
  font-size: 2em;
  font-weight: bold;
  font-family: "Aclonica", sans-serif;
  color: white;
}

.hide {
  /* color: rgba(0, 0, 0, 0); */
  display: none;
}

.f-space-between {
  justify-content: space-between;
}

.f-center {
  justify-content: center;
}

.nav-head {
  display: flex;
  height: 8vh;
  align-items: center;
  /* background: transparent; */
  background-color: rgba(236, 112, 99, 1);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 2;
}

.no-background {
  background-color: rgba(255, 255, 255, 0);
}

nav {
  width: 40%;
}

.black-background {
  background: rgba(0, 0, 0, 0.2);
}

ul {
  list-style-type: none;
  display: flex;
  justify-content: space-evenly;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  font-family: "Advent Pro", sans-serif;
  letter-spacing: 2px;
}

.ul-color-change,
.ul-color-change a {
  color: black;
}

nav a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  font-family: "Advent Pro", sans-serif;
}

.page-selected {
  text-decoration: underline;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
