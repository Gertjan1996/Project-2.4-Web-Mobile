<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      dark
      class="primary"
    >
      <v-list dense>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="isUser || isAdmin"
          link
          @click="logout"
        >
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Uitloggen
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      dark
      app
      clipped-left
      class="primary"
    >
      <v-app-bar-nav-icon
        class="hidden-sm-and-up"
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title>
        <router-link
          to="/"
          tag="span"
          style="cursor: pointer"
        >
          <v-icon left>
            mdi-home
          </v-icon>
          Sportforum
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          v-for="item in menuItems"
          :key="item.title"
          text
          :to="item.link"
        >
          <v-icon left>
            {{ item.icon }}
          </v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn
          v-if="isUser || isAdmin"
          text
          @click="logout"
        >
          <v-icon left>
            mdi-logout
          </v-icon>
          Uitloggen
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

    <v-footer
      app
      dark
      class="primary"
    >
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: null
  }),
  computed: {
    isUser () {
      return this.$store.getters.user && this.$store.getters.user.role === 'User'
    },
    isAdmin () {
      return this.$store.getters.user && this.$store.getters.user.role === 'Admin'
    },
    menuItems () {
      let menuItems = [
        { icon: 'mdi-forum', title: 'Forum', link: '/categories' },
        { icon: 'mdi-account-multiple-plus', title: 'Registreren', link: '/registreren' },
        { icon: 'mdi-login', title: 'Inloggen', link: '/login' }
      ]
      if (this.isUser) {
        menuItems = [
          { icon: 'mdi-forum', title: 'Forum', link: '/categories' },
          { icon: 'mdi-face', title: 'Profiel', link: '/profiel' }
        ]
      } else if (this.isAdmin) {
        menuItems = [
          { icon: 'mdi-admin', title: 'Admin', link: '/admin' },
          { icon: 'mdi-forum', title: 'Forum', link: '/categories' },
          { icon: 'mdi-face', title: 'Profiel', link: '/profiel' },
          { icon: 'mdi-plus-box', title: 'Categorie aanmaken', link: '/categorie/new' }
        ]
      }
      return menuItems
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/login')
    }
  }
}
</script>
