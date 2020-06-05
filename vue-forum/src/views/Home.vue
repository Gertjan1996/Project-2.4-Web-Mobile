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
          router
          :to="category.link"
        >
          <v-list-item>
            <v-list-item-avatar color="grey"></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">{{ category.sport }}</v-list-item-title>
              <v-list-item-subtitle class="hidden-xs-only">Subforum voor '{{ category.sport }}'</v-list-item-subtitle>
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
  name: 'Home',
  data: () => ({
    categories: [
      { sport: 'Fitness', link: '/categorie' },
      { sport: 'Hardlopen', link: '/categorie' },
      { sport: 'Voetbal', link: '/categorie' },
      { sport: 'Zwemmen', link: '/categorie' },
      { sport: 'Tennis', link: '/categorie' },
      { sport: 'Fietsen', link: '/categorie' },
      { sport: 'Yoga', link: '/categorie' },
      { sport: 'Hockey', link: '/categorie' },
      { sport: 'Paardrijden', link: '/categorie' },
      { sport: 'Golf', link: '/categorie' },
      { sport: 'Wielrennen', link: '/categorie' },
      { sport: 'Overig', link: '/categorie' }
    ]
  })
}
</script>
