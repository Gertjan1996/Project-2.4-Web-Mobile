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
        <v-btn
          router
          :to="category.link"
        >
          {{ category.sport }}
        </v-btn>
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
      { sport: 'Overige sporten', link: '/categorie' }
    ]
  })
}
</script>
