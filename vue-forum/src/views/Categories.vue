<template>
  <v-container
    class="fill-height"
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        v-for="category in categories"
        :key="category.sport"
        align="center"
        cols="6"
        md="4"
        lg="3"
      >
        <v-card
          class="elevation-6"
          :to="'/categories/' + category.id"
        >
          <v-list-item>
            <v-list-item-avatar color="grey" />
            <v-list-item-content>
              <v-list-item-title class="headline">
                {{ category.sport }}
              </v-list-item-title>
              <v-list-item-subtitle class="hidden-xs-only">
                Subforum voor '{{ category.sport }}'
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-img
            :src="require('../assets/logo.svg')"
            contain
            height="200"
          />
          <v-card-text>
            Bekijk en bespreek hier de laatste ontwikkelingen op het gebied van '{{ category.sport }}'.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Categories',
  computed: {
    categories () {
      return this.$store.getters.loadedCategories
    }
  }
}
</script>
