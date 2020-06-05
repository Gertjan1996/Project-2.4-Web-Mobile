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
          router
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
          router
          :to="item.link"
        >
          <v-icon left>
            {{ item.icon }}
          </v-icon>
          {{ item.title }}
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
    drawer: null,
    menuItems: [
      { icon: 'mdi-face', title: 'Profiel', link: '/profiel' },
      { icon: 'mdi-account-multiple-plus', title: 'Registreren', link: '/registreren' },
      { icon: 'mdi-login', title: 'Inloggen', link: '/login' }
    ]
  })
}
</script>
