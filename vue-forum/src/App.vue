<template>
  <v-app>
    <v-toolbar dark>
      <v-app-bar-nav-icon @click.native.stop="sideNav = !sideNav"></v-app-bar-nav-icon>
      <v-toolbar-title>Sportforum</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text>
          <v-icon left>mdi-login</v-icon>
          Inloggen
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer v-model="sideNav">
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-login</v-icon>
          </v-list-item-action>
          <v-list-item-content>Inloggen</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <main>
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
    sideNav: false
  })
}
</script>
