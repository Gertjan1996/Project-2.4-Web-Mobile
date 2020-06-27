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
        :key="category.category"
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
            <v-list-item-content>
              <v-list-item-title class="headline">
                {{ category.category }}
              </v-list-item-title>
              <v-list-item-subtitle class="hidden-xs-only">
                Subforum voor '{{ category.category }}'
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-img
            :src="require('../assets/' + category.imgPath)"
            contain
            height="200"
          />
          <v-card-text>
            Bekijk en bespreek hier de laatste ontwikkelingen op het gebied van '{{ category.category }}'.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Categories',
  data () {
    return {
      categories: null
    }
  },
  created () {
    this.getCategories()
  },
  methods: {
    getCategories () {
      return this.$http.get('/categories')
        .then(res => {
          console.log(res)
          this.categories = res.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
