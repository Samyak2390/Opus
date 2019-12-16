<template>
  <div>
    <v-app>
      <div v-if="window.width<992">
        <v-app-bar
          absolute
          temporary
          :color="color"
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
            :color="page=='/register' ? 'black': 'white'"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>

          <!-- <v-toolbar-title>Title</v-toolbar-title> -->

          <v-spacer></v-spacer>
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
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </div>
      <div v-else>
        <div class="nav-head">
          <div class="logo hide">Opus</div>
          <nav :class="page=='/login'?'black-background':''">
            <ul :class="page=='/register' ? 'ul-color-change' : ''">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/"></a>Categories
              </li>
              <li>
                <v-menu open-on-hover>
                  <template v-slot:activator="{ on }">
                    <span v-on="on">Account</span>
                  </template>

                  <v-list>
                    <v-list-item href="/login">
                      <v-list-item-title>Login</v-list-item-title>
                    </v-list-item>
                    <v-list-item href="/register">
                      <v-list-item-title>Register</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <router-view />
    </v-app>
  </div>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    page: '',
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
    color: 'transparent'
  }),

  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()

    this.page = window.location.pathname
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    handleResize() {
      this.window.width = window.innerWidth
    }
  },

  watch: {
    group() {
      this.drawer = false
    }
  }
}
</script>
<style scoped>
.hide {
  /* color: rgba(0, 0, 0, 0); */
  display: none;
}

.nav-head {
  display: flex;
  justify-content: center;
  height: 3em;
  align-items: center;
  background: transparent;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
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
}
</style>
