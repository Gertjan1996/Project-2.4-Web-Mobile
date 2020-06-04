<template>
  <v-app>
    <v-toolbar
      dark
      class="primary"
    >
      <v-app-bar-nav-icon
        class="hidden-sm-and-up"
        @click.native.stop="sideNav = !sideNav"
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
    </v-toolbar>
    <v-navigation-drawer
      temporary
      v-model="sideNav"
    >
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.link"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <main>
      <router-view />
    </main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {
    //
  },

  data: () => ({
    sideNav: false,
    menuItems: [
      { icon: 'mdi-face', title: 'Profiel', link: '/profiel' },
      { icon: 'mdi-account-multiple-plus', title: 'Registreren', link: '/registreren' },
      { icon: 'mdi-login', title: 'Inloggen', link: '/login' }
    ]
  })
}
</script>
