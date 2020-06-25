<template>
  <v-container
    class="fill-height"
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        align="center"
        cols="12"
        md="8"
        lg="6"
      >
        Test
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Category',
  props: {
    categoryId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      posts: null
    }
  },
  created () {
    this.getPosts()
  },
  methods: {
    getPosts () {
      return this.$http.get(`/categories/${this.categoryId}/posts`)
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
