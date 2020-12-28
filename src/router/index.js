import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Favourites from '../views/Favourites.vue'
import Admin from '../views/admin/Admin.vue'
import Users from '../views/admin/Users.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import Items from '../views/admin/Items.vue'
import AddItem from '../views/admin/AddItem.vue'
import Category from '../views/Category.vue'
import Search from '../views/Search.vue'
import NotFound from '../views/PageNotFound.vue'

import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'notFound',
    component: NotFound
  },
  {
    // must not be authorized
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    // must not be authorized
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (!store.getters.currentUser) {
        next()
      } else {
        store.dispatch('changePage', '/')
        next('/')
      }
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/category',
    name: 'category',
    component: Category,
    props: true
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    props: true
  },
  {
    // must be authorized
    path: '/favourites',
    name: 'favourites',
    component: Favourites
  },
  {
    path: '/admin',
    redirect: '/admin/dashboard',
    name: 'admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      if (store.getters.currentUser && store.getters.currentUser.role === '1') {
        next()
      } else {
        next('/')
      }
    },
    children: [
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'items',
        component: Items
      },
      {
        path: 'additems',
        component: AddItem
      },
      {
        path: 'users',
        component: Users
      }

    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
