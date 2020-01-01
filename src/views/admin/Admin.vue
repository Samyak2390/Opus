<template>
  <div class="admin-dash">
    <div class="hide-admin-nav">
      <v-card height="92vh" width="256">
        <v-navigation-drawer style="position: fixed; top: 8vh;" clipped mobile-break-point="0">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">Admin Panel</v-list-item-title>
              <v-list-item-subtitle>Admin Name</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense nav>
            <v-list-item v-for="item in items" :key="item.title" link :href="item.path">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-card>
    </div>
    <v-content>
      <div class="admin-view">
        <router-view />
      </div>
    </v-content>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', path: '/admin/dashboard' },
        { title: 'Items', icon: 'mdi-bookshelf', path: '/admin/items' },
        { title: 'Add Items', icon: 'mdi-playlist-plus', path: '/admin/additems' },
        { title: 'Users', icon: 'mdi-account-group', path: '/admin/users' }

      ],
      right: null
    }
  }

}
</script>
<style scoped>
@media (max-width: 992px) {
  .hide-admin-nav {
    display: none;
  }
}

.admin-dash {
  display: flex;
  overflow: hidden;
}
</style>
